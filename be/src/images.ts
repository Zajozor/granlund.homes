import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY;

async function queryOpenAI(base64Image: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  };

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `can you please describe the appliance in the picture. Please generate only a valid JSON file as a response, the JSON document should contain the following fields:
            - serial_number (s/n if present)
            - name (device name)
            - category (type of appliance in English)
            - manufacturer (manufacturer name)
            - manual_url (manual URL if available)
            - other_data:
                - type (type of appliance in English)
                - type_original (type of appliance in original language)
                - language
                - ce_mark
                - id_number
                - keywords (tags for a search engine)
                - manufacturer:
                    - phone number
                    - url
                    - manufacture date
                - non_technical_summary
                - technical_description
                - technical_description_json,
                - additional_information

                remember entire response is a valid JSON, no comments`
          },
          {
            type: 'image_url',
            image_url: { url: base64Image }
          }
        ]
      }
    ],
    max_tokens: 3000
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });
    return response.data;
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    throw error;
  }
}

function extractJsonFromResponse(responseContent: string) {
  const regex = /```(?:json)?\n(.*?)```/s;
  const match = responseContent.match(regex);

  if (match) {
    return JSON.parse(match[1].trim());
  } else {
    return {};
  }
}

export async function processImage(base64Image: string) {
  try {
    const response = await queryOpenAI(base64Image);
    const content = response.choices[0].message.content;
    const jsonResponse = extractJsonFromResponse(content);
    return jsonResponse;
  } catch (error) {
    console.error(error);
    return {};
  }
}

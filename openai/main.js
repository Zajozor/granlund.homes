require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;
const directory = 'data/images';
const imageExtensions = ['.jpg', '.jpeg'];

async function encodeImage(imagePath) {
  const image = await fs.readFile(imagePath);
  return image.toString('base64');
}

async function queryOpenAI(imagePath) {
  const base64Image = await encodeImage(imagePath);
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
  
  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
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
                - additional_information`
          },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64Image}` }
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

function extractJsonFromResponse(responseContent) {
  const regex = /```(?:json)?\n(.*?)```/s;
  const match = responseContent.match(regex);
  
  if (match) {
    return JSON.parse(match[1].trim());
  } else {
    throw new Error("No JSON content found in the response content");
  }
}

async function processImage(imagePath) {
  const response = await queryOpenAI(imagePath);
  const content = response.choices[0].message.content;
  const jsonResponse = extractJsonFromResponse(content);
  
  const outputFilePath = path.format({ dir: path.dirname(imagePath), name: path.basename(imagePath, path.extname(imagePath)), ext: '.json' });
  await fs.writeFile(outputFilePath, JSON.stringify(jsonResponse, null, 4));
  console.log(`Saved JSON for ${imagePath} to ${outputFilePath}`);
}

async function main() {
  const files = await fs.readdir(directory);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const filePath = path.join(directory, file);
      await processImage(filePath);
    }
  }
}

main().catch(console.error);


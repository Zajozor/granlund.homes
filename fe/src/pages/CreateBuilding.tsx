import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { Button, TextField, Box, Spinner } from '@radix-ui/themes';
import styled from 'styled-components';
import { createProperty } from '../api/index';
import { useNavigate } from 'react-router-dom';

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


  const createBase64Image = (file :File) => {
    const reader = new FileReader();
    return new Promise(function (resolve) {
      reader.onload = function (event) {
        resolve(event.target?.result)
      }
      reader.readAsDataURL(file);
    })
  }

function CreateBuildingForm() {
  const [address, setAddress] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true)

    try {
      await createProperty({
        address,
        images,
      });
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
        setLoading(false)
    }
  };

  return (
      loading ?  <Box m="3"><Spinner /></Box>:
    <Form.Root onSubmit={handleSubmit} className="building-form">
      <h1>New building</h1>
      <Fields>
        <Form.Field name="address">
          <Box mb="2">
            <Form.Label >Address:</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Kaapelitehdas Table no. 100"
                size="2"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" asChild>
              <span className="form-error">Address is required.</span>
            </Form.Message>
          </Box>
        </Form.Field>
        <Form.Field name="floorImages">
            <Box mb="2">
            <Form.Label >Floor plans (select multiple for floors):</Form.Label>
            <Form.Control type="file" multiple onChange={async (e) => { 
const results: string[] = []
                for (const file of e.target.files|| [])  {
                    console.log('adding one')
                const base64: string = await createBase64Image(file) as string;
                results.push(base64)
            } 
            setImages(results)
            }}>
            </Form.Control>
            <Form.Message match="valueMissing" asChild>
            <span className="form-error">Floor plan is required.</span>
            </Form.Message>
            </Box>
        </Form.Field>
      </Fields>
      {images && <section>{images.length} floor{images.length === 1 ? '' : 's'} selected</section>}

      <Form.Submit asChild>
        <Button size="2" variant="solid" mt="6"  color="green">
            Add Building
        </Button>
      </Form.Submit>
    </Form.Root>
  );
}

export default CreateBuildingForm;

import { useState } from 'react';
import { Dialog, Button, Text, TextField, Flex } from '@radix-ui/themes';
import { createProperty } from '../api/index';

  const createBase64Image = (file :File) => {
    const reader = new FileReader();
    return new Promise(function (resolve) {
      reader.onload = function (event) {
        resolve(event.target?.result)
      }
      reader.readAsDataURL(file);
    })
  }

const CreatePropertyDialog = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [alert, setAlert] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!address || !images) {
      console.log('Please fill in all fields', address);
      
      setAlert('Please fill in all fields');
      return;
    }

    try {
      await createProperty({ address, images });
      setOpen(false);
      setAlert(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlert(error.message);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const results: string[] = []
        for (const file of e.target.files|| [])  {
                console.log('adding one')
                const base64: string = await createBase64Image(file) as string;
                results.push(base64)
        }
    setImages(results)
    }
  }


  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button onClick={() => setOpen(true)}>Add a property</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
          {alert && <Text as='p' size="2" color="red">{alert}</Text>}
        </Dialog.Description>

        <Flex direction="column" gap="3">
            <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Address
            </Text>
            <TextField.Root
              placeholder="Enter the property address"
              onChange={(e) => setAddress(e.target.value)}
            />
            </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Floor plan
            </Text>
            <>
              <input type="file" multiple onChange={(e) => handleFileChange(e)} />
              {images.length >0 && <>
                  <p>{images.length} floor plans selected.</p>
                  <Button  onClick={() => setImages([])}>Remove selected files</Button>
              </>}
            </>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={() => handleSubmit()}>
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default CreatePropertyDialog;

import { useState, useRef } from 'react';
import { Dialog, Button, Text, TextField, Flex } from '@radix-ui/themes';
import { createProperty } from '../api';

const CreatePropertyDialog = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [alert, setAlert] = useState<String | null>(null);

  const handleSubmit = async () => {
    if (!address || !image) {
      console.log('Please fill in all fields', address, image);
      
      setAlert('Please fill in all fields');
      return;
    }

    try {
      await createProperty({ address, image });
      setOpen(false);
      setAlert(null);
    } catch (error) {
      setAlert(error.message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const ImageInputButton = () => {
    if (image) {
      return <Button  onClick={() => setImage(null)}>Remove image</Button>;
    } else {
      return <input type="file" onChange={(e) => handleFileChange(e)} />
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
           <ImageInputButton />
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
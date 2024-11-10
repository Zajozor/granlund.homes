
import { useEffect, useState } from 'react';
import { Dialog, Button, Text, TextField, Flex, Spinner } from '@radix-ui/themes';
import { createItem } from '../api/index';
import { useParams } from 'react-router-dom';

const createBase64Image = (file: File) => {
    const reader = new FileReader();
    return new Promise(function(resolve) {
        reader.onload = function(event) {
            resolve(event.target?.result)
        }
        reader.readAsDataURL(file);
    })
}

const CreateItemDialog = (props: { opened: boolean, onClose: () => void, xy_coordinates: { x: number, y: number, floor: number } }) => {
    const params = useParams()
    const [name, setName] = useState<string>('');
    const [serialNumber, setSerialNumber] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [alert, setAlert] = useState<string | null>(null);
    const [dots, setDots] = useState<string>('.')

    useEffect(() => {
        const interval = setInterval(() => {
            const nextAmount = 1 + Math.floor(Date.now() / 800) % 5;
            setDots('.'.repeat(nextAmount))
        }, 800)
        return () => clearInterval(interval)
    }, [])

    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async () => {
        if (!name || !image || !serialNumber) {

            setAlert('Please fill in all fields');
            return;
        }
        if (!params.id) {
            return
        }
        setLoading(true)

        try {
            await createItem(params.id, name, image, serialNumber, props.xy_coordinates, notes)
            props.onClose();
            setAlert(null);
            setImage(null);
            setName('')
            setNotes('')
            setSerialNumber('')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setAlert(error.message);
        } finally {
            setLoading(false)
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('fc', e.target.files)
        if (e.target.files && e.target.files.length > 0) {
            const results: string[] = []
            for (const file of e.target.files || []) {
                const base64: string = await createBase64Image(file) as string;
                results.push(base64)
            }
            setImage(results[0])
        }
    }


    return (

        <Dialog.Root open={props.opened} onOpenChange={(x) => { if (x === false) props.onClose() }} >

            <Dialog.Content maxWidth="450px">
                {loading ? <><span><Spinner /><br />Saving file{dots}</span></> : <>

                    <Dialog.Title>Add Item</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Add an item to the property inventory
                        <br />
                        {alert && <Text size="2" color="red">{alert}</Text>}
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Manufacturer*
                            </Text>
                            <TextField.Root
                                placeholder="SuperCooler 3000, ..."
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Serial Number*
                            </Text>
                            <TextField.Root
                                placeholder="Make sure to double check the serial"
                                onChange={(e) => setSerialNumber(e.target.value)}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Condition & estimated value
                            </Text>
                            <TextField.Root
                                placeholder="Enter any notes (optional)"
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Picture of the Item
                            </Text>
                            {image !== null ? <Button mt="3" onClick={() => setImage(null)}>Change selected file</Button>
                                :
                                <input type="file" onChange={(e) => handleFileChange(e)} />
                            }
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
                    </Flex></>}
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default CreateItemDialog;

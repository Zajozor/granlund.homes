
import { ForwardedRef, useEffect, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { Dialog, Button, Text, TextField, Flex, Spinner, ChevronDownIcon } from '@radix-ui/themes';
import { createItem } from '../api/index';
import { useParams } from 'react-router-dom';
import { CheckIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import React from 'react';
import classnames from 'classnames';

const createBase64Image = (file: File) => {
    const reader = new FileReader();
    return new Promise(function(resolve) {
        reader.onload = function(event) {
            resolve(event.target?.result)
        }
        reader.readAsDataURL(file);
    })
}


const SelectItem = React.forwardRef(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	({ children, className, ...props }: any, forwardedRef: ForwardedRef<HTMLSelectElement>) => {
		return (
			<Select.Item
				className={classnames('SelectItem', className)}
				{...props}
				ref={forwardedRef}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator className="SelectItemIndicator">
					<CheckIcon />
				</Select.ItemIndicator>
			</Select.Item>
		);
	},
);

const CreateItemDialog = (props: { opened: boolean, onClose: () => void, xy_coordinates: { x: number, y: number, floor: number } }) => {
    const params = useParams()
    const [category, setCategory] = useState<string>('');
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
        if (!category || !image || !serialNumber) {

            setAlert('Please fill in all fields');
            return;
        }
        if (!params.id) {
            return
        }
        setLoading(true)

        try {
            await createItem(params.id, category, image, serialNumber, props.xy_coordinates, notes)
            props.onClose();
            setAlert(null);
            setImage(null);
            setCategory('')
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
                            //    placeholder="SuperCooler 3000, ..."
                            //    onChange={(e) => setCategory(e.target.value)}
                            ///>


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
                                Category*
                            </Text>
                        </label>
	<Select.Root onValueChange={(e) => setCategory(e)}>
		<Select.Trigger className="SelectTrigger" aria-label="Food">
			<Select.Value placeholder="Pick a category…" />
			<Select.Icon className="SelectIcon">
				<ChevronDownIcon />
			</Select.Icon>
		</Select.Trigger>
		<Select.Portal>
			<Select.Content className="SelectContent">
				<Select.ScrollUpButton className="SelectScrollButton">
					<ChevronUpIcon />
				</Select.ScrollUpButton>
				<Select.Viewport className="SelectViewport">
					<Select.Group>
						<SelectItem value="electric">Electric</SelectItem>
						<SelectItem value="hvac">Hvac</SelectItem>
						<SelectItem value="plumbing">Plumbing</SelectItem>
						<SelectItem value="utilities">Utilities</SelectItem>
					</Select.Group>

					<Select.Separator className="SelectSeparator" />

					<Select.Group>
						<SelectItem value="structural">Structural</SelectItem>
						<SelectItem value="appliances">Appliances</SelectItem>
						<SelectItem value="landscaping">Landscaping</SelectItem>
						<SelectItem value="security">Security</SelectItem>
					</Select.Group>

					<Select.Separator className="SelectSeparator" />

					<Select.Group>
						<SelectItem value="other">Other</SelectItem>
					</Select.Group>
				</Select.Viewport>
				<Select.ScrollDownButton className="SelectScrollButton">
					<ChevronDownIcon />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
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

import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Button, TextField, Box } from "@radix-ui/themes";
import styled from "styled-components";
import { api } from "../api";

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function CreateBuildingForm() {
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      await api.properties.createOne({
        address,
        name: buildingName,
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="building-form">
      <h1>New building</h1>
      <Fields>
        <Form.Field name="buildingName">
          <Box mb="2">
            <Form.Label asChild>Building Name*</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                type="text"
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
                placeholder="Enter building name"
                size="2"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" asChild>
              <span className="form-error">Name is required.</span>
            </Form.Message>
          </Box>
        </Form.Field>
        <Form.Field name="address">
          <Box mb="2">
            <Form.Label asChild>Address*</Form.Label>
            <Form.Control asChild>
              <TextField.Root
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                size="2"
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" asChild>
              <span className="form-error">Address is required.</span>
            </Form.Message>
          </Box>
        </Form.Field>
      </Fields>

      <Form.Submit asChild>
        <Button size="2" variant="solid">
          Create Building
        </Button>
      </Form.Submit>
    </Form.Root>
  );
}

export default CreateBuildingForm;

import React, { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Button, TextField, Box } from "@radix-ui/themes";
import styled from "styled-components";
import { api } from "../api";
import { useParams } from "react-router-dom";

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function EditBuildingForm() {
  const { buildingId } = useParams(); // Get the building ID from the URL parameters
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for fetching data

  // Fetch the existing building data when the component mounts
  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const building = await api.properties.getOne(buildingId); // Fetch building data by ID
        setBuildingName(building.name);
        setAddress(building.address);
      } catch (error) {
        if (error instanceof Error) {
          alert(`Error fetching building: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBuildingData();
  }, [buildingId]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      await api.properties.updateOne(buildingId, {
        address,
        name: buildingName,
      });
      alert("Building updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error updating building: ${error.message}`);
      }
    }
  };

  if (loading) return <p>Loading building details...</p>;

  return (
    <Form.Root onSubmit={handleSubmit} className="building-form">
      <h1>Edit Building</h1>
      <Fields>
        <Form.Field name="buildingName">
          <Box mb="2">
            <Form.Label asChild>Building Name*</Form.Label>
            <Form.Control asChild>
              <TextField
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
              <TextField
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
          Update Building
        </Button>
      </Form.Submit>
    </Form.Root>
  );
}

export default EditBuildingForm;

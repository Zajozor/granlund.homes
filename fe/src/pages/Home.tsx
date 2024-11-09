import { useEffect, useState } from "react";
import { Button, Box, Text } from "@radix-ui/themes";
import styled from "styled-components";
import { Link } from "react-router-dom"; // For navigation to edit/view pages
import { Loader } from "../components/Loader";
import { getProperties } from "../api";

type Building = {
  id: string;
  address: string;
};

const BuildingItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const BuildingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PropertyCard = ({ property }: { property: Building }) => {
  return (
    <BuildingItem key={property.id}>
    <Box>
      <Text as="p" size="2">
        Address: {property.address}
      </Text>
    </Box>
    <Box>
      <Link to={`/buildings/${property.id}`}>
        <Button size="2" variant="soft">
          View
        </Button>
      </Link>
      <Link to={`/buildings/${property.id}/edit`}>
        <Button size="2" variant="solid" ml="1">
          Edit
        </Button>
      </Link>
    </Box>
  </BuildingItem>
  );
};

const BuildingsList = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);

  const updateShownBuildings = async () => {
    setLoading(true);
    const buildings = await getProperties();
    setBuildings(buildings);
    setLoading(false);
  };

  useEffect(() => {
    updateShownBuildings()
  }, []);

    if (loading) return <Loader />;

  if (buildings.length === 0) {
    return <Text>No buildings found.</Text>
  }

  const PropertyList = () => {
    return(
      buildings.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))
    )
  };

  return (
    <BuildingsContainer>
      <h1>Buildings</h1>
      <PropertyList />
    </BuildingsContainer>
  );
};

export default BuildingsList;

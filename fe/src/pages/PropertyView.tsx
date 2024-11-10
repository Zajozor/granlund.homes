import '../App.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Container, Button, Box, Text } from "@radix-ui/themes";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getProperty } from "../api";
import { Items, Property } from "../types";

import ItemsListView from "../components/ItemsListView";

const BuildingItem = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  `;

const PropertyBanner = ({ property }: { property: Property }) => {  
  return (
    <BuildingItem key={property.id}>
      <Box>
        <Text as="p" size="2">
          Address: {property.address}
        </Text>
      </Box>
      <Box>
        <Link to={`/property/${property.id}`}>
          <Button size="2" variant="soft">
            View
          </Button>
        </Link>
        <Link to={`/property/${property.id}/edit`}>
          <Button size="2" variant="solid" ml="1">
            Edit
          </Button>
        </Link>
      </Box>
    </BuildingItem>
  );
};

const PropertyView = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [propertyDetails, setPropertyDetails] = useState<Property>({});
  const [items, setItems] = useState<Items>({});

  const updateShownBuildings = async () => {
    if (propertyId) {
      const { property, items } = await getProperty(propertyId);
      setPropertyDetails(property);
      setItems(items);
    }
  };

  useEffect(() => {
    updateShownBuildings()
  }, []);

  return (
		<>
			<PropertyBanner property={propertyDetails} />
			<Container style={{ flex: 1, display: 'flex', flexDirection: 'row' }} align='left'>
				<ItemsListView items={items} />
				<div style={{ height: '100vh', width: '50vw' }} />
			</Container>
		</>
  );
};

export default PropertyView;

import '../App.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Container, Button, Text } from "@radix-ui/themes";
import styled from "styled-components";
import { getProperty } from "../api";
import { Items, Property } from "../types";

import ItemsListView from "../components/ItemsListView";
import Loader from "../components/Loader";

const HeaderThemedView = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  gap: 5rem;
  padding-right: 2rem;
  align-items: center;
  position: absolute;
  top: 1.67vh;
  right: 0;
  `;

const PropertyBanner = ({ property }: { property: Property }) => {  
  const openProperty = () => window.location.href = `/property/${property.id}`;
  const name = property.address || 'Enjoy your Junction whilst we load…';

  return (
    <HeaderThemedView key={property.id}>
      <Text as="p" size="2">{name}</Text>
      <Button size="3" variant="soft" onClick={() => openProperty()}>
        Open Inspector
      </Button>
    </HeaderThemedView>
  );
};

const PropertyView = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [propertyDetails, setPropertyDetails] = useState<Property>({});
  const [items, setItems] = useState<Items>({});
  const [loading, setLoading] = useState(false);
  const isImage = Boolean(propertyDetails.image);
  

  const updateShownBuildings = async () => {
    if (propertyId) {
      setLoading(true);
      const { property, items } = await getProperty(propertyId);
      setPropertyDetails(property);
      setItems(items);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateShownBuildings()
  }, []);

  return (
		<>
			<PropertyBanner property={propertyDetails} />
			<Container style={{ flex: 1, display: 'flex', flexDirection: 'row' }} align='left'>
      {loading
      ? <Loader />
      : (<>
        <ItemsListView items={items} />
        {isImage && Array.isArray(propertyDetails.image) && propertyDetails.image.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Property ${index}`}
            style={{ width: '100px', height: '100px' }}
          />
        ))}
      </>)}
			</Container>
		</>
  );
};

export default PropertyView;

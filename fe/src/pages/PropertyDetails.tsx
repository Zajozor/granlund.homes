import '../App.css';
import { useEffect, useState } from "react";
import { Container, Button, Box, Text } from "@radix-ui/themes";
import styled from "styled-components";
import { Link } from "react-router-dom"; // For navigation to edit/view pages
// import { Loader } from "../components/Loader";
import { getProperty } from "../api";
import { Item, Items, Property } from "../types";

import * as Collapsible from "@radix-ui/react-collapsible";
import { RowSpacingIcon, Cross2Icon } from "@radix-ui/react-icons";

const BuildingItem = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  `;
  
  const BuildingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const ItemsCategoryList = ({ items }: { items: Items }) => {
  const [open, setOpen] = useState(false);

  const Header = () => (
    <div>
      <span className="Text">Item category</span>
    </div>
  );

  const OpenCloseButton = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
    <Collapsible.Trigger asChild>
      <button className='IconButton'>{open ? <Cross2Icon /> : <RowSpacingIcon />}</button>
    </Collapsible.Trigger>
  </div>
  );

  const Items = () => (
    <>
      {items.map((item) => (
        <div key={item.uid} className='Repository'>
          <span className='Text'>{item.name}</span>
        </div>
      ))}
    </>
  );

	return (
		<Collapsible.Root className='CollapsibleRoot' open={open} onOpenChange={setOpen}>
      <OpenCloseButton />
			<Header />
			<Collapsible.Content>
        <Items />
			</Collapsible.Content>
		</Collapsible.Root>
	);
};

const BuildingsList = () => {
  const [property, setProperty] = useState<Property>({});
  const [items, setItems] = useState<Items>({});
  const [loading, setLoading] = useState(true);

  const updateShownBuildings = async () => {
    setLoading(true);
    const id = 1; // TODO: How to do t.
    const result = await getProperty(id);
    setProperty(result.property);
    setItems(result.items);
    setLoading(false);
  };

  useEffect(() => {
    updateShownBuildings()
  }, []);

  // if (loading) return <Loader />;

  return (
    <BuildingsContainer>
      <PropertyBanner property={property} />
      <BodyContainer>
        <Container style={{ flex: 1}} align='left'>
          <ItemsCategoryList items={items} />
        </Container>  
        <Container style={{ flex: 4}}>
          <Box style={{ display: 'flex' }} />
        </Container>  
      </BodyContainer>
    </BuildingsContainer>
  );
};

export default BuildingsList;
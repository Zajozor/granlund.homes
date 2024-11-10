import { useEffect, useState } from 'react';
import { Button, Box, Text, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom'; // For navigation to edit/view pages
import { getProperties } from '../api/index';
import { Property } from '../types';
import CreatePropertyDialog from '../components/CreatePropertyDialog';

const Header = () => (
  <div>
    <Text as="label" size="4" weight="bold" style={{ color: 'rbg(105,115,00)' }}>
      Browse Properties Under Management
    </Text>
  </div>
);

const PropertyCard = ({ property }: { property: Property }) => {
  const { address, id, floors } = property;
  const isPropertiesAdded = address !== undefined;
  const text = isPropertiesAdded ? address : 'No properties added';

  const ActionsButtons = () => (
    <Box>
      <Link to={`/properties/${id}`}>
        <Button size="2" variant="soft">
          Open
        </Button>
      </Link>
    </Box>
  );

  return (
    <div className='listItem' key={property.id}>
      <Box>
        <Text as="p" size="2">
         {text} ({floors} floor{floors !== 1 ? 's': ''})
        </Text>
      </Box>
      {isPropertiesAdded ? <ActionsButtons /> : null}
    </div>
  );
};

const BuildingsList = () => {
  const [buildings, setBuildings] = useState<Property[]>([]);

  const updateShownBuildings = async () => {
    const buildings = await getProperties();
    setBuildings(buildings);
  };

  useEffect(() => {
    updateShownBuildings()
  }, []);

  const PropertyList = () => {

    if (buildings.length === 0) {
        return <p>No properties added</p>
    }

    return(
      buildings.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))
    )
  };

  const SearchBar = () => (
    <div style={{ display: 'flex', flexDirection: 'row', width: '60%', gap: 28 }}>
      <TextField.Root placeholder="Type address…" style={{flex: 3}}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <CreatePropertyDialog />
    </div>
  );

  return (
    <div className="page">
      <Box height="200px" />
      <Header />
      <Box height="100px" />
      <SearchBar />
      <Box height="200px" />
      <PropertyList />
    </div>
  );
};

export default BuildingsList;

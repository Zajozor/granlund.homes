import { useEffect, useState } from 'react';
import { Box, Text, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { getProperties } from '../api/index';
import { Property } from '../types';
import { compareTwoStrings } from 'string-similarity';

import CreatePropertyDialog from '../components/CreatePropertyDialog';
import PropertyListItem from '../components/PropertyListItem';
import Loader from '../components/Loader';

const Header = () => (
  <div>
    <Text as="label" size="4" weight="bold" style={{ color: 'rbg(105,115,00)' }}>
      Browse Properties Under Management
    </Text>
  </div>
);

const PropertyList = ({ properties, search }: { properties: Property[], search: string }) => {
  const filteredBuildings = properties
  .filter((property) => compareTwoStrings(property.address.toLowerCase(), search.toLowerCase()) > 0.1)
  .sort((a, b) => a.address.localeCompare(b.address));

  const isPropertiesAdded = properties.length > 0;
  const isSearch = search.length > 1;
  const isResults = filteredBuildings.length > 0

  if (!isPropertiesAdded) {
    return <p>No properties added</p>
  }

  if (isSearch && !isResults) {
      return <p>Found 0 properties matching '{search}'.</p>
  } else if (isSearch && isResults) {
    return filteredBuildings.map((property) => <PropertyListItem key={property.id} property={property} />)
  } else {
    return properties.map((property) => <PropertyListItem key={property.id} property={property} />)
  }
};

const BuildingsList = () => {
  const [buildings, setBuildings] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const updateShownBuildings = async () => {
    setLoading(true);
    const buildings = await getProperties();
    setBuildings(buildings);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
  };

  useEffect(() => {
    updateShownBuildings()
  }, []);

  const SearchBar = (
    <div className='searchBarContainer'>
      <TextField.Root radius="full" variant='soft' size='3' placeholder="Type address…" style={{flex: 3}} value={search} onChange={(e) => setSearch(e.target.value)}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="18" width="18" />
        </TextField.Slot>
      </TextField.Root>
      <CreatePropertyDialog callback={async () => await updateShownBuildings()}/>
    </div>
  );

  return (
    <div className="page">
      <Box height="15vh" />
      <Header />
      <Box height="10vh" />
      {SearchBar}
      <Box height="10vh" />
      {loading ?
      <Loader />
      : <PropertyList properties={buildings} search={search} />}
    </div>
  );
};

export default BuildingsList;

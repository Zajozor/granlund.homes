import { useEffect, useState } from "react";
import { Button, Box, Text, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom"; // For navigation to edit/view pages
import { Loader } from "../components/Loader";
import { getProperties } from "../api";
import { Property } from "../types";

const Header = () => (
  <div>
    <span className="Text">Granlund management</span>
  </div>
);

const PropertyCard = ({ property }: { property: Property }) => {
  const { address, id } = property;
  const isPropertiesAdded = address !== undefined;
  const text = isPropertiesAdded ? address : "No properties added";

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
         {text}
        </Text>
      </Box>
      {isPropertiesAdded ? <ActionsButtons /> : null}
    </div>
  );
};

const BuildingsList = () => {
  const [buildings, setBuildings] = useState<Property[]>([]);
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

  const PropertyList = () => {

    if (buildings.length === 0) {
      return <PropertyCard property={{}} />
    }

    return(
      buildings.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))
    )
  };

  const SearchBar = () => (
    <div style={{ display: 'flex', flexDirection: 'row', width: '60%', gap: 28 }}>
      <TextField.Root placeholder="Search the docs…" style={{flex: 3}}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Button>
        Add a property
      </Button>
    </div>
  );

  return (
    <div className="page">
      <Header />
      <Box height="200px" />
      <SearchBar />
      <Box height="200px" />
      <PropertyList />
    </div>
  );
};

export default BuildingsList;

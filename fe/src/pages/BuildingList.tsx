import { useEffect, useState } from "react";
import { Button, Box, Text } from "@radix-ui/themes";
import styled from "styled-components";
import { Link } from "react-router-dom"; // For navigation to edit/view pages
// import { Loader } from "../components/Loader";

type Building = {
  id: string;
  name: string;
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

const mockBuildings = [
  {
    id: "1",
    name: "Empire State Building",
    address: "350 5th Ave, New York, NY 10118, USA",
  },
  {
    id: "2",
    name: "Eiffel Tower",
    address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
  },
  {
    id: "3",
    name: "Burj Khalifa",
    address: "1 Sheikh Mohammed bin Rashid Blvd - Dubai - United Arab Emirates",
  },
  {
    id: "4",
    name: "Sydney Opera House",
    address: "Bennelong Point, Sydney NSW 2000, Australia",
  },
];

const BuildingsList = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuildings = async () => {
      setBuildings(mockBuildings);

      //   try {
      //     const response = await api.properties.list(); // Fetch all buildings
      //     setBuildings(mockBuildings);
      //   } catch (error) {
      //     if (error instanceof Error) {
      //       setError(error.message);
      //     }
      //   } finally {
      //     setLoading(false);
      //   }
    };

    fetchBuildings();
  }, []);

  //   if (loading) return <Loader />;
  //   if (error) return <p>Error loading buildings: {error}</p>;

  return (
    <BuildingsContainer>
      <h1>Buildings</h1>
      {buildings.length === 0 ? (
        <Text>No buildings found.</Text>
      ) : (
        buildings.map((building) => (
          <BuildingItem key={building.id}>
            <Box>
              <Text as="label" size="3">
                {building.name}
              </Text>
              <Text as="p" size="2">
                Address: {building.address}
              </Text>
            </Box>
            <Box>
              <Link to={`/buildings/${building.id}`}>
                <Button size="2" variant="soft">
                  View
                </Button>
              </Link>
              <Link to={`/buildings/${building.id}/edit`}>
                <Button size="2" variant="solid" ml="1">
                  Edit
                </Button>
              </Link>
            </Box>
          </BuildingItem>
        ))
      )}
    </BuildingsContainer>
  );
};

export default BuildingsList;

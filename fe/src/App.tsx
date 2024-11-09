import { useCallback, useState } from "react";

import {
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import { api } from "./api";
import CreateBuilding from "./pages/CreateBuilding";
import EditBuilding from "./pages/EditBuilding";
import BuildingsList from "./pages/BuildingList";

type Property = { uid: string; address: string };

function App() {
  const [count, setCount] = useState(0);
  const [resp, setResp] = useState("");
  const fetchResponse = useCallback(async () => {
    const response = await api.zajoTest();

    setResp(JSON.stringify(response));
  }, []);

  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const updateProperties = useCallback(async () => {
    const properties = await api.properties.list();
    setAllProperties(properties as Property[]);
  }, []);

  const [addressInput, setAddressInput] = useState("");

  const addNewProperty = async () => {
    if (addressInput === "") {
      alert("missing address");
      return;
    }
    await api.properties.createOne(addressInput);
    await updateProperties();
  };

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={fetchResponse}>Test BE req</button>
      <p>{resp}</p>

      <hr />
      <p>Add new property</p>

      <input
        onChange={(e) => setAddressInput(e.target.value)}
        value={addressInput}
      />
      <button onClick={addNewProperty}>Add</button>
      <p>Existing properties:</p>
      <ol>
        {allProperties.map((property) => (
          <li key={property.uid}>
            {property.uid} is at {property.address}
          </li>
        ))}
      </ol> */}

      <Routes>
        <Route path="/buildings" element={<BuildingsList />} />
        <Route path="/buildings/create" element={<CreateBuilding />} />
        <Route path="/buildings/edit/:id" element={<EditBuilding />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import CreateBuilding from "./pages/CreateBuilding";
import BuildingsList from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/properties" element={<BuildingsList />} />
        <Route path="/properties/create" element={<CreateBuilding />} />
        <Route path="*" element={<Navigate to="/properties" />} />
      </Routes>
    </>
  );
}

export default App;

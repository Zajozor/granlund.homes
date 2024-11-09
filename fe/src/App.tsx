import { Routes, Route, Navigate } from "react-router-dom";
import CreateBuilding from "./pages/CreateBuilding";
import BuildingsList from "./pages/BuildingList";
import ViewItems from "./pages/ViewItems";

function App() {
  return (
    <>
      <Routes>
        <Route path="/properties" element={<BuildingsList />} />
        <Route path="/properties/create" element={<CreateBuilding />} />
        {/* <Route path="/properties/edit/:id" element={<EditBuilding />} /> */}
        <Route path="/properties/:id/items" element={<ViewItems />} />
        <Route path="*" element={<Navigate to="/properties" />} />
      </Routes>
    </>
  );
}

export default App;

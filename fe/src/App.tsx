import {
  Routes,
  Route,
} from "react-router-dom";
import CreateBuilding from "./pages/CreateBuilding";
import EditBuilding from "./pages/EditBuilding";
import BuildingsList from "./pages/BuildingList";

function App() {

  return (
    <>
      <Routes>
        <Route path="/buildings" element={<BuildingsList />} />
        <Route path="/buildings/create" element={<CreateBuilding />} />
        <Route path="/buildings/edit/:id" element={<EditBuilding />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import CreateBuilding from './pages/PropertyDetails';
import BuildingsList from './pages/Home';
import FloorPlan from './pages/FloorPlan';

function App() {
  return (
    <>
      <Routes>
        <Route path="/properties" element={<BuildingsList />} />
        <Route path="/property" element={<CreateBuilding />} />
        <Route path="/floor-plan" element={<FloorPlan />} />
        <Route path="*" element={<Navigate to="/properties" />} />
      </Routes>
    </>
  );
}

export default App;

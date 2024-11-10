import { Routes, Route, Navigate } from 'react-router-dom';
import PropertyView from './pages/PropertyView';
import BuildingsList from './pages/Home';
import FloorPlan from './pages/FloorPlan';

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<BuildingsList />} />
        <Route path="/properties/:propertyId" element={<PropertyView />} />
        <Route path="/property/:id" element={<FloorPlan />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;

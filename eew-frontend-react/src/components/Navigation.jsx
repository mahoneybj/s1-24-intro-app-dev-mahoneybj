import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EarthquakeTable from "./tables/EarthquakeTable";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/earthquakes" element={<EarthquakeTable />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
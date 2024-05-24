import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import EarthquakeTable from "./tables/EarthquakeTable";
import BuildingDamageTable from "./tables/BuildingDamageTable";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen); // Toggle the value of isOpen

  return (
    <Router>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Earthquake Early Warning System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/earthquakes">Earthquakes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/buildings">Building Damage</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Routes>
        <Route path="/earthquakes" element={<EarthquakeTable />} />
        <Route path="/buildings" element={<BuildingDamageTable />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
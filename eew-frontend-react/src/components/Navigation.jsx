/**
 * @file Navigation component for the Earthquake Early Warning System application.
 * @author Ben Mahoney
 */

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
import EarthquakeEarlyWarningInfoTable from "./tables/EarthquakeEarlyWarningInfoTable";
import TsunamiTable from "./tables/TsunamiTable";
import LandslideTable from "./tables/LandslideTable";
import SensorInfoTable from "./tables/SensorInfoTable";

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
            <NavItem>
              <NavLink href="/eewinfo">EEW-Info</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tsunamis">Tsunami</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/landslides">Landslide</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/sensorinfo">Sensor Info</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Routes>
        <Route path="/earthquakes" element={<EarthquakeTable />} />
        <Route path="/buildings" element={<BuildingDamageTable />} />
        <Route path="/eewinfo" element={<EarthquakeEarlyWarningInfoTable />} />
        <Route path="/tsunamis" element={<TsunamiTable />} />
        <Route path="/landslides" element={<LandslideTable />} />
        <Route path="/sensorinfo" element={<SensorInfoTable />} />
      </Routes>
    </Router>
  );
};

export default Navigation;

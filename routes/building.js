/**
 * @file Defines routes for building related API endpoints. Middleware is used for request body validation on create and update endpoints.
 * @author Ben Mahoney
 */

import express from "express";
import { validatePostBuilding } from "../middleware/validation.js";


import {
  createBuilding,
  getBuildings,
  getBuilding,
  updateBuilding,
  deleteBuilding,
} from "../controllers/building.js";

const router = express.Router();

router.post("/", validatePostBuilding, createBuilding);
router.get("/", getBuildings);
router.get("/:id", getBuilding);
router.put("/:id", validatePostBuilding, updateBuilding);
router.delete("/:id", deleteBuilding);

export default router;
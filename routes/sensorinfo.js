/**
 * @file Defines routes for sensor info related API endpoints. Middleware is used for request body validation on create and update endpoints.
 * @author Ben Mahoney
 */

import express from "express";
import { validatePostSensorInfo } from "../middleware/validation.js";

import {
  createSensorinfo,
  getSensorinfos,
  getSensorinfo,
  updateSensorinfo,
  deleteSensorinfo,
} from "../controllers/sensorinfo.js";

const router = express.Router();

router.post("/", validatePostSensorInfo, createSensorinfo);
router.get("/", getSensorinfos);
router.get("/:id", getSensorinfo);
router.put("/:id", validatePostSensorInfo, updateSensorinfo);
router.delete("/:id", deleteSensorinfo);

export default router;
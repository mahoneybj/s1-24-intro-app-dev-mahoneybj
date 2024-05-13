import express from "express";
import { validatePostEarthquake } from "../middleware/validation.js";


import {
  createEarthquake,
  getEarthquakes,
  getEarthquake,
  updateEarthquake,
  deleteEarthquake,
} from "../controllers/earthquake.js";

const router = express.Router();

router.post("/", validatePostEarthquake, createEarthquake);
router.get("/", getEarthquakes);
router.get("/:id", getEarthquake);
router.put("/:id", updateEarthquake);
router.delete("/:id", deleteEarthquake);

export default router;
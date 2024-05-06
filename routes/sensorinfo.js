import express from "express";

import {
  createSensorinfo,
  getSensorinfos,
  getSensorinfo,
  updateSensorinfo,
  deleteSensorinfo,
} from "../controllers/sensorinfo.js";

const router = express.Router();

router.post("/", createSensorinfo);
router.get("/", getSensorinfos);
router.get("/:id", getSensorinfo);
router.put("/:id", updateSensorinfo);
router.delete("/:id", deleteSensorinfo);

export default router;
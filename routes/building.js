import express from "express";

import {
  createBuilding,
  getBuildings,
  getBuilding,
  updateBuilding,
  deleteBuilding,
} from "../controllers/building.js";

const router = express.Router();

router.post("/", createBuilding);
router.get("/", getBuildings);
router.get("/:id", getBuilding);
router.put("/:id", updateBuilding);
router.delete("/:id", deleteBuilding);

export default router;
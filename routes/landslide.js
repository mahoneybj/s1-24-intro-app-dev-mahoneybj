import express from "express";

import {
  createLandslide,
  getLandslides,
  getLandslide,
  updateLandslide,
  deleteLandslide,
} from "../controllers/landslide.js";

const router = express.Router();

router.post("/", createLandslide);
router.get("/", getLandslides);
router.get("/:id", getLandslide);
router.put("/:id", updateLandslide);
router.delete("/:id", deleteLandslide);

export default router;
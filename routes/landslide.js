/**
 * @file Defines routes for Landslide related API endpoints. Middleware is used for request body validation on create and update endpoints.
 * @author Ben Mahoney
 */

import express from "express";
import { validatePostLandslide } from "../middleware/validation.js";

import {
  createLandslide,
  getLandslides,
  getLandslide,
  updateLandslide,
  deleteLandslide,
} from "../controllers/landslide.js";

const router = express.Router();

router.post("/", validatePostLandslide, createLandslide);
router.get("/", getLandslides);
router.get("/:id", getLandslide);
router.put("/:id", validatePostLandslide, updateLandslide);
router.delete("/:id", deleteLandslide);

export default router;

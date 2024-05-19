/**
 * @file Defines routes for tsunami related API endpoints. Middleware is used for request body validation on create and update endpoints.
 * @author Ben Mahoney
 */

import express from "express";
import { validatePostTsunami } from "../middleware/validation.js";

import {
  createTsunami,
  getTsunamis,
  getTsunami,
  updateTsunami,
  deleteTsunami,
} from "../controllers/tsunami.js";

const router = express.Router();

router.post("/", validatePostTsunami, createTsunami);
router.get("/", getTsunamis);
router.get("/:id", getTsunami);
router.put("/:id", validatePostTsunami, updateTsunami);
router.delete("/:id", deleteTsunami);

export default router;

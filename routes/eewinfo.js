/**
 * @file Defines routes for Earthquake early warning info related API endpoints. Middleware is used for request body validation on create and update endpoints.
 * @author Ben Mahoney
 */

import express from "express";
import { validatePostEEWInfo } from "../middleware/validation.js";

import {
  createEEWInfo,
  getEEWInfos,
  getEEWInfo,
  updateEEWinfo,
  deleteEEWInfo,
} from "../controllers/eewinfo.js";

const router = express.Router();

router.post("/", validatePostEEWInfo, createEEWInfo);
router.get("/", getEEWInfos);
router.get("/:id", getEEWInfo);
router.put("/:id", validatePostEEWInfo, updateEEWinfo);
router.delete("/:id", deleteEEWInfo);

export default router;
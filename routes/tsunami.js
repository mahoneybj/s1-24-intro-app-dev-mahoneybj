import express from "express";

import {
  createTsunami,
  getTsunamis,
  getTsunami,
  updateTsunami,
  deleteTsunami,
} from "../controllers/tsunami.js";

const router = express.Router();

router.post("/", createTsunami);
router.get("/", getTsunamis);
router.get("/:id", getTsunami);
router.put("/:id", updateTsunami);
router.delete("/:id", deleteTsunami);

export default router;
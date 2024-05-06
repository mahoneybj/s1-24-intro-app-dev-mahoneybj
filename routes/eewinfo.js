import express from "express";

import {
  createEEWInfo,
  getEEWInfos,
  getEEWInfo,
  updateEEWinfo,
  deleteEEWInfo,
} from "../controllers/eewinfo.js";

const router = express.Router();

router.post("/", createEEWInfo);
router.get("/", getEEWInfos);
router.get("/:id", getEEWInfo);
router.put("/:id", updateEEWinfo);
router.delete("/:id", deleteEEWInfo);

export default router;
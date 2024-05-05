import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createEEWInfo = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.eewinfo.create({
        data: { ...req.body },
      });
  
      const newEarthquakes = await prisma.eewinfo.findMany();
  
      return res.status(201).json({
        msg: "EEW info successfully created",
        data: newEarthquakes,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getEEWInfos = async (req, res) => { //******************************************************************* */
    try {
      const eewinfos = await prisma.eewinfo.findMany({
/*         include: {
            departments: true,
        }, */
      });
  
      if (eewinfos.length === 0) {
        return res.status(404).json({ msg: "No EEW info found" });
      }
  
      return res.json({ data: eewinfos });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getEEWInfo = async (req, res) => {
    try {
      const eewinfo = await prisma.eewinfo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!eewinfo) {
        return res
          .status(404)
          .json({ msg: `No EEW info with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: eewinfo,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateEEWinfo = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let eewinfo = await prisma.eewinfo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!eewinfo) {
        return res
          .status(404)
          .json({ msg: `No EEW info with the id: ${req.params.id} found` });
      }
  
      eewinfo = await prisma.eewinfo.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `EEW info with the id: ${req.params.id} successfully updated`,
        data: eewinfo,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteEEWInfo = async (req, res) => {
    try {
      const eewinfo = await prisma.eewinfo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!eewinfo) {
        return res
          .status(404)
          .json({ msg: `No EEW Info with the id: ${req.params.id} found` });
      }
  
      await prisma.eewinfo.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `EEW info with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };



  export {
    createEEWInfo,
    getEEWInfos,
    getEEWInfo,
    updateEEWinfo,
    deleteEEWInfo,
  };
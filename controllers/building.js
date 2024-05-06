import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBuilding = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.building.create({
        data: { ...req.body },
      });
  
      const newBuildings = await prisma.building.findMany();
  
      return res.status(201).json({
        msg: "Building damage log successfully created",
        data: newBuildings,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getBuildings = async (req, res) => { //******************************************************************* */
    try {
      const buildings = await prisma.building.findMany({
/*         include: {
            departments: true,
        }, */
      });

      if (req.query.id || req.query.houses_damaged || req.query.houses_destroyed || req.query.commerical_damaged || req.query.commerical_destroyed || req.query.earthquake_id || req.query.cost) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          houses_damaged: {
            equals: req.query.houses_damaged || undefined,
          },
          houses_destroyed: {
            equals: req.query.houses_destroyed || undefined,
          },
          commerical_damaged: {
            equals: req.query.commerical_damaged || undefined,
          },
          commerical_destroyed: {
            equals: req.query.commerical_destroyed || undefined,
          },
          earthquake_id: {
            equals: req.query.intensity || undefined,
          },
          cost: {
            equals: req.query.fault_line || undefined,
          },
        };
      }
  
      if (buildings.length === 0) {
        return res.status(404).json({ msg: "No building damage logs found" });
      }
  
      return res.json({ data: buildings });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getBuilding = async (req, res) => {
    try {
      const building = await prisma.building.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!building) {
        return res
          .status(404)
          .json({ msg: `No building damage with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: building,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateBuilding = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let building = await prisma.building.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!building) {
        return res
          .status(404)
          .json({ msg: `No building damage logs with the id: ${req.params.id} found` });
      }
  
      building = await prisma.building.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Building damage with the id: ${req.params.id} successfully updated`,
        data: building,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteBuilding = async (req, res) => {
    try {
      const building = await prisma.building.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!building) {
        return res
          .status(404)
          .json({ msg: `No building damage with the id: ${req.params.id} found` });
      }
  
      await prisma.building.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Building damage log with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };



  export {
    createBuilding,
    getBuildings,
    getBuilding,
    updateBuilding,
    deleteBuilding,
  };
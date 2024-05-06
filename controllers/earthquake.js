import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createEarthquake = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.earthquake.create({
        data: { ...req.body },
      });
  
      const newEarthquakes = await prisma.earthquake.findMany();
  
      return res.status(201).json({
        msg: "Earthquake successfully created",
        data: newEarthquakes,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getEarthquakes = async (req, res) => { //******************************************************************* */
    try {
      const earthquakes = await prisma.earthquake.findMany({
/*         include: {
            departments: true,
        }, */
      });

      if (req.query.id || req.query.date || req.query.magnitude || req.query.depth || req.query.duration || req.query.intensity || req.query.fault_line || req.query.after_shock_id ) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          date: {
            equals: req.query.date || undefined,
          },
          magnitude: {
            equals: req.query.magnitude || undefined,
          },
          depth: {
            equals: req.query.depth || undefined,
          },
          duration: {
            equals: req.query.duration || undefined,
          },
          intensity: {
            equals: req.query.intensity || undefined,
          },
          fault_line: {
            equals: req.query.fault_line || undefined,
          },
          after_shock_id: {
            equals: req.query.after_shock_id || undefined,
          },
        };
      }
  
      if (earthquakes.length === 0) {
        return res.status(404).json({ msg: "No earthquakes found" });
      }
  
      return res.json({ data: earthquakes });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getEarthquake = async (req, res) => {
    try {
      const earthquake = await prisma.earthquake.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!earthquake) {
        return res
          .status(404)
          .json({ msg: `No earthquake with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: earthquake,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateEarthquake = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let earthquake = await prisma.earthquake.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!earthquake) {
        return res
          .status(404)
          .json({ msg: `No earthquake with the id: ${req.params.id} found` });
      }
  
      earthquake = await prisma.earthquake.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Earthquake with the id: ${req.params.id} successfully updated`,
        data: earthquake,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteEarthquake = async (req, res) => {
    try {
      const earthquake = await prisma.earthquake.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!earthquake) {
        return res
          .status(404)
          .json({ msg: `No earthquake with the id: ${req.params.id} found` });
      }
  
      await prisma.earthquake.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Earthquake with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };



  export {
    createEarthquake,
    getEarthquakes,
    getEarthquake,
    updateEarthquake,
    deleteEarthquake,
  };
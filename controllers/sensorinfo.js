import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paginationDefault = {
  amount: 25, // The number of items per page
  page: 1, // The page number
};

const createSensorinfo = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.sensorinfo.create({
        data: { ...req.body },
      });
  
      const newEarthquakes = await prisma.sensorinfo.findMany();
  
      return res.status(201).json({
        msg: "Sensor Info successfully created",
        data: newEarthquakes,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getSensorinfos = async (req, res) => { //******************************************************************* */
    try {
      const sortBy = req.query.sortBy || "id" || "location" || "region" || "sensor_type" || "activate";
      const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";
  
      const amount = req.query.amount || paginationDefault.amount;
      const page = req.query.page || paginationDefault.page;
  
      const query = {
        take: Number(amount),
        skip: (Number(page) - 1) * Number(amount),
        orderBy: {
          [sortBy]: sortOrder,
        },
      };

      if (req.query.id || req.query.location || req.query.region || req.query.sensor_type || req.query.activate || req.query.earthquake_id) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          location: {
            equals: req.query.location || undefined,
          },
          region: {
            equals: req.query.region || undefined,
          },
          sensor_type: {
            equals: req.query.sensor_type || undefined,
          },
          activate: {
            equals: req.query.activate || undefined,
          },
        };
      }
  
      if (sensorinfos.length === 0) {
        return res.status(404).json({ msg: "No sensor infos found" });
      }
  
      return res.json({ data: sensorinfos });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getSensorinfo = async (req, res) => {
    try {
      const sensorinfo = await prisma.sensorinfo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!sensorinfo) {
        return res
          .status(404)
          .json({ msg: `No sensor info with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: sensorinfo,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateSensorinfo = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let sensorinfo = await prisma.sensorinfo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!sensorinfo) {
        return res
          .status(404)
          .json({ msg: `No sensorinfo with the id: ${req.params.id} found` });
      }
  
      sensorinfo = await prisma.sensorinfo.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Sensor Info with the id: ${req.params.id} successfully updated`,
        data: sensorinfo,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteSensorinfo = async (req, res) => {
    try {
      const sensorinfo = await prisma.sensorinfo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!sensorinfo) {
        return res
          .status(404)
          .json({ msg: `No sensorinfo with the id: ${req.params.id} found` });
      }
  
      await prisma.sensorinfo.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Sensor Info with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };



  export {
    createSensorinfo,
    getSensorinfos,
    getSensorinfo,
    updateSensorinfo,
    deleteSensorinfo,
  };
/**
 * @file Manages all operations related to Earthquake early warning infomation
 * @author Ben Mahoney
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paginationDefault = {
  amount: 25, // The number of items per page
  page: 1, // The page number
};

const createEEWInfo = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.EEWInfo.create({
        data: { ...req.body },
      });
  
      const newEarthquakes = await prisma.EEWInfo.findMany();
  
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
      const sortBy = req.query.sortBy || "id" || "alert_triggered" || "date" || "region" || "duration" || "accuracy" || "earthquake_id";
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

      if (req.query.id || req.query.alert_triggered || req.query.date || req.query.region || req.query.duration || req.query.accuracy || req.query.earthquake_id) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          alert_triggered: {
            equals: req.query.alert_triggered || undefined,
          },
          date: {
            equals: req.query.date || undefined,
          },
          region: {
            equals: req.query.region || undefined,
          },
          duration: {
            equals: req.query.duration || undefined,
          },
          accuracy: {
            equals: req.query.accuracy || undefined,
          },
          earthquake_id: {
            equals: req.query.earthquake_id || undefined,
          },
        };
      }
  
      const eewinfos = await prisma.EEWInfo.findMany(query); // Fetch earthquakes data from the database using Prisma

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
      const eewinfo = await prisma.EEWInfo.findUnique({
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
  
      let eewinfo = await prisma.EEWInfo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!eewinfo) {
        return res
          .status(404)
          .json({ msg: `No EEW info with the id: ${req.params.id} found` });
      }
  
      eewinfo = await prisma.EEWInfo.update({
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
      const eewinfo = await prisma.EEWInfo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!eewinfo) {
        return res
          .status(404)
          .json({ msg: `No EEW Info with the id: ${req.params.id} found` });
      }
  
      await prisma.EEWInfo.delete({
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
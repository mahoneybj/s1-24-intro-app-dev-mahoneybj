/**
 * @file Manages all operations related to earthquakes
 * @author Ben Mahoney
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paginationDefault = {
  amount: 25, // The number of items per page
  page: 1, // The page number
};

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

const getEarthquakes = async (req, res) => {
  //******************************************************************* */
  try {
    const sortBy =
      req.query.sortBy ||
      "id" ||
      "date" ||
      "magnitude" ||
      "depth" ||
      "duration" ||
      "intensity" ||
      "fault_line" ||
      "after_shock_id";
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

    if (
      Number(req.query.id) ||
      Date(req.query.date) ||
      Number(req.query.magnitude) ||
      Number(req.query.depth) ||
      Number(req.query.duration) ||
      Number(req.query.intensity) ||
      req.query.fault_line ||
      Number(req.query.after_shock_id)
    ) {
      query.where = {
        id: {
          equals: Number(req.query.id) || undefined,
        },
        date: {
          equals: Date(req.query.date) || undefined,
        },
        magnitude: {
          equals: Number(req.query.magnitude) || undefined,
        },
        depth: {
          equals: Number(req.query.depth) || undefined,
        },
        duration: {
          equals: Number(req.query.duration) || undefined,
        },
        intensity: {
          equals: Number(req.query.intensity) || undefined,
        },
        fault_line: {
          equals: req.query.fault_line || undefined,
        },
        after_shock_id: {
          equals: Number(req.query.after_shock_id) || undefined,
        },
      };
    }
    const earthquakes = await prisma.earthquake.findMany(query); // Fetch earthquakes data from the database using Prisma

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
        .json({ msg: `Earthquake with id: ${req.params.id} not found` });
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

/**
 * @file Manages all operations related to landslides
 * @author Ben Mahoney
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paginationDefault = {
  amount: 25, // The number of items per page
  page: 1, // The page number
};

const createLandslide = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json.",
      });
    }

    await prisma.landslide.create({
      data: { ...req.body },
    });

    const newEarthquakes = await prisma.landslide.findMany();

    return res.status(201).json({
      msg: "Landslide successfully created",
      data: newEarthquakes,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getLandslides = async (req, res) => {
  //******************************************************************* */
  try {
    const sortBy =
      req.query.sortBy ||
      "id" ||
      "smallest" ||
      "largest" ||
      "region" ||
      "number" ||
      "earthquake_id";
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
      req.query.id ||
      req.query.smallest ||
      req.query.largest ||
      req.query.region ||
      req.query.number ||
      req.query.earthquake_id
    ) {
      query.where = {
        id: {
          equals: req.query.id || undefined,
        },
        smallest: {
          equals: req.query.smallest || undefined,
        },
        largest: {
          equals: req.query.largest || undefined,
        },
        region: {
          equals: req.query.region || undefined,
        },
        number: {
          equals: req.query.number || undefined,
        },
        earthquake_id: {
          equals: req.query.earthquake_id || undefined,
        },
      };
    }

    const landslides = await prisma.landslide.findMany(query); // Fetch earthquakes data from the database using Prisma

    if (landslides.length === 0) {
      return res.status(404).json({ msg: "No landslides found" });
    }

    return res.json({ data: landslides });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getLandslide = async (req, res) => {
  try {
    const landslide = await prisma.landslide.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!landslide) {
      return res
        .status(404)
        .json({ msg: `No landslide with the id: ${req.params.id} found` });
    }

    return res.json({
      data: landslide,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateLandslide = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json.",
      });
    }

    let landslide = await prisma.landslide.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!landslide) {
      return res
        .status(404)
        .json({ msg: `No landslide with the id: ${req.params.id} found` });
    }

    landslide = await prisma.landslide.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Landslide with the id: ${req.params.id} successfully updated`,
      data: landslide,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteLandslide = async (req, res) => {
  try {
    const landslide = await prisma.landslide.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!landslide) {
      return res
        .status(404)
        .json({ msg: `No landslide with the id: ${req.params.id} found` });
    }

    await prisma.landslide.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Landslide with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  createLandslide,
  getLandslides,
  getLandslide,
  updateLandslide,
  deleteLandslide,
};

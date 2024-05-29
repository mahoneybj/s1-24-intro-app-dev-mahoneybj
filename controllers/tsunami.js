/**
 * @file Manages all operations related to tsunami'
 * @author Ben Mahoney
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paginationDefault = {
  amount: 25, // The number of items per page
  page: 1, // The page number
};

const createTsunami = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json.",
      });
    }

    await prisma.tsunami.create({
      data: { ...req.body },
    });

    const newTsunamis = await prisma.tsunami.findMany();

    return res.status(201).json({
      msg: "Tsunami successfully created",
      data: newTsunamis,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getTsunamis = async (req, res) => {
  //******************************************************************* */
  try {
    const sortBy =
      req.query.sortBy ||
      "id" ||
      "region" ||
      "date" ||
      "size" ||
      "duration" ||
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
      Number(req.query.id) ||
      req.query.region ||
      Date(req.query.date) ||
      Number(req.query.size) ||
      Number(req.query.duration) ||
      Number(req.query.earthquake_id)
    ) {
      query.where = {
        id: {
          equals: Number(req.query.id) || undefined,
        },
        region: {
          equals: req.query.region || undefined,
        },
        date: {
          equals: Date(req.query.date) || undefined,
        },
        size: {
          equals: Number(req.query.size) || undefined,
        },
        duration: {
          equals: Number(req.query.duration) || undefined,
        },
        earthquake_id: {
          equals: Number(res.query.earthquake_id) || undefined,
        },
      };
    }

    const tsunamis = await prisma.tsunami.findMany(query); // Fetch earthquakes data from the database using Prisma

    if (tsunamis.length === 0) {
      return res.status(404).json({ msg: "No tsunamis found" });
    }

    return res.json({ data: tsunamis });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getTsunami = async (req, res) => {
  try {
    const tsunami = await prisma.tsunami.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!tsunami) {
      return res
        .status(404)
        .json({ msg: `No tsunami with the id: ${req.params.id} found` });
    }

    return res.json({
      data: tsunami,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateTsunami = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json.",
      });
    }

    let tsunami = await prisma.tsunami.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!tsunami) {
      return res
        .status(404)
        .json({ msg: `No tsunami with the id: ${req.params.id} found` });
    }

    tsunami = await prisma.tsunami.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Tsunami with the id: ${req.params.id} successfully updated`,
      data: tsunami,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteTsunami = async (req, res) => {
  try {
    const tsunami = await prisma.tsunami.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!tsunami) {
      return res
        .status(404)
        .json({ msg: `No tsunami with the id: ${req.params.id} found` });
    }

    await prisma.tsunami.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Tsunami with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createTsunami, getTsunamis, getTsunami, updateTsunami, deleteTsunami };

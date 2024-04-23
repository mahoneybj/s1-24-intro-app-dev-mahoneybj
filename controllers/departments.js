import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const createDepartment = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.department.create({
        data: { ...req.body },
      });
  
      const newDepartments = await prisma.department.findMany();
  
      return res.status(201).json({
        msg: "Department successfully created",
        data: newDepartments,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };
  
  const getDepartments = async (req, res) => {
    try {
      const departments = await prisma.department.findMany();
  
      if (departments.length === 0) {
        return res.status(404).json({ msg: "No departments found" });
      }
  
      return res.json({ data: departments });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };







  const getDepartment = async (req, res) => {
    try {
      const department = await prisma.department.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!department) {
        return res
          .status(404)
          .json({ msg: `No department with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: department,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateDepartment = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let department = await prisma.department.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!department) {
        return res
          .status(404)
          .json({ msg: `No department with the id: ${req.params.id} found` });
      }
  
      department = await prisma.department.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Department with the id: ${req.params.id} successfully updated`,
        data: department,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteDepartment = async (req, res) => {
    try {
      const department = await prisma.department.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!department) {
        return res
          .status(404)
          .json({ msg: `No department with the id: ${req.params.id} found` });
      }
  
      await prisma.department.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Department with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
  };
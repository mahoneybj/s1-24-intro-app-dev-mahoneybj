import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCourse = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.course.create({
        data: { ...req.body },
      });
  
      const newCourse = await prisma.course.findMany();
  
      return res.status(201).json({
        msg: "course successfully created",
        data: newCourse,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getCourses = async (req, res) => {
    try {
      const course = await prisma.course.findMany({
        include: {
            departments: true,
        },
      });
  
      if (course.length === 0) {
        return res.status(404).json({ msg: "No course found" });
      }
  
      return res.json({ data: course });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getCourse = async (req, res) => {
    try {
      const course = await prisma.course.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!course) {
        return res
          .status(404)
          .json({ msg: `No course with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: course,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateCourse = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let course = await prisma.course.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!course) {
        return res
          .status(404)
          .json({ msg: `No course with the id: ${req.params.id} found` });
      }
  
      course = await prisma.course.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `course with the id: ${req.params.id} successfully updated`,
        data: course,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteCourse = async (req, res) => {
    try {
      const course = await prisma.course.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!course) {
        return res
          .status(404)
          .json({ msg: `No course with the id: ${req.params.id} found` });
      }
  
      await prisma.course.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `course with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };



  export {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
  };
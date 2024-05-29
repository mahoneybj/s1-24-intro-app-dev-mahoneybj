/**
 * @file Set of Joi validation schemas used to validate the request body for different earthquake related API endpoints.
 * @author Ben Mahoney
 */

import Joi from "joi";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const validatePostEarthquake = (req, res, next) => {
  const earthquakeSchema = Joi.object({
    date: Joi.date().iso().required().messages({
      "date.base": "date should be a date",
      "date.empty": "date cannot be empty",
      "any.required": "date is required",
    }),
    magnitude: Joi.number().required().messages({
      "number.base": "magnitude should be a decimal",
      "number.empty": "magnitude cannot be empty",
      "any.required": "magnitude is required",
    }),
    depth: Joi.number().precision(2).min(1).max(1000).required().messages({
      "number.base": "depth should be a decimal",
      "number.empty": "depth cannot be empty",
      "number.min": "depth should have a minimum length of {#limit}",
      "number.max": "depth should have a maximum length of {#limit}",
      "any.required": "depth is required",
    }),
    duration: Joi.number().precision(2).min(1).max(300).required().messages({
      "number.base": "duration should be a decimal",
      "number.empty": "duration cannot be empty",
      "number.min": "duration should have a minimum length of {#limit}",
      "number.max": "duration should have a maximum length of {#limit}",
      "any.required": "duration is required",
    }),
    intensity: Joi.number().min(1).max(8).required().messages({
      "number.base": "intensity should be a decimal",
      "number.empty": "intensity cannot be empty",
      "number.min": "intensity should have a minimum length of {#limit}",
      "number.max": "intensity should have a maximum length of {#limit}",
      "any.required": "intensity is required",
    }),
    fault_line: Joi.string().min(1).max(100).required().messages({
      "string.base": "fault_line should be a string",
      "string.empty": "fault_line cannot be empty",
      "string.min": "fault_line should have a minimum length of {#limit}",
      "string.max": "fault_line should have a maximum length of {#limit}",
      "any.required": "fault_line is required",
    }),
    after_shock_id: Joi.number().messages({
      "int.base": "fault_line should be a int",
    }),
  });

  const { error } = earthquakeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};

const validatePostBuilding = async (req, res, next) => {
  const buildingSchema = Joi.object({
    houses_damaged: Joi.number().required().messages({
      "number.base": "houses damaged should be a int",
      "number.empty": "houses damaged cannot be empty",
      "any.required": "houses damaged is required",
    }),
    houses_destroyed: Joi.number().messages({
      "number.base": "houses destroyed should be a int",
      "number.empty": "houses destroyed cannot be empty",
    }),
    commerical_damaged: Joi.number().required().messages({
      "number.base": "commerical damaged should be a int",
      "number.empty": "commerical damaged cannot be empty",
      "any.required": "commerical damaged is required",
    }),
    commerical_destroyed: Joi.number().messages({
      "number.base": "commerical destroyed should be a int",
      "number.empty": "commerical destroyed cannot be empty",
    }),
    earthquake_id: Joi.number().required().messages({
      "number.base": "earthquake id should be a int",
      "number.empty": "earthquake id cannot be empty",
      "any.required": "earthquake id is required",
    }),
    cost: Joi.number().required().messages({
      "number.base": "cost should be a int",
      "number.empty": "cost cannot be empty",
      "any.required": "cost is required",
    }),
  });

  const { error } = buildingSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  try {
    const earthquake = await prisma.earthquake.findUnique({
      where: { id: req.body.earthquake_id },
    });
    if (!earthquake) {
      return res.status(400).json({ msg: 'earthquake by that id does not exist' });
    }
  } catch (err) {
  }

  next();
};

const validatePostTsunami = async (req, res, next) => {
  const tsunamiSchema = Joi.object({
    region: Joi.string().required().messages({
      "string.base": "region should be a string",
      "string.empty": "region cannot be empty",
      "any.required": "region is required",
    }),
    date: Joi.date().iso().messages({
      "date.base": "date should be a date",
      "date.empty": "date cannot be empty",
    }),
    size: Joi.number().precision(1).required().messages({
      "number.base": "size should be a decimal",
      "number.empty": "size cannot be empty",
      "any.required": "size is required",
    }),
    duration: Joi.number().precision(1).messages({
      "number.base": "duration should be a decimal",
      "number.empty": "duration cannot be empty",
    }),
    earthquake_id: Joi.number().required().messages({
      "number.base": "earthquake id should be a int",
      "number.empty": "earthquake id cannot be empty",
      "any.required": "earthquake id is required",
    }),
  });

  const { error } = tsunamiSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  try {
    const earthquake = await prisma.earthquake.findUnique({
      where: { id: req.body.earthquake_id },
    });
    if (!earthquake) {
      return res.status(400).json({ msg: 'earthquake by that id does not exist' });
    }
  } catch (err) {
  }

  next();
};

const validatePostEEWInfo = (req, res, next) => {
  const eewinfoSchema = Joi.object({
    alert_triggered: Joi.boolean().required().messages({
      "boolean.base": "Alert triggered should be a boolean",
      "boolean.empty": "Alert triggered cannot be empty",
      "any.required": "Alert triggered is required",
    }),
    date: Joi.date().iso().required().messages({
      "date.base": "Date should be a valid date",
      "date.empty": "Date cannot be empty",
      "any.required": "Date is required",
    }),
    region: Joi.string().min(1).max(50).required().messages({
      "string.base": "Region should be a string",
      "string.empty": "Region cannot be empty",
      "string.min": "Region should have a minimum length of {#limit}",
      "string.max": "Region should have a maximum length of {#limit}",
      "any.required": "Region is required",
    }),
    duration: Joi.number().precision(2).min(1).max(300).required().messages({
      "number.base": "duration should be a decimal",
      "number.empty": "duration cannot be empty",
      "number.min": "duration should have a minimum length of {#limit}",
      "number.max": "duration should have a maximum length of {#limit}",
      "any.required": "duration is required",
    }),
    accuracy: Joi.number().precision(2).min(0.1).max(100).required().messages({
      "number.base": "Accuracy should be a decimal",
      "number.empty": "Accuracy cannot be empty",
      "number.min": "Accuracy should have a minimum length of {#limit}",
      "number.max": "Accuracy should have a maximum length of {#limit}",
      "any.required": "Accuracy is required",
    }),
    earthquake_id: Joi.number().required().messages({
      "number.base": "earthquake id should be a int",
      "number.empty": "earthquake id cannot be empty",
      "any.required": "earthquake id is required",
    }),
  });

  const { error } = eewinfoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};

const validatePostLandslide = async (req, res, next) => {
  const landslideSchema = Joi.object({
    smallest: Joi.number().precision(1).required().messages({
      "number.base": "Smallest landslide should be a decimal",
      "number.empty": "Smallest landslide cannot be empty",
      "any.required": "Smallest landslide is required",
    }),
    largest: Joi.number().precision(1).required().messages({
      "number.base": "Largest landslide should be a decimal",
      "number.empty": "Largest landslide cannot be empty",
      "any.required": "Largest landslide is required",
    }),
    region: Joi.string().min(1).max(50).required().messages({
      "string.base": "Region should be a string",
      "string.empty": "Region cannot be empty",
      "string.min": "Region should have a minimum length of {#limit}",
      "string.max": "Region should have a maximum length of {#limit}",
      "any.required": "Region is required",
    }),
    number: Joi.number().min(1).max(300).required().messages({
      "number.base": "Number of landslides should be a int",
      "number.empty": "Number of landslides cannot be empty",
      "number.min":
        "Number of landslides should have a minimum length of {#limit}",
      "number.max":
        "Number of landslides should have a maximum length of {#limit}",
      "any.required": "Number of landslides is required",
    }),
    earthquake_id: Joi.number().required().messages({
      "number.base": "earthquake id should be a int",
      "number.empty": "earthquake id cannot be empty",
      "any.required": "earthquake id is required",
    }),
  });

  const { error } = landslideSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  try {
    const earthquake = await prisma.earthquake.findUnique({
      where: { id: req.body.earthquake_id },
    });
    if (!earthquake) {
      return res.status(400).json({ msg: 'earthquake by that id does not exist' });
    }
  } catch (err) {
  }

  next();
};

const validatePostSensorInfo = async (req, res, next) => {
  const sensorinfoSchema = Joi.object({
    location: Joi.string().required().messages({
      "string.base": "Location should be a string",
      "string.empty": "Location cannot be empty",
      "any.required": "Location is required",
    }),
    region: Joi.string().required().messages({
      "string.base": "Region should be a string",
      "string.empty": "Region cannot be empty",
      "any.required": "Region is required",
    }),
    sensor_type: Joi.string().min(1).max(50).required().messages({
      "string.base": "Sensor type should be a string",
      "string.empty": "Sensor type cannot be empty",
      "string.min": "Sensor type should have a minimum length of {#limit}",
      "string.max": "Sensor type should have a maximum length of {#limit}",
      "any.required": "Sensor type is required",
    }),
    activate: Joi.boolean().required().messages({
      "boolean.base": "Active status should be a boolean",
      "boolean.empty": "Active status cannot be empty",
      "any.required": "Active status is required",
    }),
    earthquake_id: Joi.number().required().messages({
      "number.base": "earthquake id should be a int",
      "number.empty": "earthquake id cannot be empty",
      "any.required": "earthquake id is required",
    }),
  });

  const { error } = sensorinfoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }
  try {
    const earthquake = await prisma.earthquake.findUnique({
      where: { id: req.body.earthquake_id },
    });
    if (!earthquake) {
      return res.status(400).json({ msg: 'earthquake by that id does not exist' });
    }
  } catch (err) {
  }

  next();
};

export {
  validatePostEarthquake,
  validatePostBuilding,
  validatePostTsunami,
  validatePostEEWInfo,
  validatePostLandslide,
  validatePostSensorInfo,
};

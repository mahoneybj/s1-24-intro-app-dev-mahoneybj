// Import the Express module
import express from 'express';

// Import the CORS module
import cors from 'cors';

// Import the index routes module
import indexRoutes from './routes/index.js';
// This should be declared under import indexRoutes from "./routes/app.js";
import buildingRoutes from "./routes/building.js";

import earthquakeRoutes from "./routes/earthquake.js";

import eewinfoRoutes from "./routes/eewinfo.js";

import landslideRoutes from "./routes/landslide.js";

import sensorinfoRoutes from "./routes/sensorinfo.js";

import tsunamiRoutes from "./routes/tsunami.js";

// Create an Express application
const app = express();
// This should be declared under const app = express();
const setXContentTypeOptions = (req, res, next) => {
  res.set("x-content-type-options", "nosniff");
  next();
};
// This should be declared under the setXContentTypeOptions function
const setXFrameOptions = (req, res, next) => {
  res.set("x-frame-options", "deny");
  next();
};
const setContentSecurityPolicy = (req, res, next) => {
  res.set("content-security-policy", "default-src 'none'");
  next();
};


// This should be declared under app.use(cors());
app.use(setXContentTypeOptions);
// This should be declared under app.use(setXContentTypeOptions);
app.use(setXFrameOptions);
app.use(setContentSecurityPolicy);



// Use the CORS module
app.use(cors());
// This should be declared under app.use(cors());
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads. For example, form data
// This should be declared under app.use(urlencoded({ extended: false }));
app.use(express.json()); // To parse the incoming requests with JSON payloads. For example, REST API requests


// Use the routes module
app.use('/', indexRoutes);
// This should be declared under app.use("/", indexRoutes);
app.use("/api/institutions", institutionRoutes);

app.use("/api/building", buildingRoutes);

app.use("/api/earthquake", earthquakeRoutes);

app.use("/api/eewinfo", eewinfoRoutes);

app.use("/api/landslide", landslideRoutes);

app.use("/api/sensorinfo", sensorinfoRoutes);

app.use("/api/tsunami", tsunamiRoutes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Export the Express application. Other modules may use it. For example, API testing
export default app;
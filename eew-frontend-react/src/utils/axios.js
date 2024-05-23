import axios from "axios";

// Create an axios instance
const earthquakeEarlyWarningSystemInstance = axios.create({
  baseURL: "https://s1-24-intro-app-dev-mahoneybj.onrender.com/api", // Replace with your own API URL
  timeout: 100000, // 100 seconds. Increase if requests are timing out
});

export { earthquakeEarlyWarningSystemInstance };

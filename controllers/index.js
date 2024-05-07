// Create a GET route
const get = (req, res) => { 
    res.send('Endpoints:\n/api/building/\n/api/earthquake/\napi/eewinfo/\n/api/landslide\n/api/sensorinfo/\n/api/tsunami/');

  };
  
  // Export the get function
  export { get };
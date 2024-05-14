const endpoints = [
  '/api/building/',
  '/api/earthquake/',
  '/api/eewinfo/',
  '/api/landslide/',
  '/api/sensorinfo/',
  '/api/tsunami/'
];

const get = (req, res) => {
  res.send( {data: endpoints} );
};

// Export the get function
export { get };

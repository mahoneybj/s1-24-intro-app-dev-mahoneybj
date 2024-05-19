/**
 * @file Returns hardcodded endpoints of the API
 * @author Ben Mahoney
 */

const endpoints = [
  '/api/buildings/',
  '/api/earthquakes/',
  '/api/eewinfo/',
  '/api/landslides/',
  '/api/sensorinfo/',
  '/api/tsunamis/'
];

const get = (req, res) => {
  res.send( {data: endpoints} );
};

// Export the get function
export { get };

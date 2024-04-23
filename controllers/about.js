// Create a GET route
const about = (req, res) => { 
    res.send({ID: '123456', FirstName: 'Ben' , LastName: 'Mahoney', Fav: 'Embedded'});

  };
  
  // Export the get function
  export { about };
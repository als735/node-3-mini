require("dotenv").config();
const express = require("express");
const massive = require("massive");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING).then(dbInstance =>{
  app.set('db', dbInstance); console.log(dbInstance) // set is allowing you to access dbInstance through a get request using db 
  // only done once.  

  // dbInstance.new_planes()
  //   .then( planes => console.log( planes ) )
  //   .catch( err => console.log( err ) );

  dbInstance.get_planes({count : 400}) // accessing the file get_planes and I'm asking for all the planes that have a count above 400 to be returned (generally you want it to run through and end point and then once it hits the end point it will return the data as opposed to the data being returned right off)
    .then(planes => console.log(planes)) // 
    .catch(err => console.log(err));
});

app.use(express.json());

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});

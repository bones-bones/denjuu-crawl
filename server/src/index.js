/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require('dotenv').config({});
const https = require('https')
const express =require('express');
const app = express();
const  Stream = require('stream').Transform;




const PORT = process.env.PORT || 3001;
// https://nodejs.dev/learn/making-http-requests-with-nodejs

// app.use(function (req, res, next) {
// console.log('middleware');
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next(req, res);
// });

app.get('/map', (request, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed

  console.log('we in',request.query);
  const mapOptions={
    hostname:'dev.virtualearth.net',
    path:`/REST/v1/Imagery/Map/BirdsEye/${request.query.lat||'47.66177'},${request.query.long||'-117.40996'}/20?key=${process.env.LOCATIONS_API_KEY}&mapLayer=Basemap,Buildings`,
    method:'GET'
  }
  
  // Ariel 17
  // BirdsEye 20
  var data = new Stream();                                                    


  const mapRequset=https.request(mapOptions,response=>{
    response.on('data', d => {
      console.log('1');
      data.push(d);                                                         
    })
    response.on('end', () => {
      //end of data
      // console.log('requestover');
      res.setHeader("Content-Type", "image/jpeg")
      // res.write(datae)
      // res.end()
      res.send(data.read()); 
    })
  });

  console.log(mapRequset)

  mapRequset.on('error', error => {
    console.error(error)
  })
  mapRequset.end()


  // res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

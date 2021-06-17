/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require('dotenv').config({});
const https = require('https')
const express =require('express');
const app = express();
const  Stream = require('stream').Transform;


const brevUrl='/absproxy/3001/map'

const PORT = process.env.PORT || 3001;
// https://nodejs.dev/learn/making-http-requests-with-nodejs
const mapOptions={
  hostname:'dev.virtualearth.net',
  path:'/REST/v1/Imagery/Map/Road/47.66177,-117.40996/16?key='+process.env.LOCATIONS_API_KEY+'&mapLayer=Basemap,Buildings',
  method:'GET'
}

app.get(brevUrl, (request, res) => {
  console.log('we in');
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


/**
 *   response = requests.get(turl)
  response_body = response.content
  headers_t = {"content-type": "image/jpeg"}
  return Response(response_body, status_code=200, headers=headers_t, media_type="image/jpeg")

 */
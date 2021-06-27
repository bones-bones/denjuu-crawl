/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require('dotenv').config({});
const https = require('https');
const express = require('express');
const app = express();
const Stream = require('stream').Transform;

const PORT = process.env.PORT || 3001;

app.get('/map', (request, res) => {
    console.log('/map');
    res.setHeader('Access-Control-Allow-Origin', request.get('origin')||'*'); //'https://3000.bonesbonesdenjuucrawl3.boostedstack.io');
    console.log(request.get('origin')||'*')
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('ETag',`${request.query.lat},${request.query.long }`)
    const mapOptions = {
        hostname: 'dev.virtualearth.net',
        path: `/REST/v1/Imagery/Map/Aerial/${
             request.query.lat || '47.66177'
        },${
            request.query.long || '-117.40996'
        }/19?key=${
              process.env.LOCATIONS_API_KEY
        }&mapLayer=Basemap,Buildings`,
        method: 'GET',
    };
    //48.3522223,-119.602656
    // Aerial 17
    // BirdsEye 20
    var data = new Stream();

    const mapRequset = https.request(mapOptions, (response) => {
        response.on('data', (d) => {
            data.push(d);
        });
        response.on('end', () => {
            //end of data
            // console.log('requestover');
            res.setHeader('Content-Type', 'image/jpeg');
            // res.write(datae)
            // res.end()
            res.send(data.read());
        });
    });

   // console.log(mapRequset);

    mapRequset.on('error', (error) => {
        console.error(error);
    });
    mapRequset.end();
    // res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

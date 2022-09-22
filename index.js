const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
    let ipAddress = req.body.ipAddress;
    console.log(req.body);

    let url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_uRWlk9ncEBAp2iIopBoONU75d8fX9&ipAddress=' + ipAddress;
    let options = {
        method: 'GET'
    }

    let request = https.request(url, options, (resp) => {
        console.log(resp.statusCode);
        let parsedData = '';

        resp.on('data', (d) => {
            parsedData += d;

        })

        resp.on('end', () => {
            res.send(JSON.parse(parsedData));
        })

    })

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();

})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000.');
});
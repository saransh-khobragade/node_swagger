const express = require('express')
const app = express()

app.get('/ping', async (req, res) => {
    res.status(200).send({ "ping": "pong" })
});

var server = require('http').createServer(app);

server.listen(process.env.PORT || 8080);
console.log('server running...at 8080');

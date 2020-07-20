const express = require('express')
const app = express()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


app.get('/ping', async (req, res) => {
    res.status(200).send({ "ping": "pong" })
});

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: 'test application',
        version: '1.0.0',
        description: 'Endpoints to the APIs',
    },
    host: 'http://localhost:8080/',
    basePath: '/',
    servers: [
        {
            url: 'http://localhost:8080/'
        }
    ]
};
const options = {
    swaggerDefinition,
    apis: [
        "./index.js",
        "./swagger_def/*.yaml"
    ],
};
const swaggerSpec = swaggerJsDoc(options);
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
    console.log("swaggerSpec", swaggerSpec)
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

var server = require('http').createServer(app);

server.listen(process.env.PORT || 8080);
console.log('server running...at 8080');

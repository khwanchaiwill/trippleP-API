const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const server = express();

server.use(helmet())
server.use(express.json());
server.use(cors())
server.use(logger)


server.get("/", (req, res) => {
    res.send('Testing the api')
})

function logger (req, res, next){
    console.log(`${req.method} request the ${req.url}`, Date())
    next();
}

module.exports = server;



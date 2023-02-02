const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(logger);

server.get("/", (req, res) => {
    res.status(200).json({ Hello: "World, The api is now very working" });
  });
  function logger(req, res, next) {
    console.log(`${req.method} request the ${req.url}`, Date());
    next();
  }
  
  module.exports = server;
  
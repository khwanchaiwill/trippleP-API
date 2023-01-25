require('dotenv').config();

const server = require('./Api/server.js');

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`listen to server ${port}`))
const net = require('node:net');
const {DataBase} = require('./src/datebase');
const {requestHandler} = require("./src/requestHandler");

const main = () => {
  const server = net.createServer();
  server.listen(8001)
  server.on('connection', (socket) => {
    socket.setEncoding('utf-8');
    socket.on("data", (request) => requestHandler(socket, request));
  });
};

main();
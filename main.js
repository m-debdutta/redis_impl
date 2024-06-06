const net = require('node:net');
const {DataBase} = require('./src/datebase');
const {requestHandler} = require("./src/requestHandler");

const main = () => {
  const database = new DataBase();
  const server = net.createServer();
  server.listen(8001)
  server.on('connection', (socket) => {
    console.log('Received a connection')

    socket.setEncoding('utf-8');
    socket.on("data", (request) => requestHandler(socket, request, database));

    socket.on("end", () => console.log('Disconnected'));
  });
};

main();
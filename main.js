const net = require("node:net");
const { DataBase } = require("./src/datebase");
const { requestHandler } = require("./src/requestHandler");
const { HashTable } = require("./src/hashTable");

const main = () => {
  const hashTable = new HashTable();
  const database = new DataBase(hashTable);
  const server = net.createServer();

  server.on("connection", (socket) => {
    console.log("Received a connection");

    socket.setEncoding("utf-8");
    socket.on("data", (request) => {
      const response = requestHandler(request, database);
      socket.write(response);
    });

    socket.on("end", () => console.log("Disconnected"));
  });

  server.listen(8001);
};

main();

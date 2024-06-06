const net = require('node:net');

const main = () => {
  const server = net.createServer();
  server.listen(8001)
  server.on('connection', (socket) => {
    socket.setEncoding('utf-8');

    socket.on("data", (req) => {
      console.log(req);
      socket.write('+OK\r\n');
    });
  })
}

main();
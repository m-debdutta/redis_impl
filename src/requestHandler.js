const {chunk} = require("lodash");

const parseRequest = (request) => {
  const [_, ...tokens] = request.split('\r\n').slice(0, -1);
  const [command, ...args] = chunk(tokens, 2).map(([_, cla]) => cla)
  return [command.toUpperCase(), args];
}

const requestHandler = (socket, request) => {
  const [command, args] = parseRequest(request);
  console.log('command', command);
  console.log('args', args);
  socket.write('+OK\r\n')
}

module.exports = {requestHandler};
const {chunk} = require("lodash");

const parseRequest = (request) => {
  const [_, ...tokens] = request.split('\r\n').slice(0, -1);
  const [command, ...args] = chunk(tokens, 2).map(([_, cmdArg]) => cmdArg)
  return [command.toUpperCase(), args];
}

const handleCommand = (command, args, database) => {
  switch (command) {
    case 'SET':
      return database.set(args);
    case 'GET':
      return database.get(args);
    case 'DEL':
      return database.del(args);
    default:
      return 'no such command';
  }
}

const responseGenerator = (crudeResponse) => {
  const response = {
    simpleString: '+',
    simpleError: '-',
    integers: ':',
    null: '_',
  }

  switch (crudeResponse) {
    case 'no such command':
      return response.simpleError + crudeResponse + '\r\n';
    case undefined:
      return response.null + '\r\n';
    case 1:
      return response.integers + 1 + '\r\n';
    case 0:
      return response.integers + 0 + '\r\n';
    default:
      return response.simpleString + crudeResponse + '\r\n';
  }
}

const requestHandler = (socket, request, database) => {
  const [command, args] = parseRequest(request);
  const crudeResponse = handleCommand(command, args, database);
  socket.write(responseGenerator(crudeResponse))
}

module.exports = {requestHandler};
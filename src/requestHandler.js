const {chunk} = require("lodash");

const RESP_FIRST_BYTE = {
  simpleString: '+',
  simpleError: '-',
  integers: ':',
  null: '_',
  array: '*'
}

const parseRequest = (request) => {
  const [_, ...tokens] = request.split('\r\n').slice(0, -1);
  const [command, ...args] = chunk(tokens, 2).map(([_, cmdArg]) => cmdArg)
  return [command.toUpperCase(), args];
}

const handleCommand = (command, args, database) => {
  switch (command) {
    case 'SET':
      database.set(args);
      return 'OK';
    case 'GET':
      return database.get(args);
    case 'DEL':
      return database.del(args);
    case 'LPUSH':
      return database.lpush(args);
    case 'LPOP':
      return database.lpop(args);
    case 'LRANGE':
      return database.lrange(args);
    case 'SADD':
      return database.sadd(args);
    case 'SMEMBERS':
      return database.smembers(args);
    case 'SREM':
      return database.srem(args);
    default:
      return 'no such command';
  }
}

const generateArrayResponse = (list) => {
  return RESP_FIRST_BYTE.array +
    list.length + '\r\n' +
    list.map(element => responseGenerator(element)).join('');
}

const responseGenerator = (crudeResponse) => {
  switch (true) {
    case crudeResponse === 'no such command':
      return RESP_FIRST_BYTE.simpleError + crudeResponse + '\r\n';

    case crudeResponse === undefined:
      return RESP_FIRST_BYTE.null + '\r\n';

    case typeof crudeResponse === 'number':
      return RESP_FIRST_BYTE.integers + crudeResponse + '\r\n';

    case crudeResponse instanceof Array:
      return generateArrayResponse(crudeResponse);

    default:
      return RESP_FIRST_BYTE.simpleString + crudeResponse + '\r\n';
  }
}

const requestHandler = (socket, request, database) => {
  const [command, args] = parseRequest(request);
  const crudeResponse = handleCommand(command, args, database);
  socket.write(responseGenerator(crudeResponse))
}

module.exports = {requestHandler};
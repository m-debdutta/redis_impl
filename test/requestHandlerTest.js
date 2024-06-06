const {describe, it} = require('node:test');
const {requestHandler} = require("../src/requestHandler");
const {DataBase} = require("../src/datebase");
const assert = require('node:assert');

describe('request handler tests', () => {
  it('should set a value in database', () => {
    const request = ['*3', '$3', 'SET', '$4', 'name', '$4', 'Debu', ''].join('\r\n');
    const database = new DataBase();
    const actual = requestHandler(request, database);
    assert.deepStrictEqual(actual, '+OK\r\n');
  });

  it('should get a value from database', () => {
    const requestToSet = ['*3', '$3', 'SET', '$4', 'name', '$4', 'Debu', ''].join('\r\n');
    const requestToGet = ['*2', '$3', 'GET', '$4', 'name', ''].join('\r\n');
    const database = new DataBase();
    requestHandler(requestToSet, database);
    const actual = requestHandler(requestToGet, database);
    assert.deepStrictEqual(actual, '+Debu\r\n');
  });

  it('should del a value from database', () => {
    const requestToSet = ['*3', '$3', 'SET', '$4', 'name', '$4', 'Debu', ''].join('\r\n');
    const requestToGet = ['*2', '$3', 'GET', '$4', 'name', ''].join('\r\n');
    const requestToDelete = ['*2', '$3', 'DEL', '$4', 'name', ''].join('\r\n');
    const database = new DataBase();

    requestHandler(requestToSet, database);
    requestHandler(requestToGet, database);
    const actual = requestHandler(requestToDelete, database);

    assert.deepStrictEqual(actual, ':1\r\n');
  });
});
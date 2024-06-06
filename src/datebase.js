class DataBase {
  #obj;
  
  constructor() {
    this.#obj = {};
  }

  set([key, value]) {
    this.#obj[key] = value;
    return 'OK';
  }

  get([key]) {
    return this.#obj[key];
  }

  del([key]) {
    const response = this.#obj[key] ? 1 : 0;
    delete this.#obj[key];
    return response;
  }
}

module.exports = {DataBase};

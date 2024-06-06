class DataBase {
  #obj;

  constructor() {
    this.#obj = {};
  }

  set([key, value]) {
    this.#obj[key] = value;
    return "OK";
  }

  get([key]) {
    return this.#obj[key];
  }

  del([key]) {
    const response = this.#obj[key] ? 1 : 0;
    delete this.#obj[key];
    return response;
  }

  lpush([key, value]) {
    const list = this.#obj[key];

    if (list) {
      list.push(value);
    } else {
      this.#obj[key] = [value];
    }

    return this.#obj[key].length;
  }

  lpop([key]) {
    return this.#obj[key].pop();
  }

  lrange([key, lower, upper]) {
    if (upper === "-1") {
      return this.#obj[key];
    }
    return this.#obj[key].slice(lower, upper);
  }
}

module.exports = { DataBase };

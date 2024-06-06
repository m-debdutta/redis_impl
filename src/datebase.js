class DataBase {
  #obj;

  constructor() {
    this.#obj = {};
  }

  set([key, value]) {
    this.#obj[key] = value;
  }

  get([key]) {
    return this.#obj[key];
  }

  del([key]) {
    const response = this.#obj[key] ? 1 : 0;
    delete this.#obj[key];
    return response;
  }

  lpush([key, ...values]) {
    const list = this.#obj[key];

    if (list) {
      values.forEach(value => list.push(value));
    } else {
      this.#obj[key] = values;
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

  sadd([key, ...values]) {
    const set = this.#obj[key];

    if(!set) {
      this.#obj[key] = new Set(values);
      return values.length;
    }

    if(values.every(value => set.has(value))) {
      return 0;
    }

    if(set) {
      values.forEach(value => set.add(value));
      return values.length
    }
  }

  srem([key, value]) {
    return this.#obj[key].delete(value) ? 1 : 0;
  }

  smembers([key]) {
    return [...this.#obj[key].values()];
  }
}

module.exports = { DataBase };

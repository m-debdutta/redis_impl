class DataBase {
  #db;

  constructor(hashTable) {
    this.#db = hashTable;
  }

  set([key, value]) {
    this.#db.set(key, value);
  }

  get(key) {
    return this.#db.get(key);
  }

  del(key) {
    return this.#db.del(key);
  }

  lpush([key, ...values]) {
    const existedList = this.#db.get(key) || [];
    const updatedList = [...values.slice().reverse(), ...existedList];
    this.#db.set(key, updatedList);

    return updatedList.length;
  }

  lpop(key) {
    //update the list
    return this.#db.get(key)[0];
  }

  lrange(key, start, stop) {
    const list = this.#db.get(key);

    if (!list) return;

    const adjustIndex = (index) => (index < 0 ? list.length + index : index);

    const from = adjustIndex(start);
    const to = adjustIndex(stop);

    return list.slice(from, to + 1);
  }

  #createSetAndStore(key) {
    const set = new Set();
    this.#db.set(key, set);

    return set;
  }

  sadd([key, ...values]) {
    const set = this.#db.get(key) || this.#createSetAndStore(key);
    values.forEach((value) => set.add(value));

    return set.size;
  }

  srem([key, value]) {
    return this.#db.get(key).delete(value) ? 1 : 0;
  }

  sIsMember(key) {
    return this.#db.get(key).has(key);
  }

  smembers(key) {
    return [...this.#db.get(key).values()];
  }
}

module.exports = { DataBase };

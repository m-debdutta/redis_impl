class DataBase {
  #core;

  constructor(hashTable) {
    this.#core = hashTable;
  }

  set([key, value]) {
    this.#core.set(key, value);
  }

  get(key) {
    return this.#core.get(key);
  }

  del(key) {
    return this.#core.del(key);
  }

  lpush([key, ...values]) {
    const existedList = this.#core.get(key) || [];
    const updatedList = [...values.slice().reverse(), ...existedList];
    this.#core.set(key, updatedList);

    return updatedList.length;
  }

  lpop(key) {
    return this.#core.get(key)[0];
  }

  lrange(key, start, stop) {
    const list = this.#core.get(key);

    if(!list) return;

    const adjustIndex = (index) => (index < 0 ? list.length + index : index);

    const from = adjustIndex(start);
    const to = adjustIndex(stop);

    return list.slice(from, to + 1);
  }

  sadd([key, ...values]) {
    const set = this.#core.get(key);

    if (!set) {
      this.#core.set(key, new Set(values));
      return values.length;
    }

    //mutability
    values.forEach((value) => set.add(value));
    return set.size();
  }

  srem([key, value]) {
    return this.#core.get(key).delete(value) ? 1 : 0;
  }

  sIsMember(key) {
    return this.#core.get(key).has(key);
  }

  smembers(key) {
    return [...this.#core.get(key).values()];
  }
}

module.exports = { DataBase };

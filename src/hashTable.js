class HashTable {
  #buckets;

  constructor() {
    this.#buckets = [];
  }

  #rollingHash(str, prime, mod) {
    return [...str].reduce( (hash, char) => 
        (hash * prime + char.charCodeAt()) % mod, 0);
  }
  
  #findBucket(str) {
    return this.#rollingHash(str, 31, 1000000007) % 3;
  }

  #findEntryIndex(bucket, key) {
    return bucket.findIndex((entry) => entry.key === key);
  }

  set(key, value) {
    const index = this.#findBucket(key);

    const bucket = this.#buckets[index] || (this.#buckets[index] = []);

    const entryIndex = this.#findEntryIndex(bucket, key);

    if (entryIndex === -1) bucket.push({ key, value });
    else this.#buckets[index][entryIndex].value = value;
  }

  get(key) {
    const index = this.#findBucket(key);
    const entry = this.#buckets[index]?.find((entry) => entry.key === key);

    return entry?.value;
  }

  del(key) {
    const bucket = this.#findBucket(key);
    const entryIndex = this.#findEntryIndex(this.#buckets[bucket], key);

    if (entryIndex === -1) return 0;

    this.#buckets[bucket].splice(entryIndex, 1);
    return 1;
  }
}

module.exports = { HashTable };

class HashTable {
  #buckets;
  #size;

  constructor(size = 10) {
    this.#buckets = [];
    this.#size = size;
  }

  #rollingHash(str, prime, mod) {
    return [...str].reduce((hash, char) => 
        (hash * prime + char.charCodeAt()) % mod, 0);
  }

  #findBucketId(str) {
    return this.#rollingHash(str, 31, 1000000007) % this.#size;
  }

  #findEntryIndex(bucket, key) {
    return bucket.findIndex((entry) => entry.key === key);
  }

  set(key, value) {
    const bucketId = this.#findBucketId(key);

    const bucket = this.#buckets[bucketId] || (this.#buckets[bucketId] = []);

    const entryIndex = this.#findEntryIndex(bucket, key);

    if (entryIndex === -1) bucket.push({ key, value });
    else this.#buckets[bucketId][entryIndex].value = value;
  }

  get(key) {
    const bucketId = this.#findBucketId(key);
    const entry = this.#buckets[bucketId]?.find((entry) => entry.key === key);

    return entry?.value;
  }

  del(key) {
    const bucketId = this.#findBucketId(key);
    const entryIndex = this.#findEntryIndex(this.#buckets[bucketId], key);

    if (entryIndex === -1) return 0;

    this.#buckets[bucketId].splice(entryIndex, 1);
    return 1;
  }
}

module.exports = { HashTable };

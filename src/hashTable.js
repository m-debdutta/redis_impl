const buckets = [];

const findBucket = (str) => rollingHash(str, 31, 1000000007) % 5;

const rollingHash = (str, prime, mod) =>
  [...str].reduce((hash, char) => (hash * prime + char.charCodeAt()) % mod, 0);

const findEntryIndex = (bucket, key) =>
  bucket.findIndex((entry) => entry.key === key);

const findEntry = (bucket, key) => bucket.find((entry) => entry.key === key);

const set = (pair) => {
  const { key, value } = pair;
  const index = findBucket(key);
  const bucket = buckets[index] || (buckets[index] = []);

  if (findEntryIndex(bucket) !== -1) {
    buckets[index][entryIndex].value = value;
  } else {
    bucket.push({ key, value });
  }
};

const get = (key) => {
  const index = findBucket(key);
  const entry = findEntry(buckets[index], key);

  return entry?.value;
};

const del = (key) => {
  const bucket = findBucket(key);
  const entryIndex = findEntryIndex(buckets[bucket], key);

  if (entryIndex === -1) return 0;

  buckets[bucket].splice(entryIndex, 1);
  return 1;
};


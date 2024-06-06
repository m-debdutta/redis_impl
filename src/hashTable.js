const buckets = [];

const getBucketIndex = (str) => rollingHash(str, 31, 1000000007) % 100;

const rollingHash = (str, prime, mod) =>
  [...str].reduce((hash, char) => (hash * prime + char.charCodeAt()) % mod, 0);

const set = (pair) => {
  const { key, value } = pair;
  const index = getBucketIndex(key);
  const bucket = buckets[index] || (buckets[index] = []);

  const entryIndex = bucket.findIndex((entry) => entry.key === key);

  if (entryIndex !== -1) {
    buckets[index][entryIndex].value = value;
  } else {
    bucket.push({ key, value });
  }
};

const get = (key) => {
  const index = getBucketIndex(key);
  const entry = buckets[index].find((entry) => entry.key === key);

  return entry ? entry.value : -1;
};

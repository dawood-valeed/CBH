const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const HASH_ALGO = "sha3-512";

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (event.partitionKey) {
      candidate =
        typeof event.partitionKey !== "string"
          ? JSON.stringify(event.partitionKey)
          : event.partitionKey;

      if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        candidate = crypto
          .createHash(HASH_ALGO)
          .update(candidate)
          .digest("hex");
      }
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash(HASH_ALGO).update(data).digest("hex");
    }
  }

  return candidate;
};

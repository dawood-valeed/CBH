const {deterministicPartitionKey} = require("./dpk");

console.log(deterministicPartitionKey({ partitionKey: "input test" }));
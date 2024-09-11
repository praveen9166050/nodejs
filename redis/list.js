const { Redis } = require("ioredis");
const client = require("./client");

async function init() {
  // await client.lpush('users', 'user1');
  // await client.lpush('users', 'user2');
  // await client.lpush('users', 'user3');
  // await client.lpush('users', 'user4');
  const result = await client.rpop('users');
  console.log(result);
}

init();
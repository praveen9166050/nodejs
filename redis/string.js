const client = require("./client");

async function init() {
  await client.set('msg:1', 'Hello from client');
  const result = await client.get('msg:1');
  console.log(result);
}

init();
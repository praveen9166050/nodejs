const axios = require('axios');
const express = require('express');
const client = require('./client');

const app = express();

app.get('/', async (req, res) => {
  const cacheValue = await client.get('todos');
  if (cacheValue) {
    return res.status(200).json(JSON.parse(cacheValue));
  }
  const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos");
  await client.set('todos', JSON.stringify(data));
  await client.expire('todos', 30);
  res.status(200).json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
})
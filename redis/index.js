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

app.get('/photos', async (req, res) => {
  const albumId = req.query.albumId;
  const cacheValue = await client.get(`photos?albumId=${albumId}`);
  if (cacheValue) {
    return res.status(200).json(JSON.parse(cacheValue));
  }
  const {data} = await axios.get("https://jsonplaceholder.typicode.com/photos", {
    params: {albumId}
  });
  client.setex(`photos?albumId=${albumId}`, 3600, JSON.stringify(data));
  res.status(200).json(data);
});

app.get('/photos/:id', async (req, res) => {
  const id = req.params.id;
  const cacheValue = await client.get(`photos:${id}`);
  if (cacheValue) {
    return res.status(200).json(JSON.parse(cacheValue));
  }
  const {data} = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
  client.setex(`photos:${id}`, 3600, JSON.stringify(data));
  res.status(200).json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
})
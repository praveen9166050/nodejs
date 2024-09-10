const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hi, I am a nodejs server in container"
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
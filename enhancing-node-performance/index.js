const express = require('express');
const cluster = require('node:cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {
  // A child, will act like a server and do nothing else
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {

    }
  }

  app.get('/', (req, res) => {
    doWork(5000);
    res.send("Hi there");
  });

  app.get('/fast', (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000, () => {
    console.log("The server is listening on port 3000");
  });
}
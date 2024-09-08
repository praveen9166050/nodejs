import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const server = http.createServer((req, res) => {
  console.log(new Date() + " Recieved request for " + req.url);
  res.end("Hi, there!");
});

const wss = new WebSocketServer({server});
wss.on('connection', (socket) => {
  socket.on('error', console.error);

  socket.on('message', (data, isBinary) => {
    wss.clients.forEach((client) => {
      // socket.
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, {binary: isBinary});
      }
    });
  });

  socket.send("Hello, message from the server!");
});

server.listen(8080, () => {
  console.log(new Date() + " Server is listening on port 8080");
});
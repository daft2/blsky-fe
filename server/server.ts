// eslint-disable-next-line @typescript-eslint/no-require-imports
const { WebSocketServer } = require("ws");

const PORT = 4000;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);

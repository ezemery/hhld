import { createServer } from "./server";
import { Server } from "socket.io";
import dotenv from "dotenv";
import http from "http";
import connectToMongoDB from "./db/connectToMongoDB";
import { addMsgToConversation } from "./controllers/msgs.controllers";
import { subscribe, publish } from "./redis/msgPubSub";

dotenv.config();
const port = process.env.PORT || 3001;
const app = createServer();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
    origin: "*",
  },
});
// io is an instance of the Socket.IO server class that is associated with and attached to the HTTP server

// Allow WebSocket connections from different origins to the Socket.IO server by relaxing the browser's same-origin policy
const userSocketMap = {};
io.on("connection", (socket) => {
  const username = socket.handshake.query.username || "";

  const channelName = `chat_${username}`;
  subscribe(channelName, (msg) => {
    socket.emit("chat msg", JSON.parse(msg));
  });

  userSocketMap[username] = socket;

  socket.on("chat msg", (msg) => {
    addMsgToConversation([msg.senderId, msg.receiverId], msg);
    const receiverSocket = userSocketMap[msg.receiverId];
    if (receiverSocket) {
      receiverSocket.emit("chat msg", msg);
    } else {
      const channelName = `chat_${msg.receiverId}`;
      publish(channelName, JSON.stringify(msg));
    }
  });
});

// When a client connects to the Socket.IO server, a unique socket object is created to represent that client's connection. This socket object allows bidirectional communication between the server and the specific client that it represents.

server.listen(port, () => {
  connectToMongoDB();
  console.log(`api running on ${port}`);
});

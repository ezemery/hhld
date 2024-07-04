import { createServer } from "./server";
import dotenv from "dotenv";
import http from "http";
import connectToMongoDB from "./db/connectToMongoDB";
dotenv.config();
const port = process.env.PORT || 3002;
const app = createServer();
const server = http.createServer(app);

// When a client connects to the Socket.IO server, a unique socket object is created to represent that client's connection. This socket object allows bidirectional communication between the server and the specific client that it represents.

server.listen(port, () => {
  connectToMongoDB();
  console.log(`api running on ${port}`);
});

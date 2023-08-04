import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(socket.id);
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

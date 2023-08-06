import express from "express";
import http from "http";
import config from "config";
import logger from "./utils/logger";
import { Server } from "socket.io";
import setupSocket from "./sockets/socket.manager";

const port = config.get<number>("port");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
  },
});

setupSocket(io);

server.listen(port, () => {
  logger.info(`Server listening on port ${port}.`);
});

import { Server, Socket } from "socket.io";
import logger from "../utils/logger";

const EVENTS = {
  connection: "connection",
};

const setupSocket = (io: Server) => {
  logger.info("Socket enabled...");

  io.on(EVENTS.connection, (socket: Socket) => {});
};

export default setupSocket;

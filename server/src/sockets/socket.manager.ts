import { Server, Socket } from "socket.io";
import logger from "../utils/logger";
import { User, addUser, getUsers, userExists } from "../data/users";
import EVENTS from "./events";

const setupSocket = (io: Server) => {
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`New socket connection : ${socket.id}`);

    socket.on(
      EVENTS.CLIENT.JOIN_CHAT_ROOMS,
      ({ username }: { username: string }) => {
        if (userExists(username)) {
          return socket.emit(EVENTS.SERVER.USERNAME_TAKEN, {
            message: `${username} is already taken.`,
          });
        }

        const user: User = {
          id: socket.id,
          username,
        };
        addUser(user);

        socket.emit(EVENTS.SERVER.JOINED_CHAT_ROOMS, {
          members: getUsers(),
          user,
        });
      }
    );
  });

  logger.info("Socket enabled...");
};

export default setupSocket;

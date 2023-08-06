import { Server, Socket } from "socket.io";
import logger from "../utils/logger";
import {
  User,
  addUser,
  getUser,
  getUsers,
  removeUser,
  userExists,
} from "../data/users";
import EVENTS from "./events";

const setupSocket = (io: Server) => {
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`New socket connection : ${socket.id}`);

    socket.on(
      EVENTS.CLIENT.JOIN_CHAT_ROOMS,
      ({ username }: { username: string }) => {
        if (getUser(socket.id)) return;

        if (userExists(username)) {
          return socket.emit(EVENTS.SERVER.USERNAME_TAKEN, {
            message: `Username '${username}' is already taken.`,
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

    socket.on(EVENTS.DISCONNECT, () => {
      const user = getUser(socket.id);
      if (!user) return;

      removeUser(socket.id);
      socket.broadcast.emit(EVENTS.SERVER.USER_DISCONNECTED, {
        members: getUsers(),
      });
    });
  });

  logger.info("Socket enabled...");
};

export default setupSocket;

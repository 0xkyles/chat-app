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
import { Room, addRoom, getRooms } from "../data/rooms";

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

        const members = getUsers();
        const rooms = getRooms();

        socket.emit(EVENTS.SERVER.JOINED_CHAT_ROOMS, {
          members,
          user,
          rooms,
        });
        socket.broadcast.emit(EVENTS.SERVER.UPDATE_MEMBERS, members);
        socket.broadcast.emit(EVENTS.SERVER.UPDATE_ROOMS, rooms);
        socket.broadcast.emit(EVENTS.SERVER.NOTIFICATION, {
          title: "New member arrived!",
          message: `${username} joined the party!`,
        });
      }
    );

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomId }) => {
      const users: User[] = [];
      users.push(getUser(socket.id)!);

      const room: Room = {
        roomId,
        users,
      };

      addRoom(room);

      socket.join(roomId);

      const rooms = getRooms();

      socket.emit(EVENTS.SERVER.JOINED_CHAT_ROOM, { room });
      socket.emit(EVENTS.SERVER.NOTIFICATION, {
        title: "Info",
        message: "You joined the chat room!",
      });
      io.emit(EVENTS.SERVER.UPDATE_ROOMS, rooms);
    });

    socket.on(EVENTS.DISCONNECT, () => {
      const user = getUser(socket.id);
      if (!user) return;

      removeUser(socket.id);

      const members = getUsers();
      socket.broadcast.emit(EVENTS.SERVER.UPDATE_MEMBERS, members);
      socket.broadcast.emit(EVENTS.SERVER.NOTIFICATION, {
        title: "Members departure!",
        message: `${user.username} left the party!`,
      });
    });
  });

  logger.info("Socket enabled...");
};

export default setupSocket;

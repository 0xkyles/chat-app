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
import {
  Room,
  addRoom,
  getRoom,
  getRooms,
  kickUser,
  removeRoom,
} from "../data/rooms";
import updateRooms from "./helpers/updateRooms";
import joinRoom from "./helpers/joinRoom";
import leaveRoom from "./helpers/leaveRoom";
import updateMembers from "./helpers/updateMembers";

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

        updateMembers(socket);
        updateRooms(io);

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
      joinRoom(socket, roomId, room);
      updateRooms(io);
    });

    socket.on(EVENTS.CLIENT.JOIN_ROOM, ({ roomId }) => {
      const room = getRoom(roomId);
      if (!room) return;

      joinRoom(socket, roomId, room);

      const user = getUser(socket.id);
      socket.to(roomId).emit(EVENTS.SERVER.NOTIFICATION, {
        title: "Chat member arrival!",
        message: `${user?.username} joined the chat room!`,
      });
    });

    socket.on(EVENTS.CLIENT.LEAVE_ROOM, ({ roomId }) => {
      const room = getRoom(roomId);
      if (!room) return;

      leaveRoom(socket, roomId);
      if (room.users.length == 1) {
        removeRoom(roomId);
        updateRooms(io);
      } else {
        kickUser(roomId, socket.id);

        const user = getUser(socket.id);

        socket.to(roomId).emit(EVENTS.SERVER.NOTIFICATION, {
          title: "Chat member departure!",
          message: `${user?.username} left the chat!`,
        });
      }
    });

    socket.on(EVENTS.DISCONNECT, () => {
      const user = getUser(socket.id);
      if (!user) return;

      removeUser(socket.id);
      updateMembers(socket);

      socket.broadcast.emit(EVENTS.SERVER.NOTIFICATION, {
        title: "Members departure!",
        message: `${user.username} left the party!`,
      });
    });
  });

  logger.info("Socket enabled...");
};

export default setupSocket;

import { io } from "socket.io-client";

export const EVENTS = {
  CLIENT: {
    JOIN_CHAT_ROOMS: "join_chat_rooms",
  },
  SERVER: {
    USERNAME_TAKEN: "username_taken",
    JOINED_CHAT_ROOMS: "joined_chat_rooms",
  },
};

const SERVER = "http://localhost:3001";

const socket = io(SERVER);

export default socket;

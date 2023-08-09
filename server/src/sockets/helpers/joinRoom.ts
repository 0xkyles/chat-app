import { Socket } from "socket.io";
import { Room } from "../../data/rooms";
import EVENTS from "../events";

const joinRoom = (socket: Socket, roomId: string, room: Room) => {
  socket.join(roomId);
  socket.emit(EVENTS.SERVER.JOINED_CHAT_ROOM, { room });
  socket.emit(EVENTS.SERVER.NOTIFICATION, {
    title: "Info",
    message: "You joined the chat room!",
  });
};

export default joinRoom;

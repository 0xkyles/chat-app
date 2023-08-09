import { Socket } from "socket.io";
import EVENTS from "../events";

const leaveRoom = (socket: Socket, roomId: string) => {
  socket.emit(EVENTS.SERVER.NOTIFICATION, {
    title: "Info!",
    message: `You left the room!`,
  });
  socket.emit(EVENTS.SERVER.ROOM_LEFT);
  socket.leave(roomId);
};

export default leaveRoom;

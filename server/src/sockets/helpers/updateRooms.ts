import { Server } from "socket.io";
import { getRooms } from "../../data/rooms";
import EVENTS from "../events";

const updateRooms = (io: Server) => {
  const rooms = getRooms();
  io.emit(EVENTS.SERVER.UPDATE_ROOMS, rooms);
};

export default updateRooms;

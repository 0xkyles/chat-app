import { Socket } from "socket.io";
import { getUsers } from "../../data/users";
import EVENTS from "../events";

const updateMembers = (socket: Socket) => {
  const members = getUsers();
  socket.broadcast.emit(EVENTS.SERVER.UPDATE_MEMBERS, members);
};

export default updateMembers;

import { User } from "./users";

type Room = {
  roomId: string;
  users: User[];
};

let rooms: Room[] = [];

const addRoom = (room: Room) => rooms.push(room);

const getRooms = () => rooms;

export { addRoom, getRooms, Room };

import { User } from "./users";

type Room = {
  roomId: string;
  users: User[];
};

let rooms: Room[] = [];

const addRoom = (room: Room) => rooms.push(room);

const getRooms = () => rooms;

const getRoom = (id: string) => rooms.find((room) => room.roomId == id);

const roomExists = (id: string) => rooms.some((room) => room.roomId === id);

const removeRoom = (id: string) =>
  (rooms = rooms.filter((room) => room.roomId != id));

const kickUser = (roomId: string, userId: string) => {
  const idx = rooms.findIndex((room) => room.roomId === roomId);

  const updatedUsers = rooms[idx].users.filter((user) => user.id !== userId);
  rooms[idx] = { ...rooms[idx], users: updatedUsers };
};

export { addRoom, getRooms, Room, removeRoom, roomExists, getRoom, kickUser };

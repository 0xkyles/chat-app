import { create } from "zustand";
import { User } from "./userStore";

export interface Room {
  roomId: string;
  users: User[];
}

interface roomState {
  room: Room | null;
  rooms: Room[];
  setRoom: (room: Room) => void;
  setRooms: (rooms: Room[]) => void;
}

const useRoomsStore = create<roomState>((set) => ({
  room: null,
  rooms: [],
  setRoom: (room) => set({ room }),
  setRooms: (rooms) => set({ rooms }),
}));

export default useRoomsStore;

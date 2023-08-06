import { create } from "zustand";

export interface User {
  id: string;
  username: string;
}

interface userState {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<userState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;

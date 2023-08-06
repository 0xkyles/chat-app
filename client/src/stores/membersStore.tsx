import { create } from "zustand";
import { User } from "./userStore";

interface MembersState {
  members: User[];
  setMembers: (members: User[]) => void;
}

const useMembersStore = create<MembersState>((set) => ({
  members: [],
  setMembers: (members: User[]) => set({ members }),
}));

export default useMembersStore;

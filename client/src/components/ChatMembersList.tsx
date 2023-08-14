import { useEffect } from "react";
import socket from "@/sockets";
import { EVENTS } from "@/sockets";
import useUserStore, { User } from "@/stores/userStore";
import useRoomsStore from "@/stores/roomsStore";

const ChatMembersList = () => {
  const currentUser = useUserStore((state) => state.user);
  const room = useRoomsStore((state) => state.room);

  useEffect(() => {
    socket.on(EVENTS.SERVER.UPDATE_MEMBERS, (members: User[]) => {
      setMembers(members);
    });

    return () => {
      socket.off(EVENTS.SERVER.UPDATE_MEMBERS);
    };
  }, []);

  return (
    <>
      <p className="font-semibold mb-2">Members</p>

      <ul className="space-y-1 pl-3">
        {room?.users.map((user) => (
          <li key={user.id} className="text-sm">
            {user.username}
            {user.username == currentUser?.username ? " (You)" : ""}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatMembersList;

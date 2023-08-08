import { useEffect } from "react";
import socket from "@/sockets";
import { EVENTS } from "@/sockets";
import useUserStore, { User } from "@/stores/userStore";
import useMembersStore from "@/stores/membersStore";

const MembersList = () => {
  const user = useUserStore((state) => state.user);
  const { members, setMembers } = useMembersStore();

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
        {members.map((member) => (
          <li key={member.id} className="text-sm">
            {member.username}
            {member.username == user?.username ? " (You)" : ""}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MembersList;

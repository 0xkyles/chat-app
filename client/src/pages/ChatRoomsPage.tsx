import useUserStore, { User } from "@/stores/userStore";
import useMembersStore from "@/stores/membersStore";
import MembersList from "@/components/MembersList";
import { useEffect } from "react";
import socket from "@/sockets";
import { EVENTS } from "@/sockets";
import { useToast } from "@/components/ui/use-toast";
import { Notification } from "@/types";

const ChatRoomsPage = () => {
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();
  const { members, setMembers } = useMembersStore();

  useEffect(() => {
    socket.on(EVENTS.SERVER.UPDATE_MEMBERS, (members: User[]) => {
      setMembers(members);
    });

    socket.on(
      EVENTS.SERVER.NOTIFICATION,
      ({ message, title }: Notification) => {
        toast({
          title,
          description: message,
        });
      }
    );

    return () => {
      socket.off(EVENTS.SERVER.NOTIFICATION);
      socket.off(EVENTS.SERVER.UPDATE_MEMBERS);
    };
  }, []);

  return (
    <div className="h-screen flex">
      <div className="w-[200px] bg-red-500 p-4">
        <h2 className="text-lg uppercase font-semibold mb-4">Chat rooms</h2>
        <MembersList members={members} user={user} />
      </div>
      <div className="bg-blue-500 w-full p-4">
        <h2 className="text-lg uppercase font-semibold">Messages</h2>
      </div>
    </div>
  );
};

export default ChatRoomsPage;

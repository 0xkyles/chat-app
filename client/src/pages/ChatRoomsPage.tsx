import useUserStore, { User } from "@/stores/userStore";
import useMembersStore from "@/stores/membersStore";
import MembersList from "@/components/MembersList";
import { useEffect } from "react";
import socket from "@/sockets";
import { EVENTS } from "@/sockets";
import { useToast } from "@/components/ui/use-toast";
import { Notification } from "@/types";
import { Button } from "@/components/ui/button";

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
    <div className="h-screen flex flex-col gap-4">
      <div className="px-8 h-[60px] flex justify-between items-center border-b border-slate-300">
        <h1 className="text-2xl font-semibold uppercase">Chatrooms</h1>
        <Button>Create a room</Button>
      </div>
      <div className="flex gap-4 h-full px-8 pb-2">
        <div className="w-full border-2 rounded-md border-slate-200"></div>
        <div className="w-[20vw]">
          <MembersList members={members} user={user} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoomsPage;

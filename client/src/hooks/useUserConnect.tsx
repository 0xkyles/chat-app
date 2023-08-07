import { useToast } from "@/components/ui/use-toast";
import useUserStore from "@/stores/userStore";
import useMembersStore from "@/stores/membersStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { EVENTS } from "@/sockets/events";

interface Props {
  socket: Socket;
  setIsLoading: (val: boolean) => void;
}

const useUserConnect = ({ socket, setIsLoading }: Props) => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembersStore((state) => state.setMembers);

  useEffect(() => {
    socket.on(EVENTS.SERVER.JOINED_CHAT_ROOMS, ({ members, user }) => {
      setIsLoading(false);

      setMembers(members);
      setUser(user);

      navigate("/chat-rooms", { replace: true });
    });

    socket.on(
      EVENTS.SERVER.USERNAME_TAKEN,
      ({ message }: { message: string }) => {
        toast({
          variant: "destructive",
          description: message,
        });
        setIsLoading(false);
      }
    );

    return () => {
      socket.off(EVENTS.SERVER.USERNAME_TAKEN);
      socket.off(EVENTS.SERVER.JOINED_CHAT_ROOMS);
    };
  }, []);
};

export default useUserConnect;

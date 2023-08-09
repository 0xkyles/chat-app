import socket, { EVENTS } from "@/sockets";
import useRoomsStore, { Room } from "@/stores/roomsStore";
import { useEffect } from "react";

type Props = () => void;

const useJoinChatRoom = (callback?: Props) => {
  const setRoom = useRoomsStore((state) => state.setRoom);

  useEffect(() => {
    socket.on(EVENTS.SERVER.JOINED_CHAT_ROOM, ({ room }: { room: Room }) => {
      setRoom(room);
      if (callback) callback();
    });

    return () => {
      socket.off(EVENTS.SERVER.JOINED_CHAT_ROOM);
    };
  }, []);
};

export default useJoinChatRoom;

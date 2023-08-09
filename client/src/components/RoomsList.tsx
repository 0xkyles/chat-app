import { Button } from "@/components/ui/button";
import useJoinChatRoom from "@/hooks/useJoinChatRoom";
import socket, { EVENTS } from "@/sockets";
import useRoomsStore, { Room } from "@/stores/roomsStore";
import { useEffect } from "react";

const RoomsList = () => {
  const rooms = useRoomsStore((state) => state.rooms);
  const setRooms = useRoomsStore((state) => state.setRooms);

  const joinRoomHandler = (roomId: string) => {
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, { roomId });
  };

  useEffect(() => {
    socket.on(EVENTS.SERVER.UPDATE_ROOMS, (rooms: Room[]) => {
      setRooms(rooms);
    });

    return () => {
      socket.off(EVENTS.SERVER.UPDATE_ROOMS);
    };
  }, []);

  useJoinChatRoom();

  return (
    <>
      <p className="font-semibold mb-2">Rooms</p>

      <ul className="space-y-1 pl-3">
        {rooms.map((room) => (
          <Button
            onClick={() => joinRoomHandler(room.roomId)}
            variant="link"
            key={room.roomId}
            className="text-sm text-left whitespace-nowrap"
          >
            {room.roomId}
          </Button>
        ))}
      </ul>
    </>
  );
};

export default RoomsList;

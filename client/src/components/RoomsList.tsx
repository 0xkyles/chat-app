import useRoomsStore, { Room } from "@/stores/roomsStore";
import { useEffect } from "react";
import socket from "@/sockets";
import { EVENTS } from "@/sockets";

const RoomsList = () => {
  const rooms = useRoomsStore((state) => state.rooms);
  const setRooms = useRoomsStore((state) => state.setRooms);

  useEffect(() => {
    socket.on(EVENTS.SERVER.UPDATE_ROOMS, (rooms: Room[]) => {
      setRooms(rooms);
    });

    // socket.on(
    //   EVENTS.SERVER.NOTIFICATION,
    //   ({ message, title }: Notification) => {
    //     toast({
    //       title,
    //       description: message,
    //     });
    //   }
    // );

    return () => {
      socket.off(EVENTS.SERVER.UPDATE_ROOMS);
    };
  }, []);

  return (
    <>
      <p className="font-semibold mb-2">Rooms</p>

      <ul className="space-y-1 pl-3">
        {rooms.map((room) => (
          <li key={room.roomId} className="text-sm">
            {room.roomId}
          </li>
        ))}
      </ul>
    </>
  );
};

export default RoomsList;

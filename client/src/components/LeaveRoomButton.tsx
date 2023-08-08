import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import socket, { EVENTS } from "@/sockets";
import useRoomsStore from "@/stores/roomsStore";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface Props {
  roomId: string;
}

const LeaveRoomButton = ({ roomId }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setRoom = useRoomsStore((state) => state.setRoom);

  const leaveRoomHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      socket.emit(EVENTS.CLIENT.LEAVE_ROOM, { roomId });
    }, 500);
  };

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_LEFT, () => {
      setIsLoading(false);
      setOpen(false);
      setRoom(null);
    });

    return () => {
      socket.off(EVENTS.SERVER.ROOM_LEFT);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Leave room</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you sure you want to quit this room?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="mr-2"
            onClick={leaveRoomHandler}
          >
            {isLoading ? <Loader className="animate-spin" /> : "leave room"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveRoomButton;

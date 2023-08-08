import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import socket, { EVENTS } from "@/sockets";
import { Loader } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useRoomsStore, { Room } from "@/stores/roomsStore";

const CreateRoomButton = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const roomId = nanoid();

  const createRoomHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomId });
    }, 500);
  };

  const setRoom = useRoomsStore((state) => state.setRoom);

  useEffect(() => {
    socket.on(EVENTS.SERVER.JOINED_CHAT_ROOM, ({ room }: { room: Room }) => {
      setIsLoading(false);
      setRoom(room);
      setOpen(false);
    });

    return () => {
      socket.off(EVENTS.SERVER.JOINED_CHAT_ROOM);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create a room</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Create a room</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col py-4 gap-3">
          <Label htmlFor="roomId" className="font-semibold">
            Room ID
          </Label>
          <Input
            id="roomId"
            value={roomId}
            disabled
            className="border-slate-300"
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            type="submit"
            disabled={isLoading}
            onClick={createRoomHandler}
          >
            {isLoading ? <Loader className="animate-spin" /> : "create room"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomButton;

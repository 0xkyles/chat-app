import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRoomsStore from "@/stores/roomsStore";
import { BsFillSendFill } from "react-icons/bs";
import img from "@/assets/images/room.png";

const ChatZone = () => {
  const room = useRoomsStore((state) => state.room);

  return (
    <div className="w-full flex flex-col border-2 rounded-md p-2 border-slate-300">
      {room && (
        <>
          <div className="w-full flex-1">chat</div>
          <form className="flex w-full items-center gap-1">
            <Input
              type="text"
              className="border-slate-300"
              placeholder="Message..."
            />
            <Button type="submit">
              <BsFillSendFill />
            </Button>
          </form>
        </>
      )}

      {!room && (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={img} className="object-fit w-[35%]" alt="create-room" />

          <p className="text-lg font-semibold text-card-foreground">
            Create a room or join one to chat!
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatZone;

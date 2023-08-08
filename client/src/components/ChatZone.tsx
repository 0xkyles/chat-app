import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRoomsStore from "@/stores/roomsStore";
import { BsFillSendFill } from "react-icons/bs";

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
        <div className="">
          <img src="/assets/images/room.png" alt="" />
        </div>
      )}
    </div>
  );
};

export default ChatZone;

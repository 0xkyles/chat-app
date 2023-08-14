import MembersList from "@/components/MembersList";
import ChatZone from "@/components/ChatZone";
import CreateRoomButton from "@/components/CreateRoomButton";
import RoomsList from "@/components/RoomsList";
import useRoomsStore from "@/stores/roomsStore";
import LeaveRoomButton from "@/components/LeaveRoomButton";
import ChatMembersList from "@/components/ChatMembersList";

const ChatRoomsPage = () => {
  const room = useRoomsStore((state) => state.room);

  return (
    <div className="h-screen flex flex-col gap-4">
      <header className="px-8 h-[60px] flex justify-between items-center border-b border-slate-300">
        <h1 className="text-2xl font-semibold uppercase">Chatrooms</h1>

        {room && <LeaveRoomButton roomId={room.roomId} />}
        {!room && <CreateRoomButton />}
      </header>

      <main className="flex gap-4 h-full px-8 pb-2">
        <ChatZone />

        <div className="w-[20vw]">
          {room && (
            <div>
              <ChatMembersList />
            </div>
          )}
          {!room && (
            <>
              <div className="h-1/2">
                <MembersList />
              </div>
              <div className="h-1/2">
                <RoomsList />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatRoomsPage;

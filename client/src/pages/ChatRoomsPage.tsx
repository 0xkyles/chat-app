import MembersList from "@/components/MembersList";
import ChatZone from "@/components/ChatZone";
import CreateRoomButton from "@/components/CreateRoomButton";
import RoomsList from "@/components/RoomsList";

const ChatRoomsPage = () => {
  return (
    <div className="h-screen flex flex-col gap-4">
      <header className="px-8 h-[60px] flex justify-between items-center border-b border-slate-300">
        <h1 className="text-2xl font-semibold uppercase">Chatrooms</h1>
        <CreateRoomButton />
      </header>

      <main className="flex gap-4 h-full px-8 pb-2">
        <ChatZone />

        <div className="w-[20vw]">
          <div className="h-1/2">
            <MembersList />
          </div>
          <div className="h-1/2">
            <RoomsList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatRoomsPage;

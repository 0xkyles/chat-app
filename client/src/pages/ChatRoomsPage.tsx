import useUserStore from "@/stores/userStore";
import useMembersStore from "@/stores/membersStore";

const ChatRoomsPage = () => {
  const user = useUserStore((state) => state.user);
  const members = useMembersStore((state) => state.members);

  return (
    <div className="h-screen flex">
      <div className="w-[200px] bg-red-500 p-4">
        <h2 className="text-lg uppercase font-semibold mb-4">Chat rooms</h2>
        <div>
          <p className="mb-4">Members</p>
          <ul className="space-y-1">
            {members.map((member) => (
              <li key={member.id} className="text-sm">
                {member.username}
                {member.username == user?.username ? " (You)" : ""}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-blue-500 w-full p-4">
        <h2 className="text-lg uppercase font-semibold">Messages</h2>
      </div>
    </div>
  );
};

export default ChatRoomsPage;

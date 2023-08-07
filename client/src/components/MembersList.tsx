import { User } from "@/stores/userStore";

interface Props {
  members: User[];
  user: User | null;
}

const MembersList = ({ members, user }: Props) => {
  return (
    <div>
      <p className="font-semibold mb-2">Members</p>
      <ul className="space-y-1 pl-3">
        {members.map((member) => (
          <li key={member.id} className="text-sm">
            {member.username}
            {member.username == user?.username ? " (You)" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersList;

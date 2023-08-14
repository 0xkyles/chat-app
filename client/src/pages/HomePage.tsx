import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JoinChatRoomsForm from "@/components/JoinChatRoomsForm";

function HomePage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="max-w-[400px]">
        <CardHeader>
          <CardTitle className="mb-1">Chat rooms</CardTitle>
          <CardDescription>
            Access real-time messaging app & start chatting with your friends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JoinChatRoomsForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage;

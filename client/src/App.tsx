import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JoinChatForm from "./components/JoinRoomForm";

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="max-w-[400px]">
        <CardHeader>
          <CardTitle className="mb-1">Enter your username</CardTitle>
          <CardDescription>
            Access real-time messaging app & start chatting with your friend
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JoinChatForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

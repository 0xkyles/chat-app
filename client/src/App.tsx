import { Button } from "@/components/ui/button";
import socket from "./lib/sockets";

function App() {
  console.log(socket.id);

  return (
    <div>
      <Button variant="default" size="sm">
        delte
      </Button>
    </div>
  );
}

export default App;

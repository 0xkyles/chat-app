import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { nanoid } from "nanoid";
import { Button } from "./ui/button";

const CreateRoomButton = () => {
  const roomId = nanoid();

  return (
    <Dialog>
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
          <Button className="w-full" type="submit">
            Create room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomButton;

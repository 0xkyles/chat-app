import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader } from "lucide-react";
import socket from "@/sockets";
import { EVENTS } from "@/sockets/events";
import useUserConnect from "@/hooks/useUserConnect";

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(10, { message: "Username must not exceed 10 characters." }),
});

type FormData = z.infer<typeof schema>;

const JoinChatRoomsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  useUserConnect({ socket, setIsLoading });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    socket.emit(EVENTS.CLIENT.JOIN_CHAT_ROOMS, data);
  };

  return (
    <form
      className="flex flex-col justify-center w-full gap-3"
      onSubmit={handleSubmit((data) => {
        reset();
        onSubmit(data);
      })}
    >
      <div>
        <Label htmlFor="username" className="font-semibold">
          Username
        </Label>
        <Input
          {...register("username")}
          className="mt-1"
          type="username"
          id="username"
          placeholder="Username..."
        />
        {errors.username && (
          <p className="text-red-500 text-xs font-semibold mt-2">
            {errors.username.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isLoading}>
        {isLoading ? <Loader className="animate-spin" /> : "Join chat rooms"}
      </Button>
    </form>
  );
};

export default JoinChatRoomsForm;

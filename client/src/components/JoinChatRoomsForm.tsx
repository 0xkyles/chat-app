import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import socket from "@/lib/sockets";
import EVENTS from "@/lib/events";

const schema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(10, { message: "Username must not exceed 10 characters." }),
});

type FormData = z.infer<typeof schema>;

const JoinChatRoomsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    socket.on(EVENTS.SERVER.JOINED_CHAT_ROOMS, ({ members, user }) => {
      console.log(members);
      setIsLoading(false);
    });

    socket.on(
      EVENTS.SERVER.USERNAME_TAKEN,
      ({ message }: { message: string }) => {
        console.log(`Error ${message}`);
        setIsLoading(false);
      }
    );

    return () => {
      socket.off(EVENTS.SERVER.USERNAME_TAKEN);
      socket.off(EVENTS.SERVER.JOINED_CHAT_ROOMS);
    };
  }, []);

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
        {isLoading ? <Loader className="animate-spin" /> : "Join"}
      </Button>
    </form>
  );
};

export default JoinChatRoomsForm;

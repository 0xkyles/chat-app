import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import socket from "@/sockets";
import { EVENTS } from "@/sockets";
import { useToast } from "@/components/ui/use-toast";
import { Notification } from "@/types";

const Layout = () => {
  const { toast } = useToast();

  useEffect(() => {
    socket.on(
      EVENTS.SERVER.NOTIFICATION,
      ({ message, title }: Notification) => {
        toast({
          title,
          description: message,
        });
      }
    );
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;

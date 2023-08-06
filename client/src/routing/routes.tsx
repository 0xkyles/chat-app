import ErrorPage from "@/pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ChatRoomsPage from "@/pages/ChatRoomsPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "chat-rooms",
        element: <ChatRoomsPage />,
      },
    ],
  },
]);

export default router;

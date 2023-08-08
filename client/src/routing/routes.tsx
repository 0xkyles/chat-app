import ErrorPage from "@/pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ChatRoomsPage from "@/pages/ChatRoomsPage";
import Layout from "@/pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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

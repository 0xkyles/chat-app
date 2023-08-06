import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "@/components/ui/toaster.tsx";
import router from "@/routing/routes";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);

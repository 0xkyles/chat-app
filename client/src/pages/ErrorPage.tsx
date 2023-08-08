import { Button } from "@/components/ui/button";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-5xl mb-1">Uh-oh!</h1>
      <p className="text-sm mb-4">
        {isRouteErrorResponse(error)
          ? "We can't find that page."
          : "An unexpected error has occured."}
      </p>
      <Button onClick={() => navigate("/", { replace: true })}>Go Back</Button>
    </div>
  );
};

export default ErrorPage;

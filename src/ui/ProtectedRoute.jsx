import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  //load the auth user
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  // while loading show a spinner
  //if there is no authenticated user, redirect to /login
  return children;
}

export default ProtectedRoute;

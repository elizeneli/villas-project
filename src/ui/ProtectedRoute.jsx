import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //load the auth user
  const { isAuthenticated, isLoading } = useUser();
  // while loading show a spinner
  useEffect(function () {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, []);
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //if there is no authenticated user, redirect to /login

  return children;
}

export default ProtectedRoute;

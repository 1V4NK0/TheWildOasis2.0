/* eslint-disable react/prop-types */

import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

//ensures no access without authorization
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load data
  const { isAuthenticated, isLoading } = useUser();

  // 2. if no logged in user redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. while loading return spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if logged in user, render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;

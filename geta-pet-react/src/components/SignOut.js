import React from "react";
import { useAuthentication } from "../firebase/AuthContext";
import { Navigate } from "react-router-dom";

import { Button } from "react-bootstrap";

const SignOutButton = () => {
  const { currentUser, doSignOut } = useAuthentication();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <Button type="button" onClick={doSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;

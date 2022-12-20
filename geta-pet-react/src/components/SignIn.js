import React, { useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthentication } from "../firebase/AuthContext";
import SocialSignIn from "./SocialSignIn";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Button, Card, Alert } from "react-bootstrap";

const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, doSignInWithEmailAndPassword } = useAuthentication();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await doSignInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch {
      setError("Failed to Sign In");
    }

    setLoading(false);
  };

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-100" style={{ maxWidth: "450px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mb-2 mt-2" type="submit">
              Sign In
            </Button>
          </Form>
          <SocialSignIn />
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;

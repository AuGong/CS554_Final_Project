import React, { useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthentication } from "../firebase/AuthContext";

import { Form, Button, Card, Alert } from "react-bootstrap";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, doCreateUserWithEmailAndPassword } = useAuthentication();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await doCreateUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
    } catch {
      setError("Failed to Sign Up");
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
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignUp}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Repeat your password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mb-2 mt-2" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );

};

export default SignUp;
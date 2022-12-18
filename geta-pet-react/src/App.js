import React from "react";
import { AuthProvider } from "./firebase/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ChangePassword from "./components/ChangePassword";
import SignOut from "./components/SignOut";
import NavHeader from "./components/NavHeader";
import AllPets from "./components/AllPets";
import DogsPage from "./components/DogsPage";

import { Container } from "react-bootstrap";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div>
          <NavHeader />
        </div>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/allpets" element={<AllPets />} />
              <Route path="/pets/dog/:pagenum" element={<DogsPage />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/signout" element={<SignOut />} />
            </Routes>
          </Router>
        </Container>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

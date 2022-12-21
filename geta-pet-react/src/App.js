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
import CatsPage from "./components/CatsPage";
import RabbitsPage from "./components/RabbitsPage";
import BirdsPage from "./components/BirdsPage";
import HorsesPage from "./components/HorsesPage";
import Organizations from "./components/Organizations";
import Likes from "./components/Likes";
import PostPets from "./components/PostPets";
import Upload from "./components/Upload";
import ChangeSize from "./components/ChangeSize";
import To404Page from "./components/To404Page";

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
              <Route path="/pets/cat/:pagenum" element={<CatsPage />} />
              <Route path="/pets/rabbit/:pagenum" element={<RabbitsPage />} />
              <Route path="/pets/bird/:pagenum" element={<BirdsPage />} />
              <Route path="/pets/horse/:pagenum" element={<HorsesPage />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/mylikes" element={<Likes />} />
              <Route path="/myposts" element={<PostPets />} />
              <Route path="/newpost" element={<Upload />} />
              <Route path="/changesize" element={<ChangeSize />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="/to404" element={<To404Page />} />
              <Route path="*" element={<To404Page />} />
            </Routes>
          </Router>
        </Container>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

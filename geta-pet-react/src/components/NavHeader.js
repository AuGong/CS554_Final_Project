import React from "react";
import { useAuthentication } from "../firebase/AuthContext";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavHeader = () => {
  const { currentUser } = useAuthentication();

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">GetaPet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" >Home</Nav.Link>
            <NavDropdown title="Pets" id="pets-nav-dropdown">
              <NavDropdown.Item href="/allpets">All Pets</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pets/dog">Dogs</NavDropdown.Item>
              <NavDropdown.Item href="#action/1.3">Cats</NavDropdown.Item>
              <NavDropdown.Item href="#action/1.4">Rabbits</NavDropdown.Item>
              <NavDropdown.Item href="#action/1.5">Birds</NavDropdown.Item>
              <NavDropdown.Item href="#action/1.6">Horses</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/">Post Pets</Nav.Link>
            <Nav.Link href="/">My Likes</Nav.Link>
            <Nav.Link href="/">Organizations</Nav.Link>
            <NavDropdown title={!currentUser ? "Hello, guest" : `Hello, ${currentUser.displayName}`} id="user-nav-dropdown">
              <NavDropdown.Item href="/changepassword">Change Password</NavDropdown.Item>
              <NavDropdown.Item href="/signin">Sign In</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
              <NavDropdown.Item href="/signout">Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavHeader;

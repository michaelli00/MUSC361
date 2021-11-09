import React from 'react';
import Container from 'react-bootstrap/container';
import Navbar from 'react-bootstrap/navbar';
import Nav from 'react-bootstrap/nav';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#pm">Total Serialism</Nav.Link>
            <Nav.Link href="#pm">Pitch Multiplication</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  );
}

export default Header;

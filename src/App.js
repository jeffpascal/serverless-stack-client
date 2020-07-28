import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";

function App() {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand href="/">Scratch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem href="/signup">Signup</NavItem>
          <NavItem href="/login">Login</NavItem>
        </Nav>
      </Navbar.Collapse>
      <Routes />
    </div>
  );
}

export default App;

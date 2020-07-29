import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

import { AppContext } from "./libs/contextLib";
import "./App.css";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function handleLogout() {
    userHasAuthenticated(false);
  }

  return (
    <div className="App container">
      <Navbar fluid="true" collapseOnSelect bg="light" expand="lg">
        {/* <Navbar.Header> */}
        <Navbar.Brand>
          <Link to="/">Scratch</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* </Navbar.Header> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>
                <NavItem>Log out</NavItem>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                </Nav.Link>
                <Nav.Link>
                  <LinkContainer to="/login">
                    <NavItem>Signin</NavItem>
                  </LinkContainer>
                </Nav.Link>
              </>
            )}
          </Nav>
          {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";

import "./App.css";

function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  /*
The useEffect hook takes a function and an array of variables. The function will be called every time the component is rendered. And the array of variables tell React to only re-run our function if the passed in array of variables have changed. This allows us to control when our function gets run. This has some neat consequences: If we pass in an empty list of variables, then it’ll only run our function on the FIRST render.
  */
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    !isAuthenticating && (
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
    )
  );
}

export default App;

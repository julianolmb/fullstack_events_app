import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import './App.css';
import './index';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Navbar } from 'react-bootstrap';


function App() {
  const [token,changeToken] = useState(window.localStorage.getItem("token"));

  const client = new ApiClient(
    token,
    () => logout()
  );

  const login = (newToken) => {
    window.localStorage.setItem("token",newToken);
    changeToken(newToken);
  }
  
  const logout = () => {
    window.localStorage.removeItem("token");
    changeToken(undefined);
  }

  return (
    <>
      {token ? (
        <Container fluid={true} className="display">
          <Navbar className="navbar" fixed="top" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Personal Events App</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Juliano</a>
                </Navbar.Text>
              </Navbar.Collapse>
           </Container>
          </Navbar>
          <Dashboard client={client} />
        </Container>
      ) : (
        <Login loggedIn={(token) => login(token)} client={client} />
      )

      }
      
    </>
  );
}

export default App;

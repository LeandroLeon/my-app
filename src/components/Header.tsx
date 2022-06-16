import { Auth } from "aws-amplify";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./../logo.svg";

export const Header = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const signOut = () => {
    Auth.signOut()
      .then((data) => {
        setUser({ username: "", email: "" });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    try {
      setError(null);
      setLoading(true);

      Auth.currentAuthenticatedUser({
        bypassCache: false,
      })
        .then((user) => {
          setUser({
            username: user.attributes.name,
            email: user.attributes.email,
          });
        })
        .catch((err) => setError(err));
    } catch (error: SetStateAction<any>) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Navbar bg="dark" variant="dark" className="container-fluid">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          Portal del Empleado
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item className={"m-auto"}>
              <Link to="/home">Home</Link>
              <Link to="/users">Users</Link>
              <Link to="/about">About</Link>
            </Nav.Item>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/action/3.1">Action</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <Link to="/action/3.2">Another Action</Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="separated-link">Separated link</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className={"ms-auto"}>
            <Nav.Item>
              {user.username !== "" ? (
                <>
                  <Navbar.Text>Hola! {user.username} </Navbar.Text>
                  <Button onClick={signOut}>Cerrar Sesión</Button>
                </>
              ) : (
                <></>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

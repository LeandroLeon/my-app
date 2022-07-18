import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../logos/logoEscudoAgaete.png";
import style from "../../styles/Header.module.css";

export const Header = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    setUser(() => {
      return {
        username: window.sessionStorage.getItem("username") as string,
        email: window.sessionStorage.getItem("email") as string,
      };
    });
  }, []);

  const signOut = () => {
    Auth.signOut()
      .then((data) => {
        setUser({ username: "", email: "" });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Navbar bg="dark" variant="dark" className="container-fluid">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            style={{ paddingRight: "5px" }}
          />
          Portal del Empleado
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item className={"m-auto"}>
              <NavLink
                className={(navData: any) =>
                  navData.isActive ? `${style.ActiveLink}` : `${style.Link}`
                }
                to="/home"
              >
                Home
              </NavLink>
              <NavLink
                className={(navData: any) =>
                  navData.isActive ? `${style.ActiveLink}` : `${style.Link}`
                }
                to="/reservas"
              >
                Reservas
              </NavLink>
            </Nav.Item>
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

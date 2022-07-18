import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Circulares } from "../components/organism/Circulares";
import { LinksOfInterest } from "../components/atoms/LinksOfInterest";

export const Home = () => {
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

  return (
    <Container>
      <h1 style={{ textAlign: "center", paddingTop: "2rem" }}>
        Bienvenido a tu portal {user.username} !
      </h1>
      <LinksOfInterest />
      <Circulares />
    </Container>
  );
};

export default Home;

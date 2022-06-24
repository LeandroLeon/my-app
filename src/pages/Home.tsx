import { useEffect, useState } from "react";
import { LinksOfInterest } from "../components/LinksOfInterest";

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
    <>
      <h1 style={{ textAlign: "center", paddingTop: "2rem" }}>
        Bienvenido a tu portal {user.username} !
      </h1>
      <LinksOfInterest />
    </>
  );
};

export default Home;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Home } from "./pages/Home";
import { Reservas } from "./pages/Reservas";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

const App = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    try {
      Auth.currentAuthenticatedUser({
        bypassCache: false,
      })
        .then((user) => {
          setUser({
            username: user.attributes.name,
            email: user.attributes.email,
          });
          return user;
        })
        .then((user) => {
          window.sessionStorage.setItem("username", user.attributes.name);
          window.sessionStorage.setItem("email", user.attributes.email);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
    </Router>
  );
};

export default withAuthenticator(App);

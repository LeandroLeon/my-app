import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/organism/Header";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Home } from "./pages/Home";
import { Reservas } from "./pages/Reservas";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { Empleados } from "./pages/Empleados";

const App = () => {
  useEffect(() => {
    try {
      Auth.currentAuthenticatedUser({
        bypassCache: false,
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
        <Route path="/empleados" element={<Empleados />} />
      </Routes>
    </Router>
  );
};

export default withAuthenticator(App);

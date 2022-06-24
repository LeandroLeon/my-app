import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Home } from "./pages/Home";
import { LinksOfInterest } from "./pages/LinksOfInterest";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/enlaces" element={<LinksOfInterest />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

function About() {
  return <h2>About</h2>;
}

export default withAuthenticator(App);

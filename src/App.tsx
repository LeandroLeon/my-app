import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { MyCalendar } from "./components/Calendar";
import { Header } from "./components/Header";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Todo from "./components/Todo";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
};

function Home() {
  return <MyCalendar />;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default withAuthenticator(App);

import { Container } from "react-bootstrap";
import { MyCalendar } from "./components/Calendar";
import { Header } from "./components/Header";

const App = () => {
  return (
    <Container>
      <Header />
      <MyCalendar />
    </Container>
  );
};

export default App;

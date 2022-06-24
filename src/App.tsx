import { Routes, Route, Link } from "react-router-dom";
import EventList from "./components/EventList";
import EventPage from "./pages/EventPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/:id" element={<EventPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

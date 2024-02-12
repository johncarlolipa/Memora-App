import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddNote from "./routes/add-note";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-note" element={<AddNote />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

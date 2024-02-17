import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddNote from "./routes/add-note";
import UpdateNote from "./routes/update-note";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/notes/:id" element={<UpdateNote />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

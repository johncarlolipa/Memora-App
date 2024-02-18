import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./routes/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddNote from "./routes/add-note";
import UpdateNote from "./routes/update-note";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/notes/:id" element={<UpdateNote />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

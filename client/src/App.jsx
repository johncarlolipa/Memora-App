import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddNote from "./routes/add-note";
import UpdateNote from "./routes/update-note";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleNote from "./routes/single-note";
import { useEffect } from "react";

function App() {
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    dispatch({ type: "LOGIN", payload: JSON.parse(userData) });
  }, []);

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
          <Route path="/note/:id" element={<SingleNote />} />
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

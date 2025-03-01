import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Info from './Components/Info/Info';
import './App.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => { // needed for refreshing i think
    // Check if user is already signed in (e.g., from localStorage)
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);



  return (
    <Router>
      <Routes>
        <Route path="/" element={isSignedIn ? <Home setIsSignedIn={setIsSignedIn} /> : <Navigate to="/login" />} />

        <Route path="/login" element={isSignedIn ? <Navigate to="/" /> : <Login setIsSignedIn={setIsSignedIn} />} />


        <Route path="/info" element={isSignedIn ? <Info  setIsSignedIn={setIsSignedIn} /> : <Navigate to="/login" />} />
        <Route path="/about-us" element={isSignedIn ? <About setIsSignedIn={setIsSignedIn} /> : <Navigate to="/login" />} />


        <Route path="*" element={<Navigate to={isSignedIn ? "/" : "/login"} />} />

      </Routes>
    </Router>
  );
}

export default App;
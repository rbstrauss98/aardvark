
import React from 'react';
import NavbarComponent from './components/Navbar/NavbarComponent';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages';

function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;

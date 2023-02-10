
import React from 'react';
import NavbarComponent from './components/Navbar/NavbarComponent';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages';
import BugPage from './pages/bug';

function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/bug/:id" element={<BugPage/>}/>
        </Routes>
      </Router>
    </>

  );
}

export default App;

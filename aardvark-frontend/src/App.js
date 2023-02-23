
import {React, useState} from 'react';
import NavbarComponent from './components/Navbar/NavbarComponent';
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages';
import BugPage from './pages/bug';
import { useNavigate } from 'react-router-dom';


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  function handleSearch(event) {
    event.preventDefault();
    const searchInputValue = event.target.search.value;
    setSearchQuery(searchInputValue);
    navigate("/")
  }

  return (
    <>
      <NavbarComponent handleSearch={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route exact path="/" element={<Home searchQuery={searchQuery}/>} />
        <Route exact path="/bug/:id" element={<BugPage/>}/>
      </Routes>
    </>
  );
}

export default App;

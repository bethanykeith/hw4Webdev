import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Menu from "./Menu";


function App()
{ 
    return ( 
        <Router>
            <Routes>
              <Route path = "/" element={<Home />} />
              <Route path = "/Contact" element={<Contact />} />
              <Route path = "/About" element={<About />} />
              <Route path = "/Menu" element={<Menu />} />
            </Routes>
        </Router> 
    );
}

export default App;
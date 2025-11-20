import React from "react";
import { BrowswerRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import Menu from "./Menu";


function App()
{ 
    return ( 
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route path = "/" element={<Home />} />
              <Route path = "/Contact" element={<Contact />} />
              <Route path = "/About" element={<About />} />
              <Route path = "/Menu" element={<Menu />} />
            </Routes>
        </BrowserRouter> 
    );
}

export default App;

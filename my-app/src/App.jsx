import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import About from '../pages/about'
import Newabout from '../pages/newabout'
import './index.css'



function App() {
  return (
    <div>
      <Router>
        <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/newabout" element={<Newabout/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;

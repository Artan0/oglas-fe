import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Ads from './pages/Ads';
import Ad from './pages/Ad';
import Rent from './pages/Rent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/ads' element={<Ads />} />
        <Route path="/ad/:id" element={<Ad />} />
        <Route path="/rent" element={<Rent />} />

        {/*routes here*/}
      </Routes>
    </Router>
  );
}

export default App;

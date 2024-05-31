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
import { UserProvider } from './context/User-context';
import UserProfile from './pages/User-Profile';
import AddAd from './pages/Add-Ad';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/authentication' element={<Authentication />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/ads' element={<Ads />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/add-ad" element={<AddAd />} />

          {/*routes here*/}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

import React, { Fragment } from 'react';
import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Contact from './components/Contact.js';
import About from './components/About.js';
import Shows from './components/Shows.js';
import Main from './components/Main.js';
import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/*
    PROBLEMS: 
      - Horizontal scrolling shifts show template slightly to the left and right.
      - Upcoming shows window not yet responsive.
      - Nav Bar lays over "CONTACT/BOOKING" buttons on contact form. Need to adjust CSS.
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="/admin" element={<h1>ADMIN ELEMENT</h1>} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

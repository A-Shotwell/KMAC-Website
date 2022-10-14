import React, { Fragment } from 'react'
import Main from './components/Main.js'
import Admin from './components/Admin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
        <Route path="/admin" element={<Admin />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

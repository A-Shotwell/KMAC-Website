import React, { Fragment } from 'react'
import Main from './components/Main.js'
import Admin from './components/Admin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// ShowListing component test
import ShowListing from './components/ShowListing.js'

/*
    PROBLEMS: 
      - Horizontal scrolling shifts show template slightly to the left and right.
      - Upcoming shows window not yet responsive.
      - Nav Bar lays over "CONTACT/BOOKING" buttons on contact form. Need to adjust CSS.
*/

// ShowListing component test
const dummyValues = {
  eventTitle: "Test Show",
  location: "Anywhere, Testville, USA",
  date: "10-25-2022",
  time: "7:00 AM",
  ticket: "$10",
  desc: "Test description describing things testfully.",
  image: null
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/test" element={<ShowListing params={dummyValues} />} /> {/* USED TO TEST COMPONENTS. REMOVE THIS ROUTE AFTER DEVELOPMENT IS COMPLETE. */}
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

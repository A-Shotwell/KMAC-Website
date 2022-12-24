import React, { useState } from 'react'
import Main from './components/Main.js'
import Admin from './components/Admin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import styles from './components/Login.module.css'

// import Hero from './components/Hero'
// import NavBar from './components/NavBar.js'
// import About from './components/About'
// import Social from './components/Social'

/*
    PROBLEMS: 
      - Horizontal scrolling shifts show template slightly to the left and right.
*/

function App() {
  // ADMIN PASSWORD VERIFICATION
  const [ver, setVer] = useState(null)
  const [showErr, setShowErr] = useState(false)

  // ADMIN PASSWORD VERIFICATION
  const verPass = async (password) => {
    try {
      axios.post('http://localhost:4000/verify', { password: document.getElementById("pass").value })
      .then(response => {
        if (response.data === false){
          setShowErr(true)
        } else {
          setVer(true)
        }
      })        
    } catch (err) {
      console.log(err)
    }
  }

// Password window
  const pass = (
    <div className={styles.loginMain}>
      <div className={styles.loginWindow}>
        <div className={styles.labelContainer}><label className={styles.loginLabel} htmlFor="pass">Enter Password</label></div>
        <div className={styles.inputContainer}><input className={styles.loginInput} type="password" name="pass" id="pass"/></div>
        <div className={styles.submitContainer}><button className={styles.loginSubmitButton} type="button" onClick={verPass}>Submit</button></div>
        <div className={styles.errorContainer}>{!showErr ? null : <span className={styles.loginError}>Incorrect Password</span>}</div>
      </div>
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="/admin" element={ver ? <Admin /> : pass} />
        {/* <Route path="/test" element={ver ? <Admin /> : pass} /> */}
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

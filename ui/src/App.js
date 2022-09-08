import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Contact from './components/Contact.js';
import About from './components/About.js';
import Shows from './components/Shows.js';
import styles from './App.module.css';

/*
    PROBLEMS: 
      - Horizontal scrolling shifts show template slightly to the left and right.
      - Upcoming shows window not yet responsive.
      - Nav Bar lays over "CONTACT/BOOKING" buttons on contact form. Need to adjust CSS.
*/

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Hero />
      <About />
      <Shows />
      <Contact />
    </div>    
  );
}

export default App;

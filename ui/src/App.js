import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Contact from './components/Contact.js';
import About from './components/About.js';
import Shows from './components/Shows.js';
import styles from './App.module.css';

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

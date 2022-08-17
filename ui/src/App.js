import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Contact from './components/Contact.js';
import About from './components/About.js';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Hero />
      <About />
      {/* <div style={{width: "100vw", height: "100vh", background: "blue"}} /> */}
      <Contact />
    </div>
    
  );
}

export default App;

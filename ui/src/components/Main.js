import NavBar from './NavBar.js';
import Hero from './Hero.js';
import Contact from './Contact.js';
import About from './About.js';
import Shows from './Shows.js';
import styles from '../App.module.css';

const Main = () => {
    return (
        <div className={styles.App}>
          <NavBar />
          <Hero />
          <About />
          <Shows />
          <Contact />
        </div> 
    )
}

export default Main
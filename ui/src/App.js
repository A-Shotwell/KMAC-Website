import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Contact from './components/Contact.js';
import About from './components/About.js';

function App() {
  return (
    <div className="App" style={{height: "auto", width: "100vw"}}>
      <NavBar />
      <Hero />
      <About />
      {/* <div style={{width: "100vw", height: "100vh", background: "blue"}} /> */}
      <Contact />
    </div>
    
  );
}

export default App;

import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Contact from './components/Contact.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <div style={{width: "100vw", height: "100vh", background: "blue"}} />
      <Contact />
    </div>
  );
}

export default App;

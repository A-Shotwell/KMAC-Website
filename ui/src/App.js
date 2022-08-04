import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import ContactAndBooking from './components/ContactAndBooking.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <div 
        style={{
          display: "block",
          margin: "0px",
          marginTop: "100vh",
          padding: "0px",
          height: "100vh", 
          width: "100vw", 
          backgroundImage: "linear-gradient(to bottom right, green, blue)",
          overflow: "hidden"
        }}>
        <ContactAndBooking />
      </div>
    </div>
  );
}

export default App;

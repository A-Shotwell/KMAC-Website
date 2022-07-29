import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import ContactAndBooking from './components/ContactAndBooking.js';

function App() {
  return (
    <div className="App">
      {/* <NavBar />
      <Hero />
      <div 
        style={{
          margin: "0px",
          padding: "0px",
          height: "400vh", 
          width: "100vw", 
          backgroundImage: "linear-gradient(to bottom right, green, blue)",
          overflow: "hidden"
        }} /> */}
        <ContactAndBooking />
    </div>
  );
}

export default App;

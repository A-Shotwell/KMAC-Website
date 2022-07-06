import NavBar from './components/NavBar.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div 
        style={{
          margin: "0px",
          padding: "0px",
          height: "400vh", 
          width: "100vw", 
          backgroundImage: "linear-gradient(to bottom right, green, blue)",
          overflow: "hidden"
        }} />
    </div>
  );
}

export default App;

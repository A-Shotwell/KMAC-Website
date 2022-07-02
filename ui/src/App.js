import NavBar from './components/NavBar.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div 
        style={{height: "400vh", 
        width: "100%", 
        backgroundImage: "linear-gradient(to bottom right, green, blue)",
        }} />
    </div>
  );
}

export default App;

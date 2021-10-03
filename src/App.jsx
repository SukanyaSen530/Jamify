import "./styles.css";
import Home from "./Home";
import musicData from "./musicApi";

export default function App() {
  return (
    <main className="App">
      <h1 className="Header">Music Recommendation App</h1>
      <Home musicData={musicData} />
    </main>
  );
}

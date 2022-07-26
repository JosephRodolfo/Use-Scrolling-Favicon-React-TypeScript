import "./App.css";
import { useScrollingFavicon } from "../src/hooks/useScrollingFavicon";
import { useState } from "react";
function App() {
  const [word, setText] = useState("Test Text");
  const [color, setColor] = useState("white");
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [fontFamily, setFont] = useState("arial");
  const [speed, setSpeed] = useState(50);

  useScrollingFavicon({word, speed, color, backgroundColor, fontFamily});
  return (
    <div className="App">
      <h1>useScrollingFavicon</h1>
      <form className="form">
        <label>Text to display: </label>
        <input value={word}
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
        ></input>
        <label>Text color: </label>
        <input value={color}
          
          onChange={(e) => {
            setColor(e.target.value);
          }}
          type="text"
        ></input>
        <label>Background color: </label>
        <input
          value={backgroundColor}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
          }}
          type="text"
        ></input>
        <label>Font family: </label>
        <input
          value={fontFamily}
          onChange={(e) => {
            setFont(e.target.value);
          }}
          type="text"
        ></input>
        <label>Text scroll speed: </label>
        <input
          value={speed}
          onChange={(e) => {
            setSpeed(parseInt(e.target.value));
          }}
          type="number"
        ></input>
      </form>
    </div>
  );
}

export default App;

import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState<Array<string> | []>([]);

  return (
    <ul className="list-container">
      {list.map((element, index) => (
        <li className="element" key={index}>
          {element}
        </li>
      ))}
    </ul>
  );
}

export default App;

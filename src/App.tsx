import { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";
import database from "./libs/db";

function App() {
  const targetRef = useRef<HTMLDivElement>(null);

  const [list, setList] = useState<Array<string> | []>([]);

  const onFetch = useCallback(() => {
    setList((prevList) => [...prevList, ...database]);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(onFetch, { threshold: 1 });

    if (!!targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer && observer.disconnect();
  }, [onFetch]);

  return (
    <ul className="list-container">
      {list.map((element, index) => (
        <li className="element" key={index}>
          {element}
        </li>
      ))}
      <div ref={targetRef} />
    </ul>
  );
}

export default App;

import { useState, useRef, useCallback } from "react";
import "./App.css";
import database from "./libs/db";
import { FadeLoader } from "react-spinners";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

function App() {
  const targetRef = useRef<HTMLDivElement>(null);

  const [list, setList] = useState<Array<string> | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // fetching
  const onFetch = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setList((prevList) => [...prevList, ...database]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (isLoading) {
        return;
      }

      if (entries[0].isIntersecting) {
        onFetch();
      }
    },
    [isLoading, onFetch]
  );

  useIntersectionObserver({ callback: handleObserver, ref: targetRef });

  return (
    <ul className="list-container">
      {list.map((element, index) => (
        <li className="element" key={index}>
          {element}
        </li>
      ))}
      {isLoading && <FadeLoader />}
      <div ref={targetRef} />
    </ul>
  );
}

export default App;

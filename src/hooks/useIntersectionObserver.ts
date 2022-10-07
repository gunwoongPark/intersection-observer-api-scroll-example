import { RefObject, useEffect } from "react";

const useIntersectionObserver = ({
  callback,
  ref,
}: {
  callback: (entries: IntersectionObserverEntry[]) => void;
  ref: RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 1 });
    if (!!ref.current) {
      observer.observe(ref.current);
    }
  }, [callback]);
};

export default useIntersectionObserver;

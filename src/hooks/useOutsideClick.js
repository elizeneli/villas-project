import { useRef, useEffect } from "react";

export function useOutsideClick(handler, listenCapturing = false) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        e.stopPropagation();
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("mousedown", handleClick);

      return () =>
        document.removeEventListener("mousedown", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}

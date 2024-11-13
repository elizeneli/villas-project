import { useRef, useEffect } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
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

import { useEffect } from "react";
import useCurrentRef from "@app/hooks/useCurrentRef";

export function useKeyPress(targetKey: string, callback: () => void) {
  const callbackRef = useCurrentRef(callback);

  useEffect(() => {
    function handler(e: KeyboardEvent): void {
      if (e.key === targetKey) {
        e.preventDefault();
        callbackRef?.current?.();
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [targetKey, callbackRef]);
}

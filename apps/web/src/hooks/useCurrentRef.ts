import { RefObject, useEffect, useRef } from "react";

export default function useCurrentRef<T>(value: T): RefObject<T> {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

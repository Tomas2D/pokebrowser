import { animated, useTransition } from "@react-spring/web";
import { ReactNode, useEffect, useState } from "react";
import { PickAnimated } from "@react-spring/core/dist/declarations/src/types/props";

interface AnimatedUnmountProps {
  children: ReactNode;
  isVisible: boolean;
}

export function AnimatedUnmount({
  children,
  isVisible: isVisibleDefault,
}: AnimatedUnmountProps) {
  const transitions = useTransition(isVisibleDefault, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1_000 },
  });

  return (
    <>
      {transitions((style, item) => (
        <animated.div
          style={{ ...style, visibility: item ? "visible" : "hidden" }}
        >
          {children}
        </animated.div>
      ))}
    </>
  );
}

import { useKeyPress } from "./useKeyPress";
import { renderHook } from "@testing-library/react-hooks";
import { vi } from "vitest";

describe("useKeyPress", () => {
  it("should call the callback function when the target key is pressed", () => {
    const callback = vi.fn();
    const targetKey = "Enter";
    renderHook(() => useKeyPress(targetKey, callback));

    const keydownEvent = new KeyboardEvent("keydown", { key: targetKey });
    window.dispatchEvent(keydownEvent);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback function when a different key is pressed", () => {
    const callback = vi.fn();
    const targetKey = "Enter";
    renderHook(() => useKeyPress(targetKey, callback));

    const keydownEvent = new KeyboardEvent("keydown", { key: "Escape" });
    window.dispatchEvent(keydownEvent);

    expect(callback).not.toHaveBeenCalled();
  });
});

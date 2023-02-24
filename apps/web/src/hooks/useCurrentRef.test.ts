import { renderHook } from "@testing-library/react-hooks";
import useCurrentRef from "./useCurrentRef";

describe("useCurrentRef", () => {
  it("should return a ref object that updates to the latest value", () => {
    const { result, rerender } = renderHook(useCurrentRef);

    // Initial value
    expect(result.current).toStrictEqual({
      current: undefined,
    });

    // Update value
    const newValue = "new value";
    rerender(newValue);
    expect(result.current.current).toBe(newValue);

    // Update value again
    const anotherValue = "another value";
    rerender(anotherValue);
    expect(result.current.current).toBe(anotherValue);
  });
});

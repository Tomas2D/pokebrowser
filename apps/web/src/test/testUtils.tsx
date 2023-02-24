import { cleanup, render } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import React, { ReactElement } from "react";
import { Core } from "@module/core/components/Core";

vi.mock("@module/user/hooks/useFetchCurrentUser", () => ({
  useFetchCurrentUser: vi.fn().mockImplementation(() => ({})),
}));

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <Core pageProps={{}}>
        <>{children}</>
      </Core>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };

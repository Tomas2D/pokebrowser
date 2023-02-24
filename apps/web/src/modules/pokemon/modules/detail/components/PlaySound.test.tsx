import { render, screen, fireEvent } from "@testing-library/react";
import { PlaySound } from "./PlaySound";
import { getPokemonAudioLink } from "@module/pokemon/utils";
import { MockedFunction, vi } from "vitest";
import { act } from "@testing-library/react-hooks";
import * as React from "react";

vi.mock("@module/pokemon/utils");

vi.mock("react", async () => {
  const original = (await vi.importActual("react")) as any;
  const originalFn = original.useState;

  return {
    default: {
      ...original,
      useState: vi.fn(originalFn),
    },
    ...original,
    useState: vi.fn(originalFn),
  };
});

const mockGetPokemonAudioLink = getPokemonAudioLink as MockedFunction<
  typeof getPokemonAudioLink
>;

const globalAudio = {
  load: vi.fn(() => Promise.resolve()),
  play: vi.fn(() => Promise.resolve()),
  pause: vi.fn(() => Promise.resolve()),
  addEventListener: vi.fn(() => {}),
  removeEventListener: vi.fn(() => {}),
  currentTime: 0,
};

describe("PlaySound", () => {
  const mockId = 1;
  const mockSrc = "mockSrc";

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetPokemonAudioLink.mockReturnValue(mockSrc);
    vi.spyOn(global, "Audio").mockImplementation(mockAudioElement as any);
  });

  const mockAudioElement = vi.fn(() => globalAudio);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders correctly", () => {
    render(<PlaySound id={mockId} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  test("clicking the button plays the sound if not already playing", async () => {
    render(<PlaySound id={mockId} />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockGetPokemonAudioLink).toHaveBeenCalledWith(mockId);
    expect(globalAudio.play).toHaveBeenCalledTimes(1);
  });

  test("clicking the button pauses the sound if already playing", async () => {
    render(<PlaySound id={mockId} />);

    fireEvent.click(screen.getByRole("button"));
    await new Promise((resolve) => setTimeout(resolve, 50));
    fireEvent.click(screen.getByRole("button"));

    expect(globalAudio.pause).toHaveBeenCalledTimes(1);
  });

  test("clicking the button does not do anything if audioRef is null or if processing is ongoing", () => {
    render(<PlaySound id={mockId} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));

    expect(mockGetPokemonAudioLink).toHaveBeenCalledTimes(1);
  });

  test("handles audio ended event correctly", async () => {
    const mockSetPlaying = vi.fn().mockImplementation(() => {});
    vi.spyOn(React, "useState").mockImplementationOnce(() => [
      true,
      mockSetPlaying,
    ]);

    const { unmount } = render(<PlaySound id={mockId} />);
    await new Promise((resolve) => setTimeout(resolve, 500));

    act(() => {
      expect(globalAudio.addEventListener).toBeCalledTimes(1);
      expect(globalAudio.addEventListener).toBeCalledWith(
        "ended",
        expect.any(Function)
      );
    });

    // @ts-expect-error
    globalAudio.addEventListener.mock.calls[0][1]();

    expect(mockSetPlaying).toHaveBeenCalledWith(false);
    await unmount();
    expect(globalAudio.removeEventListener).toHaveBeenCalledWith(
      "ended",
      expect.any(Function)
    );
  });
});

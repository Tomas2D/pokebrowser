import { act, render } from "@testing-library/react";
import { ResponsiveImage } from "./ResponsiveImage";

describe("ResponsiveImage", () => {
  it("should render an image with the given src", () => {
    const src = "https://example.com/image.jpg";
    const { getByRole } = render(<ResponsiveImage src={src} />);
    const image = getByRole("img");
    expect(image).toHaveAttribute("src", src);
  });

  it("should render the loading component when provided", () => {
    const src = "https://example.com/image.jpg";
    const loadingComponent = <div>Loading...</div>;
    const { getByText } = render(
      <ResponsiveImage src={src} LoadingComponent={loadingComponent} />
    );
    const loadingText = getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("should not render the loading component when the image is loaded", () => {
    const src = "https://example.com/image.jpg";
    const loadingComponent = <div>Loading...</div>;
    const { getByRole, queryByText } = render(
      <ResponsiveImage src={src} LoadingComponent={loadingComponent} />
    );
    const image = getByRole("img");
    expect(image).toBeInTheDocument();
    expect(queryByText("Loading...")).toBeInTheDocument();
    expect(image).toHaveStyle("height: 0");
    expect(image).toHaveStyle("width: 0");
  });
});

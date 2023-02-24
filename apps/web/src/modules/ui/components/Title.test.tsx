import { render, screen } from "@app/test/testUtils";
import Title from "@module/ui/components/Title";

describe("Title", async () => {
  it("should render a title", () => {
    render(<Title level="h1">Big heading</Title>);
    expect(screen.getByText("Big heading")).toBeInTheDocument();
  });

  it("should pick h1 as default", () => {
    render(<Title>Big heading</Title>);
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toBeInTheDocument();
  });

  it("should render corresponding HTML tag", () => {
    render(<Title level={"h1"}>Big first heading</Title>);
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toBeInTheDocument();

    render(<Title level={"h2"}>Big second heading</Title>);
    expect(
      screen.getByRole("heading", {
        level: 2,
      })
    ).toBeInTheDocument();
  });
});

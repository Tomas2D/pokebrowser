import { FetchWrapper } from "./FetchWrapper";
import { render } from "@app/test/testUtils";

describe("FetchWrapper", () => {
  it("renders children when isLoading is false, isEmpty is false, and error is undefined", () => {
    const { getByText } = render(
      <FetchWrapper isLoading={false} isEmpty={false} error={undefined}>
        <div>Test</div>
      </FetchWrapper>
    );
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("renders the empty component when isEmpty is true", () => {
    const { getByText } = render(
      <FetchWrapper
        isLoading={false}
        isEmpty={true}
        EmptyComponent={() => <span>No data found.</span>}
        error={undefined}
      >
        <div>Test</div>
      </FetchWrapper>
    );
    expect(getByText("No data found.")).toBeInTheDocument();
  });

  it("renders the loader component when isLoading is true", () => {
    const { getByTestId } = render(
      <FetchWrapper
        LoaderComponent={() => <div data-testid="loader">loader</div>}
        isLoading={true}
        isEmpty={false}
        error={undefined}
      >
        <div>Test</div>
      </FetchWrapper>
    );
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("renders the error component when error is defined", () => {
    const error = new Error("Test error");
    const { getByText } = render(
      <FetchWrapper isLoading={false} isEmpty={false} error={error}>
        <div>Test</div>
      </FetchWrapper>
    );
    expect(getByText("Error: Test error")).toBeInTheDocument();
  });
});

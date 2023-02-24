import dynamic from "next/dynamic";

export const Tooltip = dynamic(
  async () => {
    const x = await import("carbon-components-react");
    return x.Tooltip;
  },
  {
    ssr: false,
  }
);

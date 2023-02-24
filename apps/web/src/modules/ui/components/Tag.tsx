import dynamic from "next/dynamic";

export const Tag = dynamic(
  async () => {
    const x = await import("carbon-components-react");
    return x.Tag;
  },
  {
    ssr: false,
  }
);

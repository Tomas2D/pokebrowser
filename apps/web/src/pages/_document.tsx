import Document, { Html, Head, Main, NextScript } from "next/document";
import { MODAL_WRAPPER_ID } from "@app/config";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id={MODAL_WRAPPER_ID} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

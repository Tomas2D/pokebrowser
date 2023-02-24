import { AppProps } from "next/app";
import { Core } from "@module/core/components/Core";
import NextNProgress from "nextjs-progressbar";
import { ErrorBoundary } from "@app/modules/core/components/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <Core pageProps={pageProps}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Core>
    </>
  );
}

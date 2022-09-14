import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

import Header from "../components/Header";

import { globalStyle } from "../styles/global/documentStyle";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyle();
  return (
    <>
      <Head>
        <title>ListMe!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ fontFamily: "Open Sans" }}
      >
        <Header />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default MyApp;

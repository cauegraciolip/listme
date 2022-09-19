//LIBRARIES
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

//TYPES
import type { AppProps } from "next/app";

//STYLES
import { globalStyle } from "../styles/global/documentStyle";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;

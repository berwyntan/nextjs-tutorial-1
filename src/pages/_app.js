import "@/styles/globals.css";
import Layout from "../../components/layout/layout";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="Find or create events for you" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}

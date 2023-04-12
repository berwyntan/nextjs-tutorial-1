import "@/styles/globals.css";
import Layout from "../../components/layout/layout";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find or create events for you" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

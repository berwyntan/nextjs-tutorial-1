import Head from "next/head";
import EventList from "../../components/events/eventList";
import { getData } from "../../helpers/api-util";
import NewsletterRegistration from "../../components/input/newsletter-registration";
import Link from "next/link";
// import { DUMMY_EVENTS, getFeaturedEvents } from "../../dummy-data";
// import fs from "fs/promises";
// import path from "path";
import { useUser } from "@clerk/nextjs";

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();
  const { user } = useUser();
  console.log(user);

  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find or create events for you" />
      </Head>
      {user && <div className="center my">{`Hello, ${user.firstName}`}</div>}
      {/* <NewsletterRegistration /> */}
      {!user && (
        <div>
          {/* <div className="center my">
            <Link href="/sign-up">Sign Up!</Link>
          </div> */}
          <div className="center my">
            <Link href="/sign-in">Sign In!</Link>
          </div>
        </div>
      )}

      {/* <EventList items={featuredEvents} /> */}
      <EventList items={props.events} />
    </>
  );
};

export const getStaticProps = async (context) => {
  // const filePath = path.join(process.cwd(), "dummy-data.json");
  // const jsonData = await fs.readFile(filePath);
  // const data = JSON.parse(jsonData);

  // const rawData = await fetch(
  //   "https://nextjs-course-40339-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  // );

  // const data = await rawData.json();

  const data = await getData();

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (data.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      events: data,
    },
    revalidate: 1800,
  };
};

export default HomePage;

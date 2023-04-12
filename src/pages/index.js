import EventList from "../../components/events/eventList";
// import { DUMMY_EVENTS, getFeaturedEvents } from "../../dummy-data";
// import fs from "fs/promises";
// import path from "path";

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <>
      {/* <EventList items={featuredEvents} /> */}
      <EventList items={props.events} />
    </>
  );
};

export const getStaticProps = async (context) => {
  // const filePath = path.join(process.cwd(), "dummy-data.json");
  // const jsonData = await fs.readFile(filePath);
  // const data = JSON.parse(jsonData);

  const rawData = await fetch(
    "https://nextjs-course-40339-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  
  const data = await rawData.json();

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
    revalidate: 600,
  };
};

export default HomePage;

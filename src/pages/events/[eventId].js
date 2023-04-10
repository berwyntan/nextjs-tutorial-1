import { useRouter } from "next/router";
import { getEventById } from "../../../dummy-data";
import { Fragment } from "react";
import EventSummary from "../../../components/event-detail/event-summary";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventContent from "../../../components/event-detail/event-content";
import fs from "fs/promises";
import path from "path";

const EventDetailPage = (props) => {
  // const router = useRouter();
  // const eventId = router.query.eventId;
  // const eventInfo = getEventById(eventId);
  // console.log(props);
  const { eventInfo } = props;

  if (!eventInfo) {
    return <p>No event found!</p>;
  }

  const { title, date, location, image, description } = eventInfo;

  return (
    <Fragment>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
};

export const getStaticProps = async (context) => {
  // useRouter doesn't work here as this is run on server side before loading to client
  const { params } = context;
  const eventId = params.eventId;
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

  const eventInfo = data.find((ev) => ev.id === eventId);

  if (!eventInfo) {
    return { notFound: true };
  }

  return {
    props: {
      eventInfo: eventInfo,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();
  const ids = data.map((ev) => ev.id);
  const params = ids.map((id) => ({ params: { eventId: id } }));
  return {
    paths: params,
    fallback: true, //allows paths not specified in getStaticPaths
  };
};

export default EventDetailPage;

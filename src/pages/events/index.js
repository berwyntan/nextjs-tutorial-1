import { useRouter } from "next/router";
import EventList from "../../../components/events/eventList";
import EventsSearch from "../../../components/events/eventsSearch";
import { getAllEvents } from "../../../dummy-data";

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  };
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;

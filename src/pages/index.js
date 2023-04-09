import EventList from "../../components/events/eventList";
import { getFeaturedEvents } from "../../dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <EventList items={featuredEvents} />
    </>
  );
};

export default HomePage;

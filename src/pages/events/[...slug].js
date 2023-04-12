import { useRouter } from "next/router";

import EventList from "../../../components/events/eventList";
import ResultsTitle from "../../../components/results-title/results-title";
import { getFilteredEvents } from "../../../helpers/api-util";

const FilteredEventsPage = (props) => {
  // const router = useRouter();
  // console.log(router?.query.slug);
  // const filterData = router.query.slug;
  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  const { hasError, filteredEvents, filterDate } = props;
  if (hasError) {
    return <div>Error!</div>;
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }
  const { filteredYear, filteredMonth } = filterDate;

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = parseInt(filterData[0]);
  const filteredMonth = parseInt(filterData[1]);

  if (
    isNaN(filteredMonth) ||
    isNaN(filteredYear) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  return {
    props: {
      filteredEvents: filteredEvents,
      filterDate: {
        filteredYear: filteredYear,
        filteredMonth: filteredMonth,
      },
    },
  };
}

export default FilteredEventsPage;

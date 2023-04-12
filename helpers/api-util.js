export const getData = async () => {
  const rawData = await fetch(
    "https://nextjs-course-40339-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );

  const data = await rawData.json();
  return data;
};

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const data = await getData();
  
  let filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

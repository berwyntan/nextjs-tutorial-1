import EventItem from "./eventItem";
import classes from "./eventList.module.css"

const EventList = (props) => {
  const { items } = props;
  
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          title={event.title}
          image={event.image}
          date={event.date}
          location={event.location}
          id={event.id}
        />
      ))}
    </ul>
  );
};

export default EventList;

import { useRouter } from "next/router"
import { getEventById } from "../../../dummy-data"
import { Fragment } from "react"
import EventSummary from "../../../components/event-detail/event-summary"
import EventLogistics from "../../../components/event-detail/event-logistics"
import EventContent from "../../../components/event-detail/event-content"

const EventDetailPage = () => {
    const router = useRouter()
    const eventId = router.query.eventId
    const eventInfo = getEventById(eventId)
    console.log(eventInfo)
    

    if (!eventInfo) {
      return <p>No event found!</p>
    } 

    const { title, date, location, image, description } = eventInfo

  return (
    <Fragment>
      <EventSummary title={title}/>
      <EventLogistics date={date} address={location} image={image} imageAlt={title}/>
      <EventContent><p>{description}</p></EventContent>
    </Fragment>
  )
}

export default EventDetailPage
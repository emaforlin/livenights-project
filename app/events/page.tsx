import Link from 'next/link'
import EventGrid from './components/EventGrid'


const EventsPage = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-center m-14 text-5xl font-bold">Explora todos nuestros eventos</h1>
            <EventGrid />
        </div>
      )
}

export default EventsPage
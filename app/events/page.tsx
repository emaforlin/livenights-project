import React from 'react'
import EventCard from '@/components/EventCard'
import { database } from '@/db/db'
const EventsPage = () => {
    return (
    <div className="grid-flow-col">
        <h1>Events</h1>
        <EventCard data={database[0]}></EventCard>
    </div>
  )
}

export default EventsPage
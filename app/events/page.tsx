"use client";

import React, { useEffect } from 'react'
import EventCard from '@/components/EventCard'
import { database } from '@/db/db'
const EventsPage = () => {
    const eventList = database;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-center mt-6 mb-10 text-5xl font-bold">Explora todos nuestros eventos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {eventList.map((e) => (
                    <EventCard key={e.id} data={{
                        id: e.id,
                        title: e.title,
                        description: e.description,
                        date: e.date,
                        imageURL: e.imageURL,
                        location: e.location,
                        producer: e.producer
                    }}/>
                ))}
            </div>
        </div>
      )
}

export default EventsPage
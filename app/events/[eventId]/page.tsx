"use client";

import React, { use } from 'react'
import { date2text } from '@/utils/date';
import { MapPin, Calendar } from 'lucide-react';
import Link from 'next/link'
import { useEventContext } from '@/context/EventContext';
import { EventType } from '@/types/event';


function SingleEvent({ params }: { params: Promise<{eventId: string }>}) {
    const {eventId} =  use(params);
    const id = parseInt(eventId);

    const { events } = useEventContext();

    const event = events.find((e: EventType) => e.id === id);

    if (!event) {
        return (
            <div className="flex my-20">
                <h1 className="mx-auto text-5xl font-bold">Not Found</h1>
            </div>
        )
    }

    return (
        <>
        <Link href="/events"
            className="relative top-1 left-1 hover:underline">
                Volver
        </Link>
        <div className="flex m-5">
            <div className="w-1/2 p-4">
                {/* <Image src={event.imageURL} alt={"Cover of an event called "+event.title + " produced by "+event.producer}
                    width={500} height={500}
                    className="aspect-auto shadow-lg h-full w-full rounded object-cover">
                </Image> */}
            </div>
            <div className="w-1/2 p-4">
                <h2 className="text-5xl font-bold text-justify">{event.title.toUpperCase()}</h2>
                <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar size={20} />
                   <p className="text-lg text-gray-400">{date2text(new Date(event.date))}</p>
               </div>
               
                <div className="flex items-center space-x-2 mt-6 text-gray-400">
                    <MapPin size={20}/>
                    <p className="text-sm">{event.location}</p>
                </div>
                <div className="max-w-full">
                    <p className="py-10 text-gray-100 text-base">{event.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam voluptatem qui quo reprehenderit voluptate suscipit ipsum, aperiam facere minima modi maxime dicta odio et expedita voluptatibus facilis ad maiores tempore?</p>
                </div>
            </div>
        </div>
        </>

    )
}

export default SingleEvent
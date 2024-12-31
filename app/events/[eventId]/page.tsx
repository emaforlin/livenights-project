"use client";

import React, { use } from 'react'
import { date2text } from '@/utils/date';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useEventContext } from '@/context/EventContext';
import { Event } from '@prisma/client';


function SingleEvent({ params }: { params: Promise<{eventId: string }>}) {
    const {eventId} =  use(params);
    const id = parseInt(eventId);

    const { events } = useEventContext();

    const event = events.find((e: Event) => e.id === id);

    if (!event) {
        return (
            <div className="flex my-20">
                <h1 className="mx-auto text-5xl font-bold">Not Found</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row m-3 md:m-5 gap-6">
          <div className="w-full md:w-1/2 p-2 md:p-4">
            <div className="bg-gray-200 w-full aspect-square rounded-lg shadow-lg">
              <p className="flex justify-center items-center h-full">IMAGEN</p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 p-2 md:p-4 flex flex-col min-h-[500px] min-w-[50%]">
            <Link href="/events" className="flex justify-end hover:underline">
                Volver
            </Link>
            <h2 className="text-3xl md:text-5xl font-bold break-words">
              {event?.title?.toUpperCase()}
            </h2>
            
            <div className="flex items-center space-x-2 text-gray-800 mt-4">
              <Calendar className="flex-shrink-0" size={20} />
              <p className="text-base md:text-lg text-gray-400">
                {date2text(new Date(event?.date))}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-6 text-gray-700">
              <MapPin className="flex-shrink-0" size={20}/>
              <p className="text-sm break-words">{event?.location}</p>
            </div>

            <div className="mt-4">
              <p className="py-4 md:py-10 text-gray-800 text-sm md:text-base">
                {event?.description || "No description available"}
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-8 md:mt-10 text-gray-700">
              <p className="text-3xl break-words font-bold">$ 8.000</p>
            </div>

            <div className="flex mt-5">
                <Button size={"lg"} className="text-xl font-bold">COMPRAR</Button>
            </div>
          </div>
        </div>
      );
    };

export default SingleEvent
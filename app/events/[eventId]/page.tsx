"use client";

import React, { use, useEffect, useState } from 'react'
import { date2text } from '@/utils/date';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link'
import { useEventContext } from '@/context/EventContext';
import Image from "next/image";
import { VisibilityWrapper } from '@/components/VisibilityWrapper';
import { useTicketContext } from '@/context/TicketsContext';
import { BuyTicketForm } from './components/BuyTicketForm';


function SingleEvent({ params }: { params: Promise<{eventId: string }>}) {
  const {eventId} =  use(params);

  const { batches, fetchTicketBatches, setEvent } = useTicketContext();
  const { events, fetchEventWithId } = useEventContext();

  const id = parseInt(eventId);
  
  useEffect(() => {
    setEvent(id);
    fetchEventWithId(id);
    fetchTicketBatches();
  }, [])
  
  const event = events[0];
  


  if (!event) {
    return (
      <div className="flex my-20">
        <h1 className="mx-auto text-5xl font-bold">Not Found</h1>
      </div>
    )
  }

  return (<>
    <VisibilityWrapper visible={true}>
        <div className="flex flex-col md:flex-row m-3 md:m-5 gap-6">
          <div className="w-full md:w-1/2 p-2 md:p-4">
            <Image
              alt=''
              src={"/api/images/" + event.image}
              width={800}
              height={800} />
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
              <MapPin className="flex-shrink-0" size={20} />
              <p className="text-sm break-words">{event?.location}</p>
            </div>

            <div className="mt-4">
              <p className="py-4 md:py-10 text-gray-800 text-sm md:text-base">
                {event?.description || "Este evento no tiene una descripción."}
              </p>
            </div>

            <div className="p-2 md:p-4 flex flex-col">
              <BuyTicketForm 
                className="w-full md:w-1/2 p-2 md:p-4 flex flex-col"
                eventId={event.id}
                />
          </div>

          </div>  
      </div>
    </VisibilityWrapper>
</>);
};

export default SingleEvent
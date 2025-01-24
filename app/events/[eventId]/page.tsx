"use client";

import React, { use, useEffect, useState } from 'react'
import { date2text } from '@/utils/date';
import { MapPin, Calendar } from 'lucide-react';
import Link from 'next/link'
import { useEventContext } from '@/context/EventContext';
import Image from "next/image";
import { VisibilityWrapper } from '@/components/VisibilityWrapper';
import { useTicketContext } from '@/context/TicketsContext';
import { BuyTicketForm } from './components/BuyTicketForm';
import { Event, TicketBatch, User } from '@prisma/client';


function SingleEvent({ params }: { params: Promise<{eventId: string }>}) {
  const {eventId} =  use(params);

  const { fetchTicketBatches, setEventId } = useTicketContext();
  const { loading, fetchEventById } = useEventContext();

  const [thisEvent, setThisEvent] = useState<(Event & {
          producer: User;
          TicketBatch: TicketBatch[];
      })|null>(null)

  const id = parseInt(eventId);
    
  useEffect(() => {
    setEventId(id);
    fetchTicketBatches();
    fetchOneEvent(id);
  }, [])
    
  const fetchOneEvent = async (id:number) => {
    const event = await fetchEventById(id)
    setThisEvent(event);
  }

  if (loading) {
    return (
        <p className="flex w-full items-center justify-center text-2xl">Cargando...</p>
    )
  }

  if (!loading && !thisEvent) {
    return (
      <div className="flex my-20">
        <h1 className="mx-auto text-5xl font-bold">No se encontró un resultado.</h1>
      </div>
    )
  }

  return (<>
    <VisibilityWrapper visible={!loading && !!thisEvent}>
        <div className="flex flex-col md:flex-row m-3 md:m-5 gap-6">
          <div className="w-full md:w-1/2 p-2 md:p-4">
            <Image
              alt=''
              src={"/api/images/" + thisEvent?.image}
              width={800}
              height={800} />
          </div>

          <div className="w-full md:w-1/2 p-2 md:p-4 flex flex-col min-h-[500px] min-w-[50%]">
            <Link href="/events" className="flex justify-end hover:underline">
              Volver
            </Link>
            <h2 className="text-3xl md:text-5xl font-bold break-words">
              {thisEvent && thisEvent.title?.toUpperCase()}
            </h2>

            <div className="flex items-center space-x-2 text-gray-800 mt-4">
              <Calendar className="flex-shrink-0" size={20} />
              <p className="text-base md:text-lg text-gray-400">
                {thisEvent && date2text(new Date(thisEvent.date))}
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-4 md:mt-6 text-gray-700">
              <MapPin className="flex-shrink-0" size={20} />
              <p className="text-sm break-words">{thisEvent?.location}</p>
            </div>

            <div className="mt-4">
              <p className="py-4 md:py-10 text-gray-800 text-sm md:text-base">
                {thisEvent && thisEvent.description || "Este evento no tiene una descripción."}
              </p>
            </div>

            <div className="p-2 md:p-4 flex flex-col">
              <VisibilityWrapper visible={!!thisEvent}>
                <BuyTicketForm 
                  className="w-full md:w-1/2 p-2 md:p-4 flex flex-col"
                  eventId={thisEvent?.id!}
                />
            </VisibilityWrapper>
          </div>

          </div>  
      </div>
    </VisibilityWrapper>
</>);
};

export default SingleEvent
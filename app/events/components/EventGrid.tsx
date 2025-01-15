"use client";

import React from 'react'
import { useEventContext } from '@/context/EventContext';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { date2text } from '@/utils/date';
import { Event } from '@prisma/client';

const EventGrid = () => {
    const { events } = useEventContext();
    return (
        <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            {events.map((event) => (
                <div key={event.id} className="w-72 shrink-0 bg-slate-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Link href={"/events/"+event.id} className="group block">
                  <div className="relative overflow-hidden">
                    {/* <Image
                      className="aspect-square rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                      src={event.imageURL}
                      width={288}
                      height={288}
                      alt={"Cover of an event called " + event.title + " produced by "+event.producer}
                    /> */}
                    <div className="w-[288px] h-[288px] bg-slate-300">
                      <p className="flex justify-center items-center h-full text-3xl text-gray-600">IMAGEN</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-slate-500">{event.producer?.name}</p>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-400 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <p className="text-sm text-gray-700">{date2text(new Date(event.date))}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={16}/>
                        <p className="text-sm text-gray-700 line-clamp-1">{event.location}</p>
                      </div>
                      <div className="text-left ml-0.5">
                        <p className="text-xl text-gray-700 line-clamp-1">$ 8.000</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
  )
}


export default EventGrid
"use client";

import React from 'react'
import { useEventContext } from '@/context/EventContext';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { date2text } from '@/utils/date';

const EventGrid = () => {
  const { events } = useEventContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="shrink-0 bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <Link href={`/events/${event.id}`} className="group block">
            <div className="relative overflow-hidden">
              {/* Placeholder for image */}
              <div className="w-full h-56 bg-blue-500 flex justify-center items-center">
                <p className="text-3xl text-gray-600">IMAGEN</p>
              </div>
            </div>
            <div className="p-4">
              {/* Title */}
              <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                {event.title}
              </h3>
              {/* Date */}
              <div className="flex items-center space-x-2 text-slate-200 mt-2">
                <Calendar size={16} />
                <p className="text-sm">{date2text(new Date(event.date))}</p>
              </div>
              {/* Location */}
              <div className="flex items-center space-x-2 text-slate-200 mt-2">
                <MapPin size={16} />
                <p className="text-sm truncate">{event.location}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};


export default EventGrid
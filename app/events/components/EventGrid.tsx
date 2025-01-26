"use client";

import React, { useEffect } from 'react';
import { useEventContext } from '@/context/EventContext';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { date2text } from '@/utils/date';
import Image from 'next/image';

const EventGrid = () => {
    const { events, fetchActiveEvents } = useEventContext();
    useEffect(() => {
        fetchActiveEvents();
    }, [fetchActiveEvents]);
    console.log("events", events);
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {events && events.map((event) => {
                    const minPriceBatch = event.TicketBatch.reduce((min, current) => {
                        return current.price < min.price ? current : min;
                    }, event.TicketBatch[0]);
                    return (
                        <div 
                            key={event.id} 
                            className="w-full max-w-xs bg-slate-100 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                            <Link href={"/events/"+event.id} className="group block">
                                <div className="relative overflow-hidden">
                                    <Image
                                        className="aspect-square rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                                        src={"/api/images/"+event.image}
                                        width={288}
                                        height={288}
                                        alt={"Cover of an event called " + event.title + " produced by "+event.producer.username}
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-slate-500">{event.producer?.username}</p>
                                    <h3 className="truncate text-xl font-semibold text-gray-800 group-hover:text-orange-400 transition-colors duration-300">
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
                                        <div>
                                            <p>Desde: ${minPriceBatch.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>                         
                    );
                }
                )}
            </div>
        </div>
    );
};


export default EventGrid;
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { textFormat } from '@/app/utils/date'
import { MapPin, Calendar } from 'lucide-react';


interface EventCardProps {
  data: EventData
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
  return (
<div className="w-72 shrink-0 bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
  <Link href={"/events/"+data.id} className="group block">
    <div className="relative overflow-hidden">
      <Image
        className="aspect-square rounded-t-xl group-hover:scale-105 transition-transform duration-300"
        src={data.imageURL}
        width={288}
        height={288}
        alt={"Cover of an event called " + data.title + " produced by "+data.producer}
      />
    </div>
    <div className="p-4 max-h-[110px]">
      <p className="text-sm text-slate-500">{data.producer}</p>
      <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
        {data.title}
      </h3>
      <div className="flex items-center space-x-1">
        <Calendar size={16} />
        <p className="text-sm text-slate-200">{textFormat(data.date)}</p>
      </div>
      <div className="flex items-center space-x-1">
        <MapPin size={16}/>
        <p className="text-sm text-slate-200 line-clamp-1">{data.location}</p>
      </div>

    </div>
  </Link>
</div>
  )
}

export default EventCard
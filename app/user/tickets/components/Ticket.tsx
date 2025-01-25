"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Event } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import QRCode from "react-qr-code";

interface TicketProps {
  data: {
    title: string;
    description: string;
    location: string;
    category: string;
    date: Date;
    uid: string;
  }
}

function Ticket({ data }: TicketProps) {
  const [used, setUsed] = useState<boolean>(false);
  useEffect(() => {
    const checkTicketUsed = async (uid: string) => {
      const res = await fetch(`/api/tickets/${uid}`);
      if (res.ok) {
        const { used } = await res.json();
        setUsed(used);
      }
    }

    checkTicketUsed(data.uid);
  }, [data])
  const formattedDate = format(data.date, "dd/MM/yyyy | HH:mm ", {locale: es})
  console.log("used", used)
// bg-pink-500 hover:bg-pink-600
  return (
    <Dialog modal>
      <DialogTrigger disabled={used}>
      <div className={ used ? 
          "bg-gray-400 rounded-md shadow-sm px-8 py-4 w-80 h-36 flex" : 
          "bg-pink-500 hover:bg-pink-600 rounded-md shadow-sm px-8 py-4 w-80 h-36 flex hover:shadow-lg transition duration-300"}>
        <div className="flex-1 my-auto">
          <div className="flex justify-center items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <div key={index} className="text-xl text-yellow-400">★</div>
            ))}
          </div>
          <h3 className={"text-center text-white font-bold text-2xl"}>{data.title || "TICKET"}
          </h3>
          <div className="flex justify-center items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <div key={index} className="text-xl text-yellow-400">★</div>
            ))}
          </div>
        </div>
          <p className={"flex justify-center text-white font-bold tracking-widest" + used?"decoration-black decoration-2 line-through":""} 
            style={{ writingMode: 'vertical-rl', textOrientation: 'initial' }}>
              {data.uid.split("-")[0].toUpperCase()}
          </p>
      </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-row">
          <div className="flex flex-col w-2/3">
            <div className="">
              <p className="text-center text-sm">{data.description.toUpperCase()}</p>
              <h2 className="text-center font-bold text-3xl">{data.title.toUpperCase()}</h2>
            </div>
            <div className="flex items-center justify-between p-2 h-full">

              <div className="">
                <p className="font-bold">{data.location}</p>
                <p className="">{data.category}</p>
              </div>

              <div className="">
                <p className="text-end justify-end">{formattedDate}</p>
              </div>

            </div>
          </div>
          <div className="flex justify-center w-1/3">
            <QRCode value={data.uid} size={200}></QRCode>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Ticket;
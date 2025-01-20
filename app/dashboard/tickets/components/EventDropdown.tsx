"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Event } from "@prisma/client";
import RedirectBtn from "@/components/RedirectBtn";
import { useEventContext } from "@/context/EventContext";
import { useTicketContext } from "@/context/TicketsContext";


export const EventDropdown = () => {
  const {event, setEvent } = useTicketContext()
  const { events, fetchProducerEvents } = useEventContext();

  useEffect(() => {
    fetchProducerEvents();
  }, [event])

  const handleOpenChange = async (isOpen: boolean) => {
    if (isOpen) {
      await fetchProducerEvents();
    }
  };

  return (
    <div className="mt-5 mb-10 flex items-center space-x-3">
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-72 text-lg">
            {event ? event.title : "Seleccionar Evento"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72">
          {events.length>0 && events.map((event) => (
            <DropdownMenuItem key={event.id} onClick={() => setEvent(event.id)}>
              {event.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {event && 
        <RedirectBtn href={`/dashboard/tickets/new?event=${event.id}`}
          className="h-auto w-auto bg-blue-700 font-bold">
            Agregar Tanda
        </RedirectBtn>
      }
    </div>
  );
};

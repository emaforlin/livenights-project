"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RedirectBtn from "@/components/RedirectBtn";
import { useEventContext } from "@/context/EventContext";
import { useTicketContext } from "@/context/TicketsContext";
import { useSession } from "next-auth/react";


export const EventDropdown = () => {
    const { data: session } = useSession();
    const { events, fetchEventsByProducer } = useEventContext();
    const { setEventId, event } = useTicketContext();


    const producerId = session?.user?.id ? parseInt(session.user.id) : -1;

    useEffect(() => {
        fetchEventsByProducer(producerId);
    }, []);

    const handleOpenChange = async (isOpen: boolean) => {
        if (isOpen) {
            fetchEventsByProducer(producerId);
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
                        <DropdownMenuItem key={event.id} onClick={() => setEventId(event.id)}>
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

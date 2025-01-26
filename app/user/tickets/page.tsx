"use client";

import { useUserTicketContext } from "@/context/UserTicketsContext";
import Ticket from "./components/Ticket";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { TicketData } from "@/types/event";

function UserTicketsPage() {
    const {data: session, status} = useSession();
    const { setUser, tickets, fetchUserTickets } = useUserTicketContext();

    const userId = session?.user?.id || "0";
    
    useEffect(() => {
        if (session && status==="authenticated") {
            setUser(parseInt(userId));
        }
        fetchUserTickets();

    }, [userId, session, status]);

    return (
        <div className="m-5 w-full">
            <h1 className="w-full text-center text-3xl font-bold">Tu Cartera</h1>
            <div className="my-10 grid grid-cols-3 gap-x-5 gap-y-4">
                {tickets && tickets.map((ticket: TicketData, index) => (
                    <Ticket key={index} data={{
                        title: ticket.event.title,
                        category: ticket.batch.name,
                        date: ticket.event.date,
                        description: ticket.description,
                        location: ticket.event.location,
                        uid: ticket.uid
                    }}/>
                ))}
            </div>
        </div>
    );
}
export default UserTicketsPage;
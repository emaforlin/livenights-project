"use client";

import { EventDropdown  } from "./components/EventDropdown";

import { TicketBatchTable } from "./components/TicketbatchTable";

export default function TicketsDashboard() {
    return (
        <div className="w-full">
            <div className="mx-4 flex-grow">
                <h1 className="text-2xl text-center font-bold">Administra las Tandas de Tickets</h1>
                <EventDropdown />
                <TicketBatchTable />
            </div>
        </div>
    );
}
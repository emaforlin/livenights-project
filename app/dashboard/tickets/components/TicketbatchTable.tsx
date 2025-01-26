import { DataTable } from "@/components/ui/data-table";
import columns from "./columns";
import { useEffect } from "react";
import { useTicketContext } from "@/context/TicketsContext";


export function TicketBatchTable() {
    const { ticketBatches, fetchTicketBatches } = useTicketContext();
  
    useEffect(() => {
        fetchTicketBatches();
    }, []);
  
    return (
        <DataTable columns={columns} data={ticketBatches} /> 
    );
}
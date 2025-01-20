import { DataTable } from "@/components/ui/data-table";
import columns from "./columns";
import { useEffect } from "react";
import { useTicketContext } from "@/context/TicketsContext";


export function TicketBatchTable() {
  const { event, batches, fetchTicketBatches } = useTicketContext();
  
  useEffect(() => {
    fetchTicketBatches();
    console.log("Data table: se selecciono otro evento")
  }, [event, batches])
  
  return (
    <DataTable columns={columns} data={batches} /> 
  )
}
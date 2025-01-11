"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "../types/columns";
import { useEventContext } from "@/context/EventContext";

export const EventsTable = () => {
  const { events, selectProducer } = useEventContext(); 

  selectProducer("3");
  
  return (
    <div className="m-6 border rounded flex flex-col items-center">
      <div className="flex justify-center w-full overflow-x-auto">
        <div className="flex justify-center max-w-4xl w-full">
          <DataTable columns={columns} data={events}/>
        </div>
      </div>
    </div>
  )
}
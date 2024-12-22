import { DataTable } from '@/components/ui/data-table';
import React, { useEffect, useState } from 'react'
import { columns, EventData } from './types/columns';
import { EventsTable } from './components/EventsTable';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl text-black mb-4">Tus Eventos</h1>
      <div className="flex justify-center w-full overflow-x-auto">
        <div className="flex justify-center max-w-4xl w-full">
          <EventsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
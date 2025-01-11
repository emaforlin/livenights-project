import columns from '@/app/dashboard/components/columns'
import { DataTable } from '@/app/dashboard/components/data-table'
import React from 'react'

const EventsTable = () => {
    return (
        <DataTable columns={columns} data={[]}/>
    )
}

export default EventsTable
import React from 'react'
import { DataTable } from './components/data-table'
import columns from './components/columns'
import { useEventContext } from '@/context/EventContext'

const Dashboard = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl">Eventos</h1>
      <DataTable columns={columns} data={[]}/>
    </div>
  )
}

export default Dashboard
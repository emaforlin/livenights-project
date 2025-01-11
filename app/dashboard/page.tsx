import React from 'react'
import { DataTable } from './components/data-table'
import columns from './components/columns'
import { useEventContext } from '@/context/EventContext'


const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="mx-4 flex-grow">
        <h1 className="m-4 text-3xl text-center">Eventos</h1>
        <DataTable columns={columns} data={[]}/>
      </div>
    </div>
  )
}

export default Dashboard
import React from 'react'
import { EventsTable } from './components/EventsTable'


const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="mx-4 flex-grow">
        <h1 className="m-4 text-3xl text-center">Eventos</h1>
          <EventsTable/>
      </div>
    </div>
  )
}

export default Dashboard

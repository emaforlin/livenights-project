import React from 'react'
import { EventsTable } from './components/EventsTable'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import RedirectBtn from '@/components/RedirectBtn'


const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="mx-4 flex-grow">
        <h1 className="m-4 text-3xl text-center">Eventos</h1>
          <RedirectBtn href="/dashboard/new">Nuevo</RedirectBtn>
          <EventsTable/>
      </div>
    </div>
  )
}

export default Dashboard

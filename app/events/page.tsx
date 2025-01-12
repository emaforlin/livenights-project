import React, { useEffect } from 'react'
import EventGrid from './components/EventGrid'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'


const EventsPage = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-center m-14 text-5xl font-bold">Explora todos nuestros eventos</h1>
            <EventGrid />
        </div>
      )
}

export default EventsPage
import React, { useState } from 'react'
import { Collapsible, CollapsibleContent } from './ui/collapsible'
import { SidebarHeader } from './ui/sidebar'
import { useSession } from 'next-auth/react'
import LoginBtn from './LoginBtn'
import { CollapsibleTrigger } from '@radix-ui/react-collapsible'

const NavHeader = () => {
    const { data:session, status } = useSession();

    const [isOpen, setIsOpen] = useState(true);

    return (
        <SidebarHeader className="flex">
            {session?.user && status==="authenticated" && (
                 <h2 className="text-left text-xl ml-5 mt-2 font-bold">Bienvenido <p className="font-light text-lg">{session.user.name?.split(" ")[0]}</p></h2>
            )}

            {status!=="authenticated" && (
                <>
                    <h2 className="text-left text-lg ml-5 mt-2 font-bold">LIVENIGHTS</h2>
                    <LoginBtn />
                </>
            )}      
        </SidebarHeader>
  )
}

export default NavHeader
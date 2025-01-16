
"use client";

import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const RedirectBtn = ({href, children}:{href: string, children: ReactNode}) => {
    const router = useRouter();
    return (
        <Button onClick={ () => {router.push(href)} }
            className="my-4 bg-blue-600">
            {children}
        </Button>
  )
}

export default RedirectBtn
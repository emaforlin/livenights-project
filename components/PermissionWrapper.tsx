"use client";
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

const PermissionWrapper = ({ allowedRoles, children } : { allowedRoles: string[], children: ReactNode }) => {
    const { data: session } =  useSession();
    const userRole = session?.user?.role || "GUEST";

    if (!allowedRoles.includes(userRole)) {
        return null;
    }
    return children;
}

export default PermissionWrapper
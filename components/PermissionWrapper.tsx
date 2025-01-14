"use client";
import { getUserRole } from '@/app/lib/dal';
import { useRole } from '@/context/RoleContext';
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

const PermissionWrapper = ({ allowedRoles, children } : { allowedRoles: string[], children: ReactNode }) => {
    const { data: session } =  useSession();

    const {role} = useRole()

    if (!allowedRoles.includes(role)) {
        return null;
    }
    return children;
}

export default PermissionWrapper
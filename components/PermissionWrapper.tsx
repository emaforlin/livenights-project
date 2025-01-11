import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

const PermissionWrapper = ({ allowedRoles, children } : { allowedRoles: string[], children: ReactNode }) => {
    const { data: session } =  useSession();

    const userRoles = session?.user.role.split(" ") || ["GUEST"];




    
    console.log("Roles from token ->", userRoles);
    console.log("Allowed roles ->", allowedRoles);
    if (!allowedRoles.some((role) => userRoles.includes(role))) {
        return null;
    }
    return children;
}

export default PermissionWrapper
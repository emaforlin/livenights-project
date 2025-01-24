"use client";

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface RoleContextType {
    role: string;
    setRole: (role: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);


export const RoleProvider = ({ children } : { children: ReactNode }) => {     
    const {data: session} = useSession();
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        if (session?.user?.role!) {
          setRole(session.user.role!);
        }
      }, [session]);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRole = () => {
    const context = useContext(RoleContext);

    if (!context) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
}
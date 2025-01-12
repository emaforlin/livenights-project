"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface RoleContextType {
    role: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);


export const RoleProvider = ({ role, children } : { role: string, children: ReactNode }) => {     
    return (
        <RoleContext.Provider value={{ role }}>
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
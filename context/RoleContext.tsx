"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface RoleContextType {
    roles: string[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);


export const RoleProvider = ({ roles, children } : { roles: string[], children: ReactNode }) => {     
    return (
        <RoleContext.Provider value={{ roles }}>
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
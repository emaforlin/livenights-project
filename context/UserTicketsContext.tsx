"use client";

import { TicketData } from "@/types/event";
import { User } from "@prisma/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type UserTicketsContextType = {
    setUser: (id: number) => void;
    user: User|undefined;
    tickets: TicketData[]|undefined;
    fetchUserTickets: () => Promise<void>;
};

const UserTicketsContext = createContext<UserTicketsContextType|undefined>(undefined);

export const UserTicketsProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<number|undefined>(undefined);
    const [user, setUserData] = useState<User|undefined>(undefined);
    const [tickets, setTickets] = useState<TicketData[]|undefined>(undefined);

    const fetchUser = async () => {
        try {
            if (!userId) throw new Error("could not fetch user without an id");
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) throw new Error("failed to fetch user");
            setUserData(await res.json());
        } catch (error: unknown) {
            console.log(error);
            setUserData(undefined);
        }
    };

    const fetchUserTickets = async () => {
        try {
            if (!userId) throw new Error("could not fetch tickets, user data required");
            const res = await fetch(`/api/users/${userId}/tickets`);
            if (!res.ok) throw new Error("faild to fetch user tickets");
            const data = await res.json();
            setTickets(data);
        } catch (error) {
            console.log(error);
            setTickets(undefined);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUser();
            fetchUserTickets();
        }
    }, [userId]);

    return (
        <UserTicketsContext.Provider value={{setUser: setUserId, user, fetchUserTickets, tickets}}>
            {children}
        </UserTicketsContext.Provider>
    );
};

export const useUserTicketContext = () => {
    const context = useContext(UserTicketsContext);
    if (!context) {
        throw new Error("useUserTicketsContext must be used within a UserTicketsProvider");
    }
    return context;
};

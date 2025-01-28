"use client";
import { useRole } from "@/context/RoleContext";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOut = () => {
    const {setRole} = useRole()
    return (
        <>
            <LogOut/>
            <button className="hover" onClick={() =>{
                signOut();
                setRole("GUEST");
            }}>Cerrar Sesión</button>
        </>
    );
};

export default SignOut;
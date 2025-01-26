import { useRole } from "@/context/RoleContext";
import { signOutAction } from "@/lib/actions";
import { LogOut } from "lucide-react";

const SignOut = () => {
    const {setRole} = useRole()
    return (
        <>
            <LogOut/>
            <form action={signOutAction}>
                <button type="submit"
                    onClick={() => setRole("GUEST")}
                    className="hover">Cerrar Sesion</button>
            </form>
        </>
    );
};

export default SignOut;
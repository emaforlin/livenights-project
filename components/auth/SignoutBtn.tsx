import { signOutAction } from "@/lib/actions";
import { LogOut } from "lucide-react";

const SignOut = () => {
    return (
        <>
            <LogOut/>
            <form action={signOutAction}>
                <button type="submit"
                    className="hover">Cerrar Sesion</button>
            </form>
        </>
    );
};

export default SignOut;
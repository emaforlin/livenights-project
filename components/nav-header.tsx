import { SidebarHeader } from './ui/sidebar';
import { useSession } from 'next-auth/react';
import RedirectBtn from './RedirectBtn';

const NavHeader = () => {
    const { data:session, status } = useSession();

    return (
        <SidebarHeader className="flex">
            {session?.user && status==="authenticated" && (
                <h2 className="text-left text-xl ml-5 mt-2 font-bold">Bienvenido <p className="font-light text-lg">{session.user.name?.split(" ")[0]}</p></h2>
            )}

            {status!=="authenticated" && (
                <>
                    <h2 className="text-left text-lg ml-5 mt-2 font-bold">LIVENIGHTS</h2>
                    <RedirectBtn href="/auth/login">Iniciar Sesión</RedirectBtn>
                </>
            )}      
        </SidebarHeader>
    );
};

export default NavHeader;
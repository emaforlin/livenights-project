import PermissionWrapper from '@/components/PermissionWrapper'
import { Card } from '@/components/ui/card';
import React from 'react'
import { getSession, getUserRole } from '../lib/dal';
import { UpgradeRoleForm } from '@/components/UpgradeRoleForm';

const handleBtnClick = async () => {
    const session = await getSession();
    
    if (session) {
        const userId = session.user?.id || "0";
        const res = await fetch(`/api/user/${parseInt(userId)}`);

        if (!res.ok) {

        }
        

    }
}

const Settings = async () => {
    const role = await getUserRole();
    let accountType: string;
    switch (role) {
        case "PRODUCER":
            accountType = "Productor";
            break;
        default:
            accountType = "Usuario";
            break;
    }



    return (
        <Card className="mx-auto text-center mt-10 w-1/3 h-auto">
            <div className="flex flex-col mx-4">
                <h1 className="justify-center text-2xl my-4 font-bold">CONFIGURACION</h1>

                <p className="text-gray-800 m-4">Tipo de cuenta: <span className="underline">{accountType}</span></p>
                <PermissionWrapper allowedRoles={["USER"]}>
                    <UpgradeRoleForm />
                </PermissionWrapper>
            </div>
        </Card>
  )
}

export default Settings
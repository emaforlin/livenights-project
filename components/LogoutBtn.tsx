import { handleSignOut } from '@/app/lib/actions';
import React from 'react';

const LogoutBtn = () => {
    return (
        <form action={handleSignOut}>
            <button>SignOut</button>
        </form>
    );
};

export default LogoutBtn;
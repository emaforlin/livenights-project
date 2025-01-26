"use client";
import { signInAction } from '@/lib/actions';
import React from 'react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

const SigninBtn = () => {
    const pathname = usePathname();
    return (
        !pathname.endsWith("/login") && 
    <form action={signInAction}>
        <Button type="submit" variant="default" className="w-full text-lg">Login</Button>
    </form>
    );
};

export default SigninBtn;
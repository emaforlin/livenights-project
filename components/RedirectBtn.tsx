
"use client";

import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface RedirectBtnProps {
    href: string;
    children: ReactNode;
    className?: string;
}

const RedirectBtn = ({href, children, className}: RedirectBtnProps) => {
    const router = useRouter();
    return (
        <Button onClick={ () => {router.push(href);} }
            className={className||"my-4 bg-blue-600"}>
            {children}
        </Button>
    );
};

export default RedirectBtn;
import React from 'react'
import Link from 'next/link'
import { NavItem } from '@/types/app-types';

interface NavbarProps {
    items: NavItem[];
}

const NavBar: React.FC<NavbarProps> = ({ items }) => {



    return (
    <div className=" py-4 px-2 bg-blue-700 ">
        <ul className="flex gap-6 justify-end text-xl text-gray-100">
            {items.map((item, index) => (
                <li key={index}>
                    <Link href={item.href} className="hover:underline">{item.label}</Link>
                </li>
            ))}
        </ul>
    </div>    
  )
}

export default NavBar;
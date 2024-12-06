import React from 'react'
import Link from 'next/link'
import { NavItem } from '@/types/app-types';

interface NavbarProps {
    items: NavItem[];
}

const NavBar: React.FC<NavbarProps> = ({ items }) => {



    return (
      <div className="z-40 sticky top-0 shadow-md">
        <nav className="py-6 px-4 bg-blue-700 ">
          <ul className="flex gap-6 justify-items-center justify-end text-xl text-gray-100">
            <Link href="/" className="absolute left-4 font-bold text-3xl">LIVENIGHTS</Link>
            {items.map((item) => (
              <Link href={item.href} className="hover:underline">{item.label}</Link>
            ))}
          </ul>
        </nav>    
      </div>   
  )
}

export default NavBar;
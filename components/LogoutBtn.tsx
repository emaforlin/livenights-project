import { logout } from '@/app/lib/actions';
import React from 'react'

const LogoutBtn = () => {
  return (
    <form action={logout}>
      <button>SignOut</button>
    </form>
  )
}

export default LogoutBtn
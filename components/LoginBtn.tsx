import { signIn } from 'next-auth/react'
import React from 'react'

const LoginBtn = () => {
  return (
    <button onClick={() => signIn()} className="flex justify-center w-3/4 mb-3 text-black text-2xl hover:text-blue-500 hover:shadow-lg">Iniciar Sesion</button>
  )
}

export default LoginBtn
import React from 'react'
import LoginForm from './components/LoginForm'

const LoginPage = () => {
  return (
    <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 border rounded-lg">
            <div>
                <h1 className="text-3xl text-center">Iniciar Sesion</h1>
            </div>
            <div className="flex h-ull w-full items-end bg-blue-100 rounded-lg px-4 pb-8 shadow-md">
                <LoginForm />
            </div>
        </div>
    </main>
  )
}

export default LoginPage
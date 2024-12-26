
import React from 'react'
import LoginForm from './components/LoginForm'

const Login = () => {
  return (
    <div className="max-w-lg mx-auto my-10 p-5 border rounded-lg shadow-lg bg-gray-100 border-gray-300">
        <h2 className="text-4xl font-bold my-10 text-center text-gray-800">
            Iniciar Sesion
        </h2>
        <LoginForm />
    </div>
  )
}

export default Login
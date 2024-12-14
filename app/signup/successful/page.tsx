import React from 'react'
import Link from 'next/link'

const SuccessfulSignup = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-950">
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">¡Registro exitoso!</h1>
      <p className="text-gray-700 mb-6">Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión.</p>
      <Link href="/login"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Ir al inicio de sesión
      </Link>
    </div>
  </div>
  )
}

export default SuccessfulSignup
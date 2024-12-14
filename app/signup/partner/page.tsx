
import React from 'react'
import SignupPartnerForm from '@/components/SignupPartnerForm'
const Signup = () => {
  return (
    <div className="max-w-lg mx-auto my-10 p-5 border rounded-lg shadow-lg bg-gray-100 border-gray-300">
        <h2 className="text-4xl font-bold my-10 text-center text-gray-800">
            Trabaja con nosotros
        </h2>
        <p className="text-gray-700 text-center text-lg font-bold">¿Quieres ser productor?</p>
        <p className="text-gray-600 text-center text-md">Crea tu cuenta y organiza tus propios eventos!</p>
        <SignupPartnerForm/>
    </div>
  )
}

export default Signup
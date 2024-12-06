
import SignupForm from '@/components/SignupForm'
import React from 'react'

const Signup = () => {
  return (
    <div className="max-w-lg mx-auto my-10 p-5 border rounded-lg shadow-lg bg-gray-100 border-gray-300">
        <h2 className="text-4xl font-bold my-10 text-center text-gray-800">
            Crea tu cuenta
        </h2>
        <SignupForm/>
    </div>
  )
}

export default Signup
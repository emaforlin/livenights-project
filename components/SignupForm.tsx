"use client";

import { SignupData } from '@/interfaces/app-interfaces';
import React from 'react'
import { useForm } from 'react-hook-form'

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>();
  
  const onSubmit = handleSubmit( (data) => console.log(data));
  console.log("err:" + errors);
  
  return (
    <form onSubmit={onSubmit} className="mx-6">
      <div className="mt-4">
        <label htmlFor="firstname" className="text-black text-lg">Nombre</label>
        <input type="text" id="firstname" placeholder="Nombre" 
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        {...register("firstname", {required: true, maxLength: 80})}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="lastname" className="text-black text-lg">Apellido</label>
        <input type="text" id="lastname" placeholder="Apellido" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        {...register("lastname", {required: true, maxLength: 100})}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="text-black text-lg">Email</label>
        <input type="text" id="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="mobile_number" className="text-black text-lg">Telefono</label>
        <input type="tel" id="mobile_number" placeholder="Mobile number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        {...register("mobile_number", {required: true, minLength: 6, maxLength: 12})}
        />
      
      </div>

      <div className="mt-4 mb-16">
        <label htmlFor="password" className="text-black text-lg">Contrasena</label>
        <input type="password" id="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black focus:tracking-widest"
        {...register("password", {required: true, min: 8})}
        />
      </div>

      <div className="w-full mt-4">
        <button className="w-full h-12 font-bold text-2xl bg-blue-600 hover:bg-blue-800 transition duration-300">Registrarse</button>
      </div>
    </form>
  );
}

export default SignupForm
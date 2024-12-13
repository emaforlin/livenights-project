"use client";

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupForm = () => {
  const { register, handleSubmit, reset } = useForm<UserSignupData>();

  const [apiResp, setApiResp] = useState<string|null>(null);

  

  const onSubmit: SubmitHandler<UserSignupData> = async (data) =>  {
    try {
      const resp = await fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data),
      });

      const result = await resp.json();

      if (resp.ok) {
        setApiResp(result.message || "Inicio de sesion exitoso!");
      } else {
        setApiResp(result.message || "Inicio de sesion fallido.");
      }
    } catch (err) {
      setApiResp("Ocurrio un error. Intente nuevamente.");
    }
  };
  
  useEffect(() => {
    if (apiResp) {
      console.log(apiResp);
      reset();
    }
  }, [apiResp, reset])


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-6">
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

      <div className="mt-4 mb-16">
        <label htmlFor="password" className="text-black text-lg">Contraseña</label>
        <input type="password" id="password" placeholder="Contraseña" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black focus:tracking-widest"
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
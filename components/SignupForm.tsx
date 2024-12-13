"use client";

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SignupForm = () => {
  const { register, handleSubmit, reset, formState: {errors} } = useForm<UserSignupData>();

  const [apiResp, setApiResp] = useState<{
    message: string,
    isAnError: boolean
  }|null>(null);

  const resetApiResp = () => {
    setApiResp({
      message: "",
      isAnError: false,
    });
  }

  const onSubmit: SubmitHandler<UserSignupData> = async (data) =>  {
    try {
        const resp = await fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data),
      });

      const result = await resp.json();
      console.log("RESULT: ", JSON.stringify(result))
      if (resp.ok) {
        setApiResp({
          message: "Registro exitoso!",
          isAnError: false,
        });
      } else {
        setApiResp({
          message: result.message || "Registro fallido.",
          isAnError: true,
        });
      }
    } catch (err) {
      setApiResp({
        message: "Ocurrio un error. Intente nuevamente.",
        isAnError: true,
      });
    }
  };
  
  useEffect(() => {
    if (apiResp) {
      console.log(apiResp);
      reset();
    }
  }, [apiResp, reset])


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-6">
        <div className="mt-4">
          <label htmlFor="firstname" className="text-black text-lg">Nombre</label>
          <input type="text" id="firstname" placeholder="Nombre" 
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          {...register("firstname", {required: true, maxLength: 80})}
          />
          {errors.firstname && <p className="text-red-600">Campo requerido</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="lastname" className="text-black text-lg">Apellido</label>
          <input type="text" id="lastname" placeholder="Apellido" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          {...register("lastname", {required: true, maxLength: 100})}
          />
          {errors.lastname && <p className="text-red-600">Campo requerido</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="text-black text-lg">Email</label>
          <input type="text" id="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
          {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
          />
          {errors.email && <p className="text-red-600">Campo requerido</p>}
        </div>

        <div className="mt-4 mb-16">
          <label htmlFor="password" className="text-black text-lg">Contraseña</label>
          <input type="password" id="password" placeholder="Contraseña" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black focus:tracking-widest"
          {...register("password", {required: true, min: 8})}
          />
          {errors.password && <p className="text-red-600">Campo requerido</p>}
        </div>
        <div className="w-full mt-4">
          <button className="w-full h-12 font-bold text-2xl bg-blue-600 hover:bg-blue-800 transition duration-300">Registrarse</button>
        </div>
      </form>

      { apiResp?.isAnError && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-red-600 text-white w-96 h-36 rounded-md shadow-lg flex items-center justify-center relative">
            <button className="absolute top-0 right-0 text-sm text-black hover:underline self-end mr-4 mt-2" onClick={() => resetApiResp()}>cerrar</button>
            <p className="text-xl font-bold">{apiResp.message}</p>
        </div>
      </div>
      )}
    </>
  );
}

export default SignupForm
"use client";

import { signup } from '@/app/lib/actions';
import { useActionState } from 'react';


const SignupForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
        signup,
        undefined
      );

  return (
      <form action={formAction} className="mx-6">
        <div className="mt-4">
          <label htmlFor="firstname" className="text-black text-lg">Nombre</label>
          <input type="text" id="firstname" name="firstname" placeholder="Nombre" 
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="lastname" className="text-black text-lg">Apellido</label>
          <input type="text" id="lastname" name="lastname" placeholder="Apellido" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="username" className="text-black text-lg">Nombre de usuario</label>
          <input type="text" id="username" name="username" placeholder="Usuario" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="text-black text-lg">Email</label>
          <input type="text" id="email" name="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
          />
        </div>

        <div className="mt-4 mb-16">
          <label htmlFor="password" className="text-black text-lg">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="Contraseña" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black focus:tracking-widest"
          />
        </div>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

        <div className="w-full mt-4">
          <button type="submit" aria-disabled={isPending} className="w-full h-12 text-white font-bold text-2xl bg-blue-600 hover:bg-blue-800 rounded-xl transition duration-300">Registrarse</button>
        </div>
      </form>
  );
}

export default SignupForm
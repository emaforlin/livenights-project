"use client";

import { signup } from '@/app/actions/auth';
import { useForm, Resolver } from 'react-hook-form'


const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    signup(data);
  });

  return (
      <form onSubmit={onSubmit} className="mx-6">
        <div className="mt-4">
          <label htmlFor="firstname" className="text-black text-lg">Nombre</label>
          <input type="text" id="firstname" placeholder="Nombre" 
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          {...register("firstname", {required: true, minLength: 2, maxLength: 80})}
          />
        </div>
        {errors?.firstname && <p className="text-red-600">{errors.firstname.message}</p>}

        <div className="mt-4">
          <label htmlFor="lastname" className="text-black text-lg">Apellido</label>
          <input type="text" id="lastname" placeholder="Apellido" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          {...register("lastname", {required: true, minLength: 2, maxLength: 80})}
          />
        </div>
        {errors?.lastname && <p className="text-red-600">{errors.lastname.message}</p>}

        <div className="mt-4">
          <label htmlFor="username" className="text-black text-lg">Nombre de usuario</label>
          <input type="text" id="username" placeholder="Usuario" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          {...register("username", {required: true, minLength: 4, maxLength: 16})}
          />
        </div>
        {errors?.username && <p className="text-red-600">{errors.username.message}</p>}

        <div className="mt-4">
          <label htmlFor="email" className="text-black text-lg">Email</label>
          <input type="text" id="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
          {...register("email", {required: true, pattern: /^\S+@\S+$/i})} 
          />
        </div>
        <p>La contraseña debe:</p>
        {errors?.email && <p className="text-red-600">{errors.email.message }</p>}

        <div className="mt-4 mb-16">
          <label htmlFor="password" className="text-black text-lg">Contraseña</label>
          <input type="password" id="password" placeholder="Contraseña" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black focus:tracking-widest"
          {...register("password", {required: true, minLength: 8})}
          />
        </div>
        {errors?.password && <p className="text-red-600">{errors.password.message }</p>}

       

        <div className="w-full mt-4">
          <button type="submit" className="w-full h-12 text-white font-bold text-2xl bg-blue-600 hover:bg-blue-800 rounded-xl transition duration-300">Registrarse</button>
        </div>
      </form>
  );
}

export default SignupForm
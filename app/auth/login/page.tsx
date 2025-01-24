"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email, 
            password, 
            redirect: false,
        })

        if (!res || res.error) {
            setError(res?.error || "Credenciales inválidas");
        } else {
            router.push("/events");
        }
    };


    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
            <main className="flex-grow flex flex-col justify-center items-center px-4 mt-20">
                <section className="bg-slate-100 p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold mg-4 text-gray-900">Iniciar Sesión</h2>
                    { error && <p className="text-red">{error}</p> }
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email:</label>
                            <input 
                                type="email"
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-950 focus:border-blue-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
                            <input 
                                type="password"
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-950 focus:border-blue-700"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-700">Iniciar Sessión</button>
                    </form>
                    <p className="text-gray-700 mt-4 text-center">No tienes una cuenta? <Link href="/auth/register" className="hover:text-gray-600">Registrate aquí</Link></p>
                </section>
                <br />
                <section className="bg-slate-100 p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold mg-4 text-gray-900">Inicia sesión con Github</h2>
                    <form action={async () => {
                        await signIn("github", {redirectTo: "/events"})
                    }}>
                        <button type="submit" className="w-full bg-blue-900 text-white px-3 py-2 rounded-md text-center hover:bg-blue-950">Sign in with Github</button>
                    </form>
                </section>
                <br />
                <section className="bg-slate-100 p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold mg-4 text-gray-900">Inicia sesión con Google</h2>
                    <form action={async () => {
                        await signIn("google", {redirectTo: "/events"})
                    }}>
                        <button type="submit" className="w-full bg-blue-900 text-white px-3 py-2 rounded-md text-center hover:bg-blue-950">Sign in with Google</button>
                    </form>
                </section>
                
            </main>
        </div>
    )
}

export default LoginPage;
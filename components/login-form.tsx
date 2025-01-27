import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LoginBtn from "./LoginBtn";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email, password);
        const res = await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        });

        if (!res || res.error || !res.ok) {
            setError("Credenciales invalidas");
        } else {
            router.push("/events");
        }
    };
    return (
        <div className={cn("flex flex-col gap-6", className||"")} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
            Ingresa tu email para loguearte en tu cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="yo@ejemplo.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <Button type="submit" className="w-full">
                Login
                            </Button>
                            <LoginBtn provider="google" redirectTo="/events">Iniciar sesión con Google</LoginBtn>
                        </div>
                        <div className="mt-4 text-center text-sm">
              Aún no tienes una cuenta?{" "}
                            <Link href="/auth/register" className="underline underline-offset-4">
                Registrarse
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

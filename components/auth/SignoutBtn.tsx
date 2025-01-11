import { signOutAction } from "@/lib/actions"

const SignOut = () => {
  return (
    <form action={signOutAction}>
        <button type="submit"
          className="hover">Cerrar Sesion</button>
    </form>
  )
}

export default SignOut
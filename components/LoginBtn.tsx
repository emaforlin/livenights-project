import { signIn } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button';

type LoginBtnProps ={
  provider: string;
  redirectTo: string|undefined;
  children: React.ReactNode
}

const LoginBtn = ({provider, redirectTo, children}: LoginBtnProps) => {
  return (
    <Button variant="outline" className="w-full"
      onClick={async () => {
        await signIn(provider, {redirectTo: redirectTo})
        }
      }>{children}
    </Button>
  )
}

export default LoginBtn
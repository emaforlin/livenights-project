import { signInAction } from '@/lib/actions'
import React from 'react'
import { Button } from '../ui/button'

const SigninBtn = () => {
  return (
    <form action={signInAction}>
        <Button type="submit" variant="default" className="w-full text-lg">Login</Button>
    </form>
  )
}

export default SigninBtn
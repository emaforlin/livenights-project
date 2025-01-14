import { Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SettingsBtn = () => {
    return (
    <>
        <Settings />
        <Link href="/settings">Configuracion</Link>

    </>
  )
}

export default SettingsBtn
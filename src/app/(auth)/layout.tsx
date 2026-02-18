import React from 'react'
import AuthLayout from '@/features/auth/components/auth-layout'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <AuthLayout>{children}</AuthLayout>
  )
}

export default Layout
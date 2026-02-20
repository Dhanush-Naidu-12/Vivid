import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

const Credentals =async () => {
  await requireAuth()
  return (
    <div>Credentals</div>
  )
}

export default Credentals
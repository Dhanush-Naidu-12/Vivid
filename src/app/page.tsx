
import React from 'react'
import { requireAuth } from '@/lib/auth-utils'
import { caller } from '@/trpc/server'

const page = async () => {
  await requireAuth()
  const data = await caller.getUser()
  return (
    <div className='text-red-600  font-bold flex items-center justify-center h-screen'>
      {JSON.stringify(data)}
    </div>
  )
}

export default page
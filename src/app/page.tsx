
import React from 'react'
import { requireAuth } from '@/lib/auth-utils'
import { caller, trpc } from '@/trpc/server'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
const page = async () => {
  await requireAuth()
  const data = await caller.getUser()

  const testAi = useMutation(trpc.testAi.mutationOptions())

  
  return (
    <div className='text-red-600 font-bold flex flex-col items-center justify-center h-screen gap-4'>
      <Button onClick={() => testAi.mutate()} disabled={testAi.isPending}>Test AI</Button>
    </div>
  )
}

export default page
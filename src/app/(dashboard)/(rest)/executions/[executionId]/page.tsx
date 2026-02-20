import React from 'react'
import { requireAuth } from '@/lib/auth-utils'

interface PageProps {
  params:Promise< {
    executionId: string
  }>
}

const Page = async ({ params }: PageProps) => {
  const { executionId} =await params
  await requireAuth()
  return (
    <p>
      Executions Id: {executionId}
    </p>
  )
}

export default Page

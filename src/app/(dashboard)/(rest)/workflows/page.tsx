import { requireAuth } from '@/lib/auth-utils'
import React, { Suspense } from 'react'
import { WorkflowList, WorkflowsContainer } from '@/features/workflows/components/workflows'
import { prefetchWorkflows } from '@/features/workflows/server/prefetch'
import { HydrateClient } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary'

const page = async () => {
  await requireAuth()
  prefetchWorkflows()
  return (
    <WorkflowsContainer>
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkflowList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
    </WorkflowsContainer>
  )
}

export default page
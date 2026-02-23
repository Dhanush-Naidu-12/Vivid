import { requireAuth } from '@/lib/auth-utils'
import React, { Suspense } from 'react'
import { WorkflowList, WorkflowsContainer, WorkflowsError, WorkflowsLoading } from '@/features/workflows/components/workflows'
import { prefetchWorkflows } from '@/features/workflows/server/prefetch'
import { HydrateClient } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary'
import { SearchParams } from 'nuqs/server'
import { workflowParamsLoader } from '@/features/workflows/server/params-loader'

type Props = {
  searchParams: Promise<SearchParams>
}

const page = async ({searchParams}:Props) => {
  const params = await workflowParamsLoader(searchParams)
  await requireAuth()
  prefetchWorkflows(params)
  return (
    <WorkflowsContainer>
    <HydrateClient>
      <ErrorBoundary fallback={<WorkflowsError/>}>
        <Suspense fallback={<WorkflowsLoading/>}>
          <WorkflowList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
    </WorkflowsContainer>
  )
}

export default page
'use client'
import { ErrorView, LoadingView } from "@/components/global/entity-component"
import { useSuspenceWorkflow } from "@/features/workflows/hooks/use-workflows"


export const EditorLoading =() =>{
  return  <LoadingView message="Loading editor.."/>
}

export const EdditorError =() =>{
    return <ErrorView message="Error loading editor"/>
}


export const Editor =({workflowId}:{workflowId: string}) =>{
    const {data: workflow} = useSuspenceWorkflow(workflowId);

    return(
        <p>
            {JSON.stringify(workflow, null, 2)}
        </p>
    )
}
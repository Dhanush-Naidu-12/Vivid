'use client'
import { EnityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/global/entity-component";
import { useCreateWorkflow, useSuspenceWorkflows } from "../hooks/use-workflows"
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "@/hooks/use-entity-search";

export const WorkflowSearch =() =>{
    const [params, setParams] = useWorkflowParams()
    const {searchValue, onSearchChange} = useEntitySearch({
        params,
        setParams,
    })
    return(
        <EntitySearch value={searchValue} onChange={onSearchChange} placeholder="Search workflows"/>
    )
}

export const WorkflowList = () =>{
    const workflows = useSuspenceWorkflows();

    return (
        <p>
            {JSON.stringify(workflows.data,null,2)}
        </p>
    );
};

export const WorkflowHeader = ({disabled}: {disabled?: boolean}) =>{
    const createWorkflow = useCreateWorkflow();
    const {handleError,model} = useUpgradeModel()
    const router = useRouter();
    const handleCreate =() =>{
        createWorkflow.mutate(undefined,{
            onSuccess:(data) =>{
                router.push(`/workflows/${data.id}`)
            },
            onError:(error) =>{
                handleError(error)
            }
        })
    }
    return(
        <>
          {model}
          <EntityHeader title="Workflows" description="Create and manage your workflows" onNew={handleCreate} newButtonLabel="New workflow" disabled={disabled} isCreating={createWorkflow.isPending}/>
        </>
    )
};

export const WorkflowPagination =() =>{
    const workflows = useSuspenceWorkflows()
    const [params, setParams] = useWorkflowParams()

    return(
        <EntityPagination disabled={workflows.isFetching} totalPages={workflows.data.totalPages} page={workflows.data.page} onPageChange={(page) => setParams({...params, page})}/>
    );
};

export const WorkflowsContainer =({children}: {children:React.ReactNode}) =>{
    return(
        <EnityContainer header={<WorkflowHeader/>} search={<WorkflowSearch/>} pagination={<WorkflowPagination/>}>
            {children}
        </EnityContainer>
    );
};
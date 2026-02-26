'use client'
import { EmptyView, EnityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/global/entity-component";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenceWorkflows } from "../hooks/use-workflows"
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import type { Workflow } from "@prisma/client";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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
    
    return(
        <EntityList items={workflows.data.items} getKey={(workflow) => workflow.id} renderItem={(workflow)=> <WorkflowItem data={workflow}/> } emptyViem={<WorkflowsEmpty/>}/>
    )
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


export const WorkflowsLoading =() =>{
    return <LoadingView entity="workflows"/>
}

export const WorkflowsError =() =>{
    return <ErrorView message="Failed to load workflows"/>
}


export const WorkflowsEmpty =()=>{
    const createWorkflow = useCreateWorkflow()
    const {handleError, model} = useUpgradeModel()
    const router = useRouter();
    const handleCreate = () =>{
        createWorkflow.mutate(undefined,{
            onError:(error)=>{
                handleError(error);
            },
            onSuccess:(data) =>{
                router.push(`/workflows/${data.id}`)
            }
        });
    };
    return(
        <>
        {model}
          <EmptyView message="You haven't created any workflows yet. Get started by creating your first workflow." onNew={handleCreate}/>
        </>
    )
}

export const WorkflowItem = ({data,}:{data:Workflow}) =>{
    const  removeWorkflow = useRemoveWorkflow()
    const handleRemove = () =>{
        removeWorkflow.mutate({id: data.id})
    }
    return(
        <EntityItem href={`/workflows/${data.id}`} title={data.name} subtitle={<>Updated {formatDistanceToNow(data.updatedAt, {addSuffix:true})}{" "} &bull; Created{" "}{formatDistanceToNow(data.createdAt, {addSuffix:true})}</>} image={
            <div className="flex size-8 items-center justify-center ">
                <WorkflowIcon className="size-5 text-muted-foreground"/>
            </div>
        } onRemove={handleRemove} isRemoving={removeWorkflow.isPending}/>
           
    )
}
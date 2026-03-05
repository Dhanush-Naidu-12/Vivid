'use client'
import { EmptyView, EnityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/global/entity-component";
import {  useRemoveCredential, useSuspenceCredentials } from "../hooks/use-credentials"
import { useRouter } from "next/navigation";
import { useCredentialParams } from "../hooks/use-credential-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { Credential, CredentialType, Workflow } from "@prisma/client";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export const CredentialSearch =() =>{
    const [params, setParams] = useCredentialParams()
    const {searchValue, onSearchChange} = useEntitySearch({
        params,
        setParams,
    })
    return(
        <EntitySearch value={searchValue} onChange={onSearchChange} placeholder="Search credentials"/>
    )
}

export const CredentialsList = () =>{
    const credentials = useSuspenceCredentials();
    
    return(
        <EntityList items={credentials.data.items} getKey={(credential) => credential.id} renderItem={(credential)=> <CredentialItem data={credential}/> } emptyViem={<CredentialsEmpty/>}/>
    )
};

export const CredentialsHeader = ({disabled}: {disabled?: boolean}) =>{
    return(
          <EntityHeader title="Credentials" newButtonHref="/credentials/new" description="Create and manage your credentials"  newButtonLabel="New credential" disabled={disabled} />
    )
};

export const CredentialsPagination =() =>{
    const credentials = useSuspenceCredentials()
    const [params, setParams] = useCredentialParams()

    return(
        <EntityPagination disabled={credentials.isFetching} totalPages={credentials.data.totalPages} page={credentials.data.page} onPageChange={(page) => setParams({...params, page})}/>
    );
};

export const CredentialsContainer =({children}: {children:React.ReactNode}) =>{
    return(
        <EnityContainer header={<CredentialsHeader/>} search={<CredentialSearch/>} pagination={<CredentialsPagination/>}>
            {children}
        </EnityContainer>
    );
};


export const CredentialsLoading =() =>{
    return <LoadingView entity="credentials"/>
}

export const CredentialsError =() =>{
    return <ErrorView message="Failed to load Credentials"/>
}


export const CredentialsEmpty =()=>{
    const router = useRouter();
    const handleCreate = () =>{
        router.push(`/credentials/new`)
    };
    return(
          <EmptyView message="You haven't created any credentials yet. Get started by creating your first credential." onNew={handleCreate}/>
    )
}

const credentialLogos: Record<CredentialType, string>={
    [CredentialType.OPENAI]: '/openai.svg',
    [CredentialType.GEMINI]: '/gemini.svg',
    [CredentialType.ANTHROPIC]: '/anthropic.svg'
}

export const CredentialItem = ({data,}:{data:Credential}) =>{
    const  removecredential = useRemoveCredential()
    const handleRemove = () =>{
        removecredential.mutate({id: data.id})
    }
    const logo = credentialLogos[data.type] || '/openai.svg'
    return(
        <EntityItem href={`/credentials/${data.id}`} title={data.name} subtitle={<>Updated {formatDistanceToNow(data.updatedAt, {addSuffix:true})}{" "} &bull; Created{" "}{formatDistanceToNow(data.createdAt, {addSuffix:true})}</>} image={
            <div className="flex size-8 items-center justify-center ">
                <Image src={logo} alt={data.type} width={20} height={20}/>
            </div>
        } onRemove={handleRemove} isRemoving={removecredential.isPending}/>
           
    )
}
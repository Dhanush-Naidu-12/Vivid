import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useCredentialParams } from "./use-credential-params"
import { CredentialType } from "@prisma/client"

export const useSuspenceCredentials = () =>{
    const trpc = useTRPC()
    const [params] = useCredentialParams()
    return useSuspenseQuery(trpc.credentials.getMany.queryOptions(params))
}

export const useCreateCredential =() =>{
    const queryClient = useQueryClient()
    const trpc = useTRPC()

    return (
        useMutation(
            trpc.credentials.create.mutationOptions({
                onSuccess:(data) =>{
                    toast.success(`Credential "${data.name}" created successfully`)
                    queryClient.invalidateQueries(
                        trpc.credentials.getMany.queryOptions({})
                    )
                },
                onError:(error) =>{
                    toast.error(`Failed to create credential: ${error.message}`)
                }
            })
        )
    )
}

export const useRemoveCredential =() =>{
    const queryClient = useQueryClient()
    const trpc = useTRPC();

    return useMutation(
        trpc.credentials.remove.mutationOptions({
            onSuccess:(data) =>{
                toast.success(`Credential "${data.name}" removed successfully`)
                queryClient.invalidateQueries(
                    trpc.credentials.getMany.queryOptions({})
                )
                queryClient.invalidateQueries(
                    trpc.credentials.getOne.queryOptions({id:data.id})
                )
            },
            onError:(error) =>{
                toast.error(`Failed to remove credential: ${error.message}`)
            }
        })
    )
}

export const useSuspenceCredential = (id:string) =>{
    const trpc = useTRPC()
    return useSuspenseQuery(trpc.credentials.getOne.queryOptions({id}))
}



export const useUpdateCrdential =() =>{
    const queryClient = useQueryClient()
    const trpc = useTRPC()

    return (
        useMutation(
            trpc.credentials.update.mutationOptions({
                onSuccess:(data) =>{
                    toast.success(`Credential "${data.name}" saved successfully`)
                    queryClient.invalidateQueries(
                        trpc.credentials.getMany.queryOptions({})
                    )
                    queryClient.invalidateQueries(
                        trpc.credentials.getOne.queryOptions({id:data.id})
                    )
                },
                onError:(error) =>{
                    toast.error(`Failed to save credential: ${error.message}`)
                }
            })
        )
    )
}


export const useCredentialByType = (type: CredentialType) =>{
    const trpc = useTRPC();
    return useQuery(trpc.credentials.getByType.queryOptions({type}))
}


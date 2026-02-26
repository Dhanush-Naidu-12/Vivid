'use client'

import { BaseExecutionNode } from "../base-execution-node"
import { Node, NodeProps, useReactFlow } from "@xyflow/react"
import { GlobeIcon } from "lucide-react"
import {memo, useState} from 'react'
import { FormType, HttpRequestDialog } from "./dialog"


type HttpRequestNodeData ={
    endpoint?: string;
    method?: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE';
    body?: string;
    [key: string]: unknown;
    
}

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode =memo((props: NodeProps<HttpRequestNodeType>)=>{
  const nodeStatus = 'initial'
  const nodeData = props.data as HttpRequestNodeData;
  const [dialogOpen , setDialogOpen] = useState(false)
  const handleOpenSettings = () => setDialogOpen(true)
  
  const {setNodes} = useReactFlow();
  const handleSubmit =(values:FormType)=>{
    setNodes((nodes) =>nodes.map((node)=>{
      if(node.id === props.id){
        return{
          ...node,
          data:{
            ...node.data,
            endpoint: values.endpoint,
            method: values.method,
            body: values.body,
          }
        }
      }
      return node;
    }))
  }
  const description = nodeData?.endpoint ? `${nodeData.method || 'GET'}: ${nodeData.endpoint}` : 'No endpoint configured'
  return(
    <>
     <HttpRequestDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} defaultEndpoint={nodeData.endpoint} defaultMethod={nodeData.method} defaultBody={nodeData.body}/>
     <BaseExecutionNode {...props} icon={GlobeIcon} name="HTTP Request" description={description} onSettings={handleOpenSettings} onDoubleClick={handleOpenSettings} status={nodeStatus}/>
    </>
  )
}) 
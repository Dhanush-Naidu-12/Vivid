'use client'

import { BaseExecutionNode } from "../base-execution-node"
import { Node, NodeProps, useReactFlow } from "@xyflow/react"
import {memo, useState} from 'react'
import { GeminiDialog, GeminiFormValues } from "./dialog"
import { useNodeStatus } from "../../hooks/use-node-status"
import { fetchGeminiToken } from "./actions"



type GeminiNodeData = {
    systemPrompt?: string;
    user?: string;
    credentialId?: string;
    userPrompt?: string;
    variableName?: string;
}

type GeminiNodeType = Node<GeminiNodeData>;

export const GeminiNode =memo((props: NodeProps<GeminiNodeType>)=>{
  const nodeStatus = useNodeStatus({
    nodeId:props.id,
    channel: "gemini-execution",
    topic: "status",
    refreshToken: fetchGeminiToken
  })
  const nodeData = props.data as GeminiNodeData;
  const [dialogOpen , setDialogOpen] = useState(false)
  const handleOpenSettings = () => setDialogOpen(true)
  
  const {setNodes} = useReactFlow();
  const handleSubmit =(values:GeminiFormValues)=>{
    setNodes((nodes) =>nodes.map((node)=>{
      if(node.id === props.id){
        return{
          ...node,
          data:{
            ...node.data,
            ...values,
          }
        }
      }
      return node;
    }))
  }
  const description = nodeData?.userPrompt ? `${ 'gemini-2.5-flash'}: ${nodeData.userPrompt.slice(0,50)}...` : 'No prompt configured'
  return(
    <>
     <GeminiDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} defaultValues={nodeData}/>
     <BaseExecutionNode {...props} icon='/gemini.svg' name="Gemini" description={description} onSettings={handleOpenSettings} onDoubleClick={handleOpenSettings} status={nodeStatus}/>
    </>
  )
}) 

GeminiNode.displayName = "GeminiNode"
'use client'

import { BaseExecutionNode } from "../base-execution-node"
import { Node, NodeProps, useReactFlow } from "@xyflow/react"
import {memo, useState} from 'react'
import { OpenAiFormValues,OpenAiDialog } from "./dialog"
import { useNodeStatus } from "../../hooks/use-node-status"
import {  fetchOpenAiToken } from "./actions"




type OpenAiNodeData = {
    systemPrompt?: string;
    user?: string;
    credentialId?: string;
    userPrompt?: string;
    variableName?: string;
}

type OpenAiNodeType = Node<OpenAiNodeData>;

export const OpenAiNode =memo((props: NodeProps<OpenAiNodeType>)=>{
  const nodeStatus = useNodeStatus({
    nodeId:props.id,
    channel: "openai-execution",
    topic: "status",
    refreshToken: fetchOpenAiToken
  })
  const nodeData = props.data as OpenAiNodeData;
  const [dialogOpen , setDialogOpen] = useState(false)
  const handleOpenSettings = () => setDialogOpen(true)
  
  const {setNodes} = useReactFlow();
  const handleSubmit =(values:OpenAiFormValues)=>{
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
  const description = nodeData?.userPrompt ? `${ 'gpt-4.1'}: ${nodeData.userPrompt.slice(0,50)}...` : 'No prompt configured'
  return(
    <>
     <OpenAiDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} defaultValues={nodeData}/>
     <BaseExecutionNode {...props} icon='/openai.svg' name="OpenAI" description={description} onSettings={handleOpenSettings} onDoubleClick={handleOpenSettings} status={nodeStatus}/>
    </>
  )
}) 

OpenAiNode.displayName = "OpenAiNode"
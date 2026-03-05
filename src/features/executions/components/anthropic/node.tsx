'use client'

import { BaseExecutionNode } from "../base-execution-node"
import { Node, NodeProps, useReactFlow } from "@xyflow/react"
import {memo, useState} from 'react'
import { useNodeStatus } from "../../hooks/use-node-status"
import {  fetchAnthropicToken } from "./actions"
import { AnthropicDialog, AnthropicFormValues } from "./dialog"




type AnthropicNodeData = {
    systemPrompt?: string;
    user?: string;
    userPrompt?: string;
    credentialId?: string;
    variableName?: string;
}

type AnthropicNodeType = Node<AnthropicNodeData>;

export const AnthropicNode =memo((props: NodeProps<AnthropicNodeType>)=>{
  const nodeStatus = useNodeStatus({
    nodeId:props.id,
    channel: "anthropic-execution",
    topic: "status",
    refreshToken: fetchAnthropicToken
  })
  const nodeData = props.data as AnthropicNodeData;
  const [dialogOpen , setDialogOpen] = useState(false)
  const handleOpenSettings = () => setDialogOpen(true)
  
  const {setNodes} = useReactFlow();
  const handleSubmit =(values:AnthropicFormValues)=>{
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
  const description = nodeData?.userPrompt ? `${ 'claude-opus-4-1'}: ${nodeData.userPrompt.slice(0,50)}...` : 'No prompt configured'
  return(
    <>
     <AnthropicDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} defaultValues={nodeData}/>
     <BaseExecutionNode {...props} icon='/anthropic.svg' name="Anthropic" description={description} onSettings={handleOpenSettings} onDoubleClick={handleOpenSettings} status={nodeStatus}/>
    </>
  )
}) 

AnthropicNode.displayName = "AnthropicNode"
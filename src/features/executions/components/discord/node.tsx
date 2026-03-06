'use client'

import { BaseExecutionNode } from "../base-execution-node"
import { Node, NodeProps, useReactFlow } from "@xyflow/react"
import {memo, useState} from 'react'
import { DiscordDialog, DiscordFormValues } from "./dialog"
import { useNodeStatus } from "../../hooks/use-node-status"
import { fetchDiscordToken } from "./actions"



type DiscordNodeData = {
   webhookUrl?: string;
   content?: string;
   username?: string;
}

type DiscordNodeType = Node<DiscordNodeData>;

export const DiscordNode =memo((props: NodeProps<DiscordNodeType>)=>{
  const nodeStatus = useNodeStatus({
    nodeId:props.id,
    channel: "discord-execution",
    topic: "status",
    refreshToken: fetchDiscordToken
  })
  const nodeData = props.data as DiscordNodeData;
  const [dialogOpen , setDialogOpen] = useState(false)
  const handleOpenSettings = () => setDialogOpen(true)
  
  const {setNodes} = useReactFlow();
  const handleSubmit =(values:DiscordFormValues)=>{
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
  const description = nodeData?.content ? `Send: ${nodeData.content.slice(0,50)}...` : "Not configured"
  return(
    <>
     <DiscordDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} defaultValues={nodeData}/>
     <BaseExecutionNode {...props} icon='/discord.svg' name="Discord" description={description} onSettings={handleOpenSettings} onDoubleClick={handleOpenSettings} status={nodeStatus}/>
    </>
  )
}) 

DiscordNode.displayName = "DiscordNode"
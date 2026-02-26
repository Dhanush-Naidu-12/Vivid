'use client'


import { type NodeProps, Position, useReactFlow } from "@xyflow/react"
import {memo, type ReactNode, useCallback} from 'react'
import { BaseNode, BaseNodeContent } from "../../../components/base-node"
import {BaseHandle} from "../../../components/base-handle"
import { WorkflowNode } from "../../../components/global/workflow-node"
import { LucideIcon, Target } from "lucide-react"
import Image from "next/image"
import { NodeStatusIndicator, NodeStatus } from "@/components/node-status-indicator"

interface BaseTriggerNodeProps extends NodeProps{
    icon: LucideIcon | string;
    name: string;
    description?: string;
    children?: ReactNode;
    status?: NodeStatus;
    onSettings?: () => void
    onDoubleClick?: () => void;
    
}

export const BaseTriggerNode = memo(({id, icon:Icon, name,description,children,onSettings,onDoubleClick,status='initial'}: BaseTriggerNodeProps)=>{
    const {setNodes, setEdges} = useReactFlow()
    const handleDelete =() =>{
        setNodes((currentNodes)=>{
            const updateNodes = currentNodes.filter((node) => node.id !== id)
            return updateNodes
        })
        setEdges((currentEdges)=>{
            const updateEdges = currentEdges.filter((edge) => edge.source !== id && edge.target !== id)
            return updateEdges
        })
    }
    return(
        <WorkflowNode name={name} description={description} onDelete={handleDelete} onSettings={onSettings} >
            <NodeStatusIndicator status={status}  className="rounded-l-2xl">
            <BaseNode onDoubleClick={onDoubleClick} className=" relative group" status={status}>
             <BaseNodeContent>
              {typeof Icon === 'string' ? (
                <Image src={Icon} alt={name} width={16} height={16} />
              ):(<Icon className="size-4 text-muted-foreground"/>)}
              {children}
              <BaseHandle id="source-1" type="source" position={Position.Right}/>
             </BaseNodeContent>
            </BaseNode>
            </NodeStatusIndicator>
        </WorkflowNode>
    )
})

BaseTriggerNode.displayName = 'BaseTriggerNode'

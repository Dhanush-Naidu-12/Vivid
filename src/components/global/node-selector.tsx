'use client'


import {createId} from '@paralleldrive/cuid2'
import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import {toast} from 'sonner'
import { NodeType } from '@prisma/client'
import { GlobeIcon, MousePointerIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Separator } from '../ui/separator'


export type NodeTypeOptions ={
    type: NodeType;
    label: string;
    description: string;
    icon: React.ComponentType<{className?: string}> | string;
    
}

const triggerNodes: NodeTypeOptions[] =[
    {
        type: NodeType.MANUAL_TRIGGER,
        label: "Manual Trigger",
        description: "Runs the flow on clicking a button. Good for getting started.",
        icon: MousePointerIcon
    },
        {
            type: NodeType.GOOGLE_FORM_TRIGGER,
            label: "Google Form",
            description: "Triggers the workflow when a Google Form is submitted.",
            icon: '/googleform.svg'
        },
        {
            type: NodeType.STRIPE_TRIGGER,
            label: "Stripe",
            description: "Triggers the workflow when a Stripe event occurs.",
            icon: '/stripe.svg'
        },
        

]

const executionNodes: NodeTypeOptions[] = [
    {
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Makes a HTTP request.",
        icon: GlobeIcon
    },
    {
        type: NodeType.GEMINI,
        label: "Gemini",
        description: "Integrate Gemini AI models into your workflow.",
        icon: '/gemini.svg'
    },
    {
        type: NodeType.OPENAI,
        label: "OpenAI",
        description: "Integrate OpenAI models into your workflow.",
        icon: '/openai.svg'
    },
    {
        type: NodeType.ANTHROPIC,
        label: "Anthropic",
        description: "Integrate Anthropic AI models into your workflow.",
        icon: '/anthropic.svg'
    },
    {
        type: NodeType.DISCORD,
        label: "Discord",
        description: "Send messages to Discord.",
        icon: '/discord.svg'
    },
   
]

interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function NodeSelector({open,onOpenChange,children}: NodeSelectorProps){
    const {setNodes,getNodes, screenToFlowPosition} = useReactFlow()
    const handleNodeSelect = useCallback((selection: NodeTypeOptions) =>{
       if(selection.type === NodeType.MANUAL_TRIGGER){
         const nodes = getNodes()
         const hasmanualtrigger = nodes.some(
            (node) => node.type === NodeType.MANUAL_TRIGGER
         )
         if(hasmanualtrigger){
            toast.error('Only one manual trigger is allowed per workflow')
            return
         }
       }
       setNodes((nodes) =>{
        const hasInitialTrigger = nodes.some(
            (node) => node.type === NodeType.INITIAL
        );

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
            x: centerX + (Math.random() - 0.5) * 200,
            y: centerY + (Math.random() - 0.5) * 200,
        })

        const newNode={
            id: createId(),
            data: {},
            position: flowPosition,
            type: selection.type
        }
        if(hasInitialTrigger){
            return [newNode]
        }

        return [...nodes, newNode]
       });

       onOpenChange(false)
    },[setNodes,getNodes,onOpenChange,screenToFlowPosition,])
    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side='right' className='w-full sm:max-w-md overflow-y-auto'>
                <SheetHeader>
                    <SheetTitle>
                        What triggers this flow?
                    </SheetTitle>
                    <SheetDescription>
                        A trigger is a step that starts your workflow
                    </SheetDescription>
                </SheetHeader>
                <div>
                    {triggerNodes.map((nodeType) =>{
                        const Icon = nodeType.icon;
                        return(
                            <div className='w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary' onClick={()=>handleNodeSelect(nodeType)} key={nodeType.type}>
                                <div className='flex items-center gap-6 w-full overflow-hidden'>
                                    {typeof Icon === 'string'? (
                                        <img src={Icon} alt={nodeType.label} className='size-5 object-contain rounded-sm'/>
                                    ):(
                                        <Icon className='size-5'/>
                                    )}
                                    <div className='flex flex-col items-start'>
                                        <span className='font-medium text-sm '>
                                            {nodeType.label}
                                        </span>
                                        <span className='text-xs text-muted-foreground'>
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Separator/>
                <div>
                    {executionNodes.map((nodeType) =>{
                        const Icon = nodeType.icon;
                        return(
                            <div className='w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary' onClick={()=>handleNodeSelect(nodeType)} key={nodeType.type}>
                                <div className='flex items-center gap-6 w-full overflow-hidden'>
                                    {typeof Icon === 'string'? (
                                        <img src={Icon} alt={nodeType.label} className='size-5 object-contain rounded-sm'/>
                                    ):(
                                        <Icon className='size-5'/>
                                    )}
                                    <div className='flex flex-col items-start'>
                                        <span className='font-medium text-sm '>
                                            {nodeType.label}
                                        </span>
                                        <span className='text-xs text-muted-foreground'>
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SheetContent>
        </Sheet>
    )
}

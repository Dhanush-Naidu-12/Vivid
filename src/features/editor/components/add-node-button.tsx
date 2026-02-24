'use client'

import { NodeSelector } from "@/components/global/node-selector";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo,useState } from "react";


export const AddNodeButton = memo(() =>{
    const [selectorOpen,setSelectorOpen] = useState(false);
    return(
        <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
        <Button size='icon' variant='outline' onClick={() => setSelectorOpen(true)} className="bg-primary text-primary-foreground">
            <PlusIcon className="size-4"/>
        </Button>
        </NodeSelector>
    )
})

AddNodeButton.displayName = 'AddNodeButton'
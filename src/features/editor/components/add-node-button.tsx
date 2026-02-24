'use client'

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo,useState } from "react";


export const AddNodeButton = memo(() =>{
    return(
        <Button size='icon' variant='outline' onClick={() =>{}} className="bg-background">
            <PlusIcon className="size-4"/>
        </Button>
    )
})

AddNodeButton.displayName = 'AddNodeButton'
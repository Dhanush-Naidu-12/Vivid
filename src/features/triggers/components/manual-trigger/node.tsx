import { NodeProps } from "@xyflow/react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointer, MousePointerIcon, Target } from "lucide-react";
import { memo } from "react";

export const ManualTriggerNode = memo((props: NodeProps)=>{
    return(
        <> 
          <BaseTriggerNode {...props} icon={MousePointerIcon} name="Manual Trigger" description="Trigger the workflow manually" onSettings={()=>{}} onDoubleClick={()=>{}}/>
        </>
    )
})
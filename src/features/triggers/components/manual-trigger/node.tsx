import { NodeProps } from "@xyflow/react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointer, MousePointerIcon, Target } from "lucide-react";
import { memo, useState } from "react";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggerNode = memo((props: NodeProps)=>{
  const [dialogOpen , setDialogOpen] = useState(false)
  const handleOpenSettings = () => setDialogOpen(true)
  const nodeStatus = 'initial'
    return(
        <> 
          <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
          <BaseTriggerNode {...props} icon={MousePointerIcon} name="Manual Trigger" description="Trigger the workflow manually" onSettings={handleOpenSettings} onDoubleClick={handleOpenSettings} status={nodeStatus}/>
         
        </>
    )
})
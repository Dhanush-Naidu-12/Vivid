import { NodeProps } from "@xyflow/react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointer, MousePointerIcon, Target } from "lucide-react";
import { memo, useState } from "react";
import { ManualTriggerDialog } from "./dialog";
import { fetchManualTriggerToken } from "./actions";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";

export const ManualTriggerNode = memo((props: NodeProps)=>{
  const [dialogOpen , setDialogOpen] = useState(false)
  const handleOpenSettings = () => setDialogOpen(true)
  const nodeStatus = useNodeStatus({
    nodeId:props.id,
    channel: "manual-trigger-execution",
    topic: "status",
    refreshToken: fetchManualTriggerToken
  })
    return(
        <> 
          <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
          <BaseTriggerNode {...props} icon={MousePointerIcon} name="Manual Trigger" description="Trigger the workflow manually" onSettings={handleOpenSettings} onDoubleClick={handleOpenSettings} status={nodeStatus}/>
         
        </>
    )
})
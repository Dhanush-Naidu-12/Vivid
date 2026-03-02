import { NodeProps } from "@xyflow/react";
import { BaseTriggerNode } from "../base-trigger-node";
import { memo, useState } from "react";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { StripeTriggerDialog } from "./dialog";
import { fetchStripeTriggerToken } from "./actions";

export const StripeTrigger = memo((props: NodeProps)=>{
  const [dialogOpen , setDialogOpen] = useState(false)
  const handleOpenSettings = () => setDialogOpen(true)
  const nodeStatus = useNodeStatus({
      nodeId:props.id,
      channel: "stripe-trigger-execution",
      topic: "status",
      refreshToken: fetchStripeTriggerToken
    })
    return(
        <> 
          <StripeTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
          <BaseTriggerNode {...props} icon='/stripe.svg' name="Stripe" description="When a Stripe event occurs"  onSettings={handleOpenSettings} onDoubleClick={handleOpenSettings} status={nodeStatus}/>
         
        </>
    )
})
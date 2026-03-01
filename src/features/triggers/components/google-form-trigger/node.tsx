import { NodeProps } from "@xyflow/react";
import { BaseTriggerNode } from "../base-trigger-node";
import { memo, useState } from "react";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchGoogleFormTriggerToken } from "./actions";
import { GoogleFormTriggerDialog } from "./dialog";

export const GoogleFormTrigger = memo((props: NodeProps)=>{
  const [dialogOpen , setDialogOpen] = useState(false)
  const handleOpenSettings = () => setDialogOpen(true)
  const nodeStatus = useNodeStatus({
      nodeId:props.id,
      channel: "google-form-trigger-execution",
      topic: "status",
      refreshToken: fetchGoogleFormTriggerToken
    })
    return(
        <> 
          <GoogleFormTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
          <BaseTriggerNode {...props} icon='/googleform.svg' name="Google Form" description="When a Google Form is submitted"  onSettings={handleOpenSettings} onDoubleClick={handleOpenSettings} status={nodeStatus}/>
         
        </>
    )
})
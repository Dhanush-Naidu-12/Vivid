import { InitialNode } from "@/components/global/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { NodeType } from "@prisma/client";
import { NodeTypes } from "@xyflow/react";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { GoogleFormTrigger } from "@/features/triggers/components/google-form-trigger/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode, 
  [NodeType.HTTP_REQUEST]:HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]:ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]:GoogleFormTrigger,
} as const satisfies NodeTypes


export type RegisteredNodeType = keyof typeof nodeComponents;


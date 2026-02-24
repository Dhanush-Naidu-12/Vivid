import { InitialNode } from "@/components/global/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { NodeType } from "@prisma/client";
import { NodeTypes } from "@xyflow/react";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode, 
  [NodeType.HTTP_REQUEST]:HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]:ManualTriggerNode,
} as const satisfies NodeTypes


export type RegisteredNodeType = keyof typeof nodeComponents;


'use client'
import { ErrorView, LoadingView } from "@/components/global/entity-component"
import { useSuspenceWorkflow } from "@/features/workflows/hooks/use-workflows"
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Edge, Node, NodeChange, EdgeChange, Connection, Background, Controls, MiniMap, Panel, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeComponents } from "@/config/node-components";
import { AddNodeButton } from "./add-node-button";


export const EditorLoading =() =>{
  return  <LoadingView message="Loading editor.."/>
}

export const EdditorError =() =>{
    return <ErrorView message="Error loading editor"/>
}




export const Editor =({workflowId}:{workflowId: string}) =>{
    const {data: workflow} = useSuspenceWorkflow(workflowId);
    const [nodes, setNodes] = useState<Node []>(workflow.nodes);
    const [edges, setEdges] = useState<Edge []>(workflow.edges);

     const onNodesChange = useCallback(
    (changes:NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

    return(
        
  <div className="size-full bg-background">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeComponents}
      fitView
      proOptions={{ hideAttribution: true }}
    >
      <Panel position='top-right'>
        <AddNodeButton/>
      </Panel>
      <Background
        color="#222" gap={28} size={1}
      />
      <Controls />
      <MiniMap
        nodeColor={(node) =>
          node.selected
            ? "var(--primary)"
            : "var(--muted-foreground)"
        }
        maskColor="oklch(0 0 0 / 0.4)"
      />
    </ReactFlow>
  </div>
);
    
}
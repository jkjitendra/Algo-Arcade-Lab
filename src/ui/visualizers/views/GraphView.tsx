'use client';

import React, { useMemo } from 'react';
import { GraphState, GraphNodeState, GraphEdgeState } from '@/core/events/events';

interface GraphViewProps {
  graphState: GraphState;
  phase?: string;
  width?: number;
  height?: number;
}

// Fallback layout when x/y not provided
const generateCircularLayout = (nodes: GraphNodeState[], width: number, height: number) => {
  const radius = Math.min(width, height) * 0.35;
  const centerX = width / 2;
  const centerY = height / 2;

  return nodes.map((node, index) => {
    if (node.x !== undefined && node.y !== undefined) return node;

    const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2;
    return {
      ...node,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
};

export function GraphView({
  graphState,
  phase,
  width = 600,
  height = 400
}: GraphViewProps) {
  const { nodes: rawNodes, edges, isDirected, isWeighted, queue, stack, distances, message, unionFind } = graphState;

  // Apply layout if needed
  const nodes = useMemo(() =>
    generateCircularLayout(rawNodes, width, height),
    [rawNodes, width, height]
  );

  // Node visualization helpers
  const getNodeColor = (state?: string) => {
    switch (state) {
      case 'processing': return 'fill-yellow-500/20 stroke-yellow-500 text-yellow-500';
      case 'visited': return 'fill-[var(--color-primary-500)]/20 stroke-[var(--color-primary-500)] text-[var(--color-primary-500)]';
      case 'current': return 'fill-green-500/20 stroke-green-500 text-green-500';
      case 'finished': return 'fill-gray-500/20 stroke-gray-500 text-gray-400';
      case 'path': return 'fill-blue-500/20 stroke-blue-500 text-blue-500';
      case 'source': return 'fill-violet-500/20 stroke-violet-500 text-violet-500';
      case 'target': return 'fill-red-500/20 stroke-red-500 text-red-500';
      default: return 'fill-[var(--bg-secondary)] stroke-[var(--border-primary)] text-[var(--text-primary)]';
    }
  };

  const getEdgeColor = (state?: string) => {
    switch (state) {
      case 'current': return 'stroke-green-500 stroke-[3px]';
      case 'visited': return 'stroke-[var(--color-primary-500)] stroke-[2px]';
      case 'path': return 'stroke-blue-500 stroke-[3px]';
      case 'mst': return 'stroke-green-500 stroke-[3px]';
      case 'back-edge': return 'stroke-red-500 stroke-[2px] dashed';
      default: return 'stroke-[var(--border-secondary)] stroke-[1.5px]';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Canvas Area */}
      <div className="relative rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] overflow-hidden">
        {phase && (
          <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded text-xs font-mono text-[var(--text-secondary)]">
            {phase}
          </div>
        )}

        {message && (
          <div className="absolute bottom-3 left-3 right-3 z-10 px-3 py-2 bg-[var(--bg-secondary)]/90 backdrop-blur-sm border border-[var(--border-primary)] rounded text-sm text-[var(--text-primary)] shadow-sm">
            {message}
          </div>
        )}

        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[400px]"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--border-secondary)" />
            </marker>
            <marker
              id="arrowhead-visited"
              markerWidth="10"
              markerHeight="7"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-primary-500)" />
            </marker>
            <marker
              id="arrowhead-path"
              markerWidth="10"
              markerHeight="7"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
            <marker
              id="arrowhead-current"
              markerWidth="10"
              markerHeight="7"
              refX="18"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge, i) => {
            const source = nodes.find(n => n.id === edge.source);
            const target = nodes.find(n => n.id === edge.target);
            if (!source || !target || source.x === undefined || source.y === undefined || target.x === undefined || target.y === undefined) return null;

            const edgeClass = getEdgeColor(edge.state);
            let markerEnd = isDirected ? "url(#arrowhead)" : undefined;
            if (isDirected) {
              if (edge.state === 'visited') markerEnd = "url(#arrowhead-visited)";
              if (edge.state === 'path') markerEnd = "url(#arrowhead-path)";
              if (edge.state === 'current') markerEnd = "url(#arrowhead-current)";
            }

            return (
              <g key={`edge-${i}`}>
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  className={`transition-all duration-300 ${edgeClass}`}
                  markerEnd={markerEnd}
                  strokeDasharray={edge.state === 'back-edge' ? '5,5' : undefined}
                />
                {isWeighted && edge.weight !== undefined && (
                  <g>
                    <circle
                      cx={(source.x + target.x) / 2}
                      cy={(source.y + target.y) / 2}
                      r="8"
                      className="fill-[var(--bg-secondary)] stroke-[var(--border-primary)] stroke-1"
                    />
                    <text
                      x={(source.x + target.x) / 2}
                      y={(source.y + target.y) / 2}
                      dy="3"
                      textAnchor="middle"
                      className="text-[10px] font-medium fill-[var(--text-secondary)] select-none"
                    >
                      {edge.weight}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            if (node.x === undefined || node.y === undefined) return null;
            const colorClass = getNodeColor(node.state);

            return (
              <g key={node.id} className="transition-all duration-500">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="14"
                  className={`stroke-2 transition-colors duration-300 ${colorClass}`}
                />
                <text
                  x={node.x}
                  y={node.y}
                  dy="4"
                  textAnchor="middle"
                  className={`text-xs font-bold transition-colors duration-300 pointer-events-none select-none ${colorClass.split(' ')[2]}`}
                >
                  {node.label || node.id}
                </text>
                {/* Distance Label for Dijkstra/Bellman-Ford */}
                {node.distance !== undefined && (
                  <text
                    x={node.x}
                    y={node.y - 18}
                    textAnchor="middle"
                    className="text-[10px] fill-[var(--text-tertiary)]"
                  >
                    d:{node.distance}
                  </text>
                )}
                {/* Component/Rank Label */}
                {node.componentId !== undefined && (
                  <text
                    x={node.x}
                    y={node.y + 24}
                    textAnchor="middle"
                    className="text-[10px] fill-[var(--text-tertiary)]"
                  >
                    id:{node.componentId}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Auxiliary Information Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Queue / Stack Visualization */}
        {(queue || stack) && (
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <div className="text-xs text-[var(--text-tertiary)] mb-2 uppercase tracking-wider font-semibold">
              {queue ? 'Queue' : 'Stack'}
            </div>
            <div className="flex flex-wrap gap-2">
              {(queue || stack)?.map((id, i) => (
                <div key={i} className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] rounded text-sm font-mono text-[var(--text-primary)]">
                  {id}
                </div>
              ))}
              {(queue || stack)?.length === 0 && <span className="text-sm text-[var(--text-tertiary)] italic">Empty</span>}
            </div>
          </div>
        )}

        {/* Distance Table */}
        {distances && (
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] max-h-40 overflow-y-auto">
            <div className="text-xs text-[var(--text-tertiary)] mb-2 uppercase tracking-wider font-semibold">
              Distances
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {Object.entries(distances).map(([id, dist]) => (
                <div key={id} className="flex justify-between px-2 py-1 bg-[var(--bg-tertiary)] rounded">
                  <span className="font-mono text-[var(--text-secondary)]">{id}:</span>
                  <span className="font-bold text-[var(--text-primary)]">{dist}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Union-Find State */}
        {unionFind && (
          <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <div className="text-xs text-[var(--text-tertiary)] mb-2 uppercase tracking-wider font-semibold">
              Union-Find
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              {Object.keys(unionFind.parents).map(nodeId => (
                <div key={nodeId} className="flex flex-col items-center p-1 bg-[var(--bg-tertiary)] rounded min-w-[30px]">
                  <span className="text-[var(--text-primary)] font-bold">{nodeId}</span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">p: {unionFind.parents[nodeId]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

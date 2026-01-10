"use client";

import { RecursionData, RecursionNode } from "@/core/events/events";
import { useEffect, useRef, useState } from "react";

interface RecursionTreeViewProps {
  recursionData: RecursionData;
}

interface TreeNode extends RecursionNode {
  x: number;
  y: number;
  width: number;
  childrenNodes: TreeNode[];
}

export function RecursionTreeView({ recursionData }: RecursionTreeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [treeLayout, setTreeLayout] = useState<{ nodes: TreeNode[]; edges: any[]; width: number; height: number } | null>(null);

  // Helper to build the tree structure from flat list
  const buildTree = (nodes: RecursionNode[], rootId?: string): TreeNode | null => {
    if (!rootId) return null;
    const root = nodes.find(n => n.id === rootId);
    if (!root) return null;

    const childrenNodes = (root.children || [])
      .map(childId => buildTree(nodes, childId))
      .filter((n): n is TreeNode => n !== null);

    return {
      ...root,
      x: 0,
      y: 0,
      width: 0,
      childrenNodes
    };
  }

  // Calculate layout
  const calculateLayout = (root: TreeNode) => {
    const nodeSize = 60;
    const levelHeight = 80;
    const nodeGap = 20;

    // Post-order traversal to calculate width needed
    const calculateWidths = (node: TreeNode) => {
      if (node.childrenNodes.length === 0) {
        node.width = nodeSize + nodeGap;
        return;
      }

      let totalWidth = 0;
      node.childrenNodes.forEach(child => {
        calculateWidths(child);
        totalWidth += child.width;
      });
      node.width = Math.max(nodeSize + nodeGap, totalWidth);
    };

    // Pre-order traversal to assign coordinates
    const assignCoordinates = (node: TreeNode, x: number, y: number) => {
      node.x = x + node.width / 2;
      node.y = y;

      let currentX = x;
      node.childrenNodes.forEach(child => {
        assignCoordinates(child, currentX, y + levelHeight);
        currentX += child.width;
      });
    };

    calculateWidths(root);
    assignCoordinates(root, 0, 40);

    return root;
  };

  useEffect(() => {
    if (!recursionData.rootId || !recursionData.nodes.length) return;

    const root = buildTree(recursionData.nodes, recursionData.rootId);
    if (root) {
      const layoutRoot = calculateLayout(root);

      // Flatten for rendering
      const flattenedNodes: TreeNode[] = [];
      const edges: { from: { x: number, y: number }, to: { x: number, y: number }, id: string }[] = [];

      const flatten = (node: TreeNode) => {
        flattenedNodes.push(node);
        node.childrenNodes.forEach(child => {
          edges.push({
            from: { x: node.x, y: node.y },
            to: { x: child.x, y: child.y },
            id: `${node.id}-${child.id}`
          });
          flatten(child);
        });
      };

      flatten(layoutRoot);
      setTreeLayout({
        nodes: flattenedNodes,
        edges,
        width: layoutRoot.width,
        height: (Math.max(...flattenedNodes.map(n => n.depth)) + 1) * 80 + 60
      });
    }
  }, [recursionData]);

  if (!treeLayout) return <div className="p-4 text-center text-gray-500">No recursion tree data</div>;

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[var(--text-primary)]">Recursion Tree</h3>
        <div className="text-sm text-[var(--text-secondary)]">{recursionData.message}</div>
      </div>

      <div className="relative" style={{ width: treeLayout.width, height: treeLayout.height }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {treeLayout.edges.map((edge) => (
            <line
              key={edge.id}
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              stroke="var(--border-secondary)"
              strokeWidth="2"
            />
          ))}
        </svg>

        {treeLayout.nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center
              transition-all duration-300
              ${node.status === 'active' ? 'scale-110 z-10' : ''}
            `}
            style={{ left: node.x, top: node.y }}
          >
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold border-2
                ${node.status === 'active' ? 'bg-[var(--color-primary-500)] text-white border-[var(--color-primary-600)]' :
                  node.status === 'completed' ? 'bg-[var(--color-accent-sorted)] text-white border-[var(--color-accent-sorted)]' :
                    node.status === 'pruned' ? 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)] border-[var(--border-secondary)] opacity-60' :
                      'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-primary)]'}
              `}
            >
              {node.result !== undefined ? node.result : node.args}
            </div>
            {/* Label/Function Name */}
            <div className="text-[10px] mt-1 text-[var(--text-secondary)] max-w-[80px] truncate text-center bg-[var(--bg-tertiary)]/80 px-1 rounded">
              {node.label}
            </div>
            {/* Return Value Tooltipish */}
            {node.result !== undefined && (
              <div className="absolute -top-4 bg-[var(--color-accent-sorted)] text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                Ret: {node.result}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

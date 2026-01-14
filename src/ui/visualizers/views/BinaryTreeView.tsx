"use client";

import { TreeData, BinaryTreeNodeData } from "@/core/events/events";
import { useEffect, useState } from "react";

interface BinaryTreeViewProps {
  treeData: TreeData;
}

interface TreeNodeLayout extends BinaryTreeNodeData {
  x: number;
  y: number;
  width: number;
  leftChild?: TreeNodeLayout;
  rightChild?: TreeNodeLayout;
}

export function BinaryTreeView({ treeData }: BinaryTreeViewProps) {
  const [layout, setLayout] = useState<{
    nodes: TreeNodeLayout[];
    edges: { from: { x: number; y: number }; to: { x: number; y: number }; color?: string }[];
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!treeData.rootId || !treeData.nodes.length) return;

    const nodeMap = new Map<string, BinaryTreeNodeData>();
    treeData.nodes.forEach((n) => nodeMap.set(n.id, n));

    const nodeSize = 44;
    const levelHeight = 70;
    const nodeGap = 16;

    // Build tree structure recursively
    const buildTree = (nodeId: string): TreeNodeLayout | null => {
      const node = nodeMap.get(nodeId);
      if (!node) return null;

      const leftChild = node.left ? buildTree(node.left) || undefined : undefined;
      const rightChild = node.right ? buildTree(node.right) || undefined : undefined;

      // Calculate width: sum of children widths, or just node size if leaf
      let width = nodeSize + nodeGap;
      if (leftChild || rightChild) {
        width = (leftChild?.width || nodeSize / 2 + nodeGap / 2) +
          (rightChild?.width || nodeSize / 2 + nodeGap / 2);
      }

      return {
        ...node,
        x: 0,
        y: 0,
        width,
        leftChild,
        rightChild,
      };
    };

    // Assign coordinates to nodes
    const assignCoordinates = (node: TreeNodeLayout, x: number, y: number) => {
      node.x = x + node.width / 2;
      node.y = y;

      const leftWidth = node.leftChild?.width || 0;
      const rightWidth = node.rightChild?.width || 0;

      if (node.leftChild) {
        assignCoordinates(node.leftChild, x, y + levelHeight);
      }
      if (node.rightChild) {
        assignCoordinates(node.rightChild, x + (leftWidth || node.width / 2), y + levelHeight);
      }
    };

    // Flatten tree nodes and collect edges
    const flattenNodes: TreeNodeLayout[] = [];
    const edges: { from: { x: number; y: number }; to: { x: number; y: number }; color?: string }[] = [];

    const flatten = (node: TreeNodeLayout) => {
      flattenNodes.push(node);
      if (node.leftChild) {
        const isHighlighted = treeData.highlightedEdges?.some(
          (e) => e.from === node.id && e.to === node.leftChild!.id
        );
        edges.push({
          from: { x: node.x, y: node.y },
          to: { x: node.leftChild.x, y: node.leftChild.y },
          color: isHighlighted
            ? treeData.highlightedEdges?.find((e) => e.from === node.id && e.to === node.leftChild!.id)?.color
            : undefined,
        });
        flatten(node.leftChild);
      }
      if (node.rightChild) {
        const isHighlighted = treeData.highlightedEdges?.some(
          (e) => e.from === node.id && e.to === node.rightChild!.id
        );
        edges.push({
          from: { x: node.x, y: node.y },
          to: { x: node.rightChild.x, y: node.rightChild.y },
          color: isHighlighted
            ? treeData.highlightedEdges?.find((e) => e.from === node.id && e.to === node.rightChild!.id)?.color
            : undefined,
        });
        flatten(node.rightChild);
      }
    };

    const root = buildTree(treeData.rootId);
    if (root) {
      assignCoordinates(root, 0, 40);
      flatten(root);

      const maxDepth = Math.max(...flattenNodes.map((n) => n.y));
      setLayout({
        nodes: flattenNodes,
        edges,
        width: root.width,
        height: maxDepth + nodeSize + 20,
      });
    }
  }, [treeData]);

  if (!layout) {
    return (
      <div className="p-4 text-center text-[var(--text-secondary)]">
        No tree data to display
      </div>
    );
  }

  const nodeSize = 44;

  const getNodeColor = (node: TreeNodeLayout): string => {
    if (node.color === "red") return "bg-red-500 text-white";
    if (node.color === "black") return "bg-gray-800 text-white";

    switch (node.highlight) {
      case "current":
        return "bg-[var(--color-primary-500)] text-white ring-2 ring-[var(--color-primary-300)] scale-110";
      case "visited":
        return "bg-[var(--color-accent-sorted)] text-white";
      case "found":
        return "bg-green-500 text-white ring-2 ring-green-300";
      case "ancestor":
        return "bg-purple-500 text-white";
      case "descendant":
        return "bg-cyan-500 text-white";
      case "path":
        return "bg-amber-500 text-white";
      case "comparing":
        return "bg-orange-500 text-white";
      case "inserted":
        return "bg-emerald-500 text-white ring-2 ring-emerald-300";
      case "deleted":
        return "bg-red-500 text-white opacity-60";
      default:
        return "bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-primary)]";
    }
  };

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[var(--text-primary)]">Binary Tree</h3>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          {treeData.phase && (
            <span>
              Phase: <span className="text-cyan-400 font-medium">{treeData.phase}</span>
            </span>
          )}
          {treeData.traversalOrder && treeData.traversalOrder.length > 0 && (
            <span>
              Order: <span className="text-[var(--color-primary-500)] font-medium">
                [{treeData.traversalOrder.join(", ")}]
              </span>
            </span>
          )}
        </div>
      </div>

      {treeData.message && (
        <div className="text-sm text-[var(--text-secondary)] mb-4 bg-[var(--bg-secondary)] rounded-lg px-3 py-2">
          {treeData.message}
        </div>
      )}

      <div
        className="relative mx-auto"
        style={{ width: layout.width, height: layout.height, minHeight: 150 }}
      >
        {/* SVG for edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {layout.edges.map((edge, idx) => (
            <line
              key={idx}
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              stroke={edge.color || "var(--border-secondary)"}
              strokeWidth={edge.color ? "3" : "2"}
              className="transition-all duration-300"
            />
          ))}
        </svg>

        {/* Nodes */}
        {layout.nodes.map((node) => (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: node.x, top: node.y }}
          >
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full flex items-center justify-center text-sm font-bold border-2 shadow-md transition-all duration-300 ${getNodeColor(node)}`}
                style={{ width: nodeSize, height: nodeSize }}
              >
                {node.value}
              </div>
              {/* Show balance factor for AVL trees */}
              {node.balanceFactor !== undefined && (
                <span className="absolute -top-2 -right-2 text-[9px] bg-blue-500 text-white px-1 rounded-full">
                  {node.balanceFactor > 0 ? `+${node.balanceFactor}` : node.balanceFactor}
                </span>
              )}
              {/* Show height if present */}
              {node.height !== undefined && (
                <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                  h={node.height}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[var(--color-primary-500)]" />
          <span className="text-[var(--text-secondary)]">Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[var(--color-accent-sorted)]" />
          <span className="text-[var(--text-secondary)]">Visited</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-[var(--text-secondary)]">Path</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-[var(--text-secondary)]">Found</span>
        </div>
      </div>
    </div>
  );
}

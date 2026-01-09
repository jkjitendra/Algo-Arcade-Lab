"use client";

import { LinkedListData, LinkedListNode } from "@/core/events/events";
import { useEffect, useState, useRef, useMemo } from "react";

interface LinkedListViewProps {
  linkedListData: LinkedListData;
  phase?: string;
}

export function LinkedListView({ linkedListData, phase }: LinkedListViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger animation on data change
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [linkedListData]);

  const getHighlightColor = (highlight?: LinkedListNode['highlight']): string => {
    switch (highlight) {
      case 'current':
        return 'bg-yellow-500/30 border-yellow-400 ring-2 ring-yellow-400/50';
      case 'slow':
        return 'bg-blue-500/30 border-blue-400 ring-2 ring-blue-400/50';
      case 'fast':
        return 'bg-purple-500/30 border-purple-400 ring-2 ring-purple-400/50';
      case 'match':
        return 'bg-green-500/30 border-green-400 ring-2 ring-green-400/50';
      case 'visited':
        return 'bg-gray-500/30 border-gray-400';
      case 'prev':
        return 'bg-orange-500/30 border-orange-400 ring-2 ring-orange-400/50';
      case 'next':
        return 'bg-cyan-500/30 border-cyan-400 ring-2 ring-cyan-400/50';
      case 'head':
        return 'bg-emerald-500/30 border-emerald-400 ring-2 ring-emerald-400/50';
      case 'tail':
        return 'bg-rose-500/30 border-rose-400 ring-2 ring-rose-400/50';
      case 'middle':
        return 'bg-amber-500/30 border-amber-400 ring-2 ring-amber-400/50';
      case 'target':
        return 'bg-pink-500/30 border-pink-400 ring-2 ring-pink-400/50';
      case 'cycle':
        return 'bg-red-500/30 border-red-400 ring-2 ring-red-400/50 animate-pulse';
      default:
        return 'bg-slate-700/50 border-slate-500';
    }
  };

  const getPointerColor = (color?: string): string => {
    switch (color) {
      case 'blue':
        return 'text-blue-400';
      case 'purple':
        return 'text-purple-400';
      case 'green':
        return 'text-green-400';
      case 'orange':
        return 'text-orange-400';
      case 'red':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  // Build ordered nodes for rendering
  const orderedNodes = useMemo(() => {
    const { nodes, headId, listType } = linkedListData;
    if (!nodes.length) return [];

    const nodeMap = new Map<number, LinkedListNode>();
    nodes.forEach(node => nodeMap.set(node.id, node));

    const ordered: LinkedListNode[] = [];
    const visited = new Set<number>();

    let currentId = headId;
    while (currentId != null && !visited.has(currentId)) {
      const node = nodeMap.get(currentId);
      if (node) {
        visited.add(currentId);
        ordered.push(node);
        currentId = node.nextId ?? null;
      } else {
        break;
      }
    }

    // For circular lists, mark if we stopped because of cycle
    const isCircular = listType === 'circular' || listType === 'circular-doubly';

    return { ordered, isCircular, lastPointsToHead: isCircular && currentId === headId };
  }, [linkedListData]);

  // Render a single node
  const renderNode = (node: LinkedListNode, index: number, isLast: boolean) => {
    const highlightClass = getHighlightColor(node.highlight);
    const isAnimating = linkedListData.animatingNodeId === node.id;
    const animationClass = isAnimating ? getAnimationClass(linkedListData.animating) : '';

    // Find pointers pointing to this node
    const pointersHere = linkedListData.pointers?.filter(p => p.nodeId === node.id) || [];

    return (
      <div
        key={`${node.id}-${animationKey}`}
        className={`flex items-center ${animationClass}`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Node Box */}
        <div className="relative flex flex-col items-center">
          {/* Pointer labels above node */}
          {pointersHere.length > 0 && (
            <div className="absolute -top-6 flex gap-1">
              {pointersHere.map((ptr, i) => (
                <span
                  key={i}
                  className={`text-xs font-bold px-1 py-0.5 rounded ${getPointerColor(ptr.color)}`}
                >
                  {ptr.label}
                </span>
              ))}
            </div>
          )}

          {/* Head/Tail indicators */}
          {node.isHead && (
            <span className="absolute -top-4 text-[10px] text-emerald-400 font-semibold">
              HEAD
            </span>
          )}
          {node.isTail && !node.isHead && (
            <span className="absolute -top-4 text-[10px] text-rose-400 font-semibold">
              TAIL
            </span>
          )}

          {/* The Node */}
          <div
            className={`
              relative flex items-center justify-center
              w-12 h-12 rounded-lg border-2
              font-mono font-bold text-white text-lg
              transition-all duration-300 ease-out
              ${highlightClass}
            `}
          >
            {node.value}

            {/* Doubly linked list - prev pointer visual */}
            {(linkedListData.listType === 'doubly' || linkedListData.listType === 'circular-doubly') &&
              node.prevId !== null && index > 0 && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2">
                  <div className="w-2.5 h-0.5 bg-slate-400"></div>
                </div>
              )}
          </div>

          {/* Cycle indicator */}
          {linkedListData.cycleStartId === node.id && linkedListData.hasCycle && (
            <span className="absolute -bottom-5 text-[10px] text-red-400 font-semibold animate-pulse">
              CYCLE START
            </span>
          )}

          {/* Meeting point indicator */}
          {linkedListData.meetingPointId === node.id && (
            <span className="absolute -bottom-5 text-[10px] text-purple-400 font-semibold">
              MEET
            </span>
          )}

          {/* Intersection point indicator */}
          {linkedListData.intersectionId === node.id && (
            <span className="absolute -bottom-5 text-[10px] text-green-400 font-semibold">
              INTERSECT
            </span>
          )}
        </div>

        {/* Arrow to next node */}
        {!isLast && (
          <div className="flex items-center mx-1">
            <div className="w-6 h-0.5 bg-slate-400"></div>
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-slate-400"></div>
          </div>
        )}

        {/* Circular arrow back to head */}
        {isLast && typeof orderedNodes === 'object' && 'lastPointsToHead' in orderedNodes && orderedNodes.lastPointsToHead && (
          <div className="flex items-center">
            <div className="relative ml-2">
              <svg width="50" height="40" viewBox="0 0 50 40" className="text-slate-400">
                <path
                  d="M 0 20 Q 25 20 25 5 Q 25 -10 -20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                />
                <polygon
                  points="-24,17 -16,20 -24,23"
                  fill="currentColor"
                  transform="rotate(-10, -20, 20)"
                />
              </svg>
              <span className="absolute -top-2 left-4 text-[9px] text-slate-400">to head</span>
            </div>
          </div>
        )}

        {/* Pending Node Overlay (for Insert at Position) */}
        {/* Pending Node Overlay (for Insert at Position) */}
        {linkedListData.animating === 'pending-insert' && linkedListData.pendingNode && (
          <>
            {/* Case 1: Inserting in middle (visualize under the NEXT node) */}
            {linkedListData.pendingNextNodeId === node.id && (
              <div
                className="absolute top-28 left-1/2 -translate-x-1/2 flex flex-col items-center animate-[fadeInScale_0.3s_ease-out] z-20 pointer-events-none"
              >
                {/* Visualizer: Both 2 and 99 point to 3 (next node) */}
                {/* Upward Arrow from 99 to 3 */}
                <div className="flex flex-col items-center mb-1">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-yellow-400"></div>
                  <div className="w-0.5 h-12 bg-yellow-400"></div>
                </div>

                {/* The Pending Node (99) */}
                <div className="relative pointer-events-auto">
                  <div className={`
                       flex items-center justify-center
                       w-12 h-12 rounded-lg border-2
                       font-mono font-bold text-white text-lg
                       bg-yellow-500/30 border-yellow-400 ring-2 ring-yellow-400/50
                       shadow-[0_0_15px_rgba(250,204,21,0.3)]
                   `}>
                    {linkedListData.pendingNode.value}
                  </div>
                </div>
                <span className="text-[10px] text-yellow-400 mt-1 font-semibold">New Node</span>
              </div>
            )}

            {/* Case 2: Inserting at Tail (visualize after the LAST node) */}
            {linkedListData.pendingNextNodeId === null &&
              linkedListData.pendingInsertAfterNodeId === node.id && (
                <div
                  className="absolute top-28 left-full translate-x-4 flex flex-col items-center animate-[fadeInScale_0.3s_ease-out] z-20 pointer-events-none"
                >
                  {/* Angled arrow pointing to space after tail */}
                  <div className="flex flex-col items-center mb-1 -rotate-12 origin-bottom">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-yellow-400"></div>
                    <div className="w-0.5 h-12 bg-yellow-400"></div>
                  </div>

                  {/* The Pending Node */}
                  <div className={`
                    flex items-center justify-center
                    w-12 h-12 rounded-lg border-2
                    font-mono font-bold text-white text-lg
                    bg-yellow-500/30 border-yellow-400 ring-2 ring-yellow-400/50
                    shadow-[0_0_15px_rgba(250,204,21,0.3)]
                    pointer-events-auto
                `}>
                    {linkedListData.pendingNode.value}
                  </div>
                  <span className="text-[10px] text-yellow-400 mt-1 font-semibold">New Tail</span>
                </div>
              )}
          </>
        )}
      </div>
    );
  };

  const getAnimationClass = (animating?: LinkedListData['animating']): string => {
    switch (animating) {
      case 'insert':
        return 'animate-[fadeInScale_0.3s_ease-out]';
      case 'delete':
        return 'animate-[fadeOut_0.3s_ease-out]';
      case 'reverse':
        return 'animate-[slideRight_0.3s_ease-out]';
      case 'traverse':
        return 'animate-[pulse_0.5s_ease-in-out]';
      default:
        return 'animate-[fadeIn_0.2s_ease-out]';
    }
  };

  // Render second list for merge operations
  const renderSecondList = () => {
    if (!linkedListData.secondList?.length) return null;

    const nodeMap = new Map<number, LinkedListNode>();
    linkedListData.secondList.forEach(node => nodeMap.set(node.id, node));

    const ordered: LinkedListNode[] = [];
    const visited = new Set<number>();
    let currentId = linkedListData.secondHeadId;

    while (currentId != null && !visited.has(currentId)) {
      const node = nodeMap.get(currentId);
      if (node) {
        visited.add(currentId);
        ordered.push(node);
        currentId = node.nextId ?? null;
      } else {
        break;
      }
    }

    return (
      <div className="mt-4">
        <span className="text-xs text-slate-400 mb-2 block">List 2:</span>
        <div className="flex items-center flex-wrap gap-y-4">
          {ordered.map((node, index) => renderNode(node, index, index === ordered.length - 1))}
          {ordered.length === 0 && (
            <span className="text-slate-500 italic text-sm">Empty</span>
          )}
        </div>
      </div>
    );
  };

  // Render result list for merge operations
  const renderResultList = () => {
    if (!linkedListData.resultList?.length) return null;

    const nodeMap = new Map<number, LinkedListNode>();
    linkedListData.resultList.forEach(node => nodeMap.set(node.id, node));

    const ordered: LinkedListNode[] = [];
    const visited = new Set<number>();
    let currentId = linkedListData.resultHeadId;

    while (currentId != null && !visited.has(currentId)) {
      const node = nodeMap.get(currentId);
      if (node) {
        visited.add(currentId);
        ordered.push(node);
        currentId = node.nextId ?? null;
      } else {
        break;
      }
    }

    return (
      <div className="mt-4 pt-4 border-t border-slate-700">
        <span className="text-xs text-green-400 mb-2 block">Result:</span>
        <div className="flex items-center flex-wrap gap-y-4">
          {ordered.map((node, index) => renderNode(node, index, index === ordered.length - 1))}
          {ordered.length === 0 && (
            <span className="text-slate-500 italic text-sm">Empty</span>
          )}
        </div>
      </div>
    );
  };

  const nodes = typeof orderedNodes === 'object' && 'ordered' in orderedNodes
    ? orderedNodes.ordered
    : [];

  return (
    <div
      ref={containerRef}
      className="relative p-6 bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-300">
            {linkedListData.listType.charAt(0).toUpperCase() + linkedListData.listType.slice(1).replace('-', ' ')} Linked List
          </span>
          <span className="text-xs text-slate-500">
            ({nodes.length} node{nodes.length !== 1 ? 's' : ''})
          </span>
        </div>
        {phase && (
          <span className="text-xs text-slate-400 px-2 py-1 bg-slate-800 rounded">
            {phase}
          </span>
        )}
      </div>

      {/* Main List */}
      <div className="flex items-center flex-wrap gap-y-8 pt-4 pb-32">
        {nodes.map((node, index) => renderNode(node, index, index === nodes.length - 1))}
        {nodes.length === 0 && (
          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-lg">∅</span>
            <span className="italic text-sm">Empty List</span>
          </div>
        )}
      </div>

      {/* Second List (for merge operations) */}
      {linkedListData.secondList && renderSecondList()}

      {/* Result List (for merge operations) */}
      {linkedListData.resultList && renderResultList()}

      {/* Message */}
      {linkedListData.message && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-sm text-slate-300">{linkedListData.message}</p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-400"></div>
            <span className="text-slate-400">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-500/30 border border-blue-400"></div>
            <span className="text-slate-400">Slow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-purple-500/30 border border-purple-400"></div>
            <span className="text-slate-400">Fast</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-500/30 border border-green-400"></div>
            <span className="text-slate-400">Match</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-500/30 border border-red-400"></div>
            <span className="text-slate-400">Cycle</span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        @keyframes slideRight {
          from {
            transform: translateX(-10px);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

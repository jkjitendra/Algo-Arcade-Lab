"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { AlgorithmParams } from "./AlgorithmParams";
import { AlgorithmParameter } from "@/core/algorithms/IAlgorithm";
import { GraphInput, GraphNode, GraphEdge } from "@/core/models";

// Preset Graphs
const PRESETS: Record<string, GraphInput> = {
  simple_undirected: {
    isDirected: false,
    isWeighted: false,
    nodes: [
      { id: 'A', label: 'A', x: 100, y: 100 },
      { id: 'B', label: 'B', x: 300, y: 100 },
      { id: 'C', label: 'C', x: 100, y: 300 },
      { id: 'D', label: 'D', x: 300, y: 300 },
      { id: 'E', label: 'E', x: 500, y: 200 },
    ],
    edges: [
      { source: 'A', target: 'B', weight: 1 },
      { source: 'A', target: 'C', weight: 1 },
      { source: 'B', target: 'D', weight: 1 },
      { source: 'C', target: 'D', weight: 1 },
      { source: 'B', target: 'E', weight: 1 },
      { source: 'D', target: 'E', weight: 1 },
    ]
  },
  simple_directed: {
    isDirected: true,
    isWeighted: false,
    nodes: [
      { id: '0', label: '0', x: 100, y: 200 },
      { id: '1', label: '1', x: 250, y: 100 },
      { id: '2', label: '2', x: 250, y: 300 },
      { id: '3', label: '3', x: 400, y: 200 },
    ],
    edges: [
      { source: '0', target: '1', weight: 1 },
      { source: '0', target: '2', weight: 1 },
      { source: '1', target: '2', weight: 1 },
      { source: '1', target: '3', weight: 1 },
      { source: '2', target: '3', weight: 1 },
    ]
  },
  weighted: {
    isDirected: false,
    isWeighted: true,
    nodes: [
      { id: 'S', label: 'Start', x: 50, y: 200 },
      { id: 'A', label: 'A', x: 200, y: 100 },
      { id: 'B', label: 'B', x: 200, y: 300 },
      { id: 'T', label: 'Target', x: 350, y: 200 },
    ],
    edges: [
      { source: 'S', target: 'A', weight: 4 },
      { source: 'S', target: 'B', weight: 2 },
      { source: 'A', target: 'B', weight: 1 },
      { source: 'A', target: 'T', weight: 5 },
      { source: 'B', target: 'T', weight: 8 },
    ]
  },
  complex: {
    isDirected: true,
    isWeighted: true,
    nodes: [
      { id: 'A', label: 'A', x: 200, y: 50 },
      { id: 'B', label: 'B', x: 100, y: 150 },
      { id: 'C', label: 'C', x: 300, y: 150 },
      { id: 'D', label: 'D', x: 50, y: 250 },
      { id: 'E', label: 'E', x: 200, y: 250 },
      { id: 'F', label: 'F', x: 350, y: 250 },
    ],
    edges: [
      { source: 'A', target: 'B', weight: 2 },
      { source: 'A', target: 'C', weight: 4 },
      { source: 'B', target: 'D', weight: 1 },
      { source: 'B', target: 'E', weight: 7 },
      { source: 'C', target: 'E', weight: 3 },
      { source: 'E', target: 'F', weight: 2 },
      { source: 'D', target: 'F', weight: 5 },
    ]
  }
};

interface GraphInputEditorProps {
  value: any; // GraphInput or Array (if fallback)
  onChange: (value: GraphInput) => void;
  onApply: () => void;
  algorithmParams?: React.ReactNode; // Can be used for custom rendering
  parameters?: AlgorithmParameter[]; // Raw parameters to hydrate
  paramValues?: Record<string, number | string>;
  onParamsChange?: (values: Record<string, number | string>) => void;
  algorithmId: string;
}

export function GraphInputEditor({
  value,
  onChange,
  onApply,
  parameters,
  paramValues,
  onParamsChange,
  algorithmId
}: GraphInputEditorProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('simple_undirected');
  const [hydratedParameters, setHydratedParameters] = useState<AlgorithmParameter[]>([]);

  // Initialize or Update Input based on Preset
  useEffect(() => {
    // If value is not a valid graph input (e.g. empty array), load preset
    if (!value || Array.isArray(value)) {
      onChange(PRESETS[selectedPreset]);
    }
  }, [value, selectedPreset, onChange]);

  // Hydrate Parameters with Node Options
  useEffect(() => {
    if (!parameters || !value || Array.isArray(value)) return;

    const inputFn = value as GraphInput;
    const nodes = inputFn.nodes || [];
    const nodeOptions = nodes.map(n => ({ value: n.id, label: n.label || n.id }));

    const hydrated = parameters.map(p => {
      if (p.type === 'select' && (p.id === 'startNode' || p.id === 'targetNode' || p.id === 'root')) {
        return {
          ...p,
          options: nodeOptions
        };
      }
      return p;
    });

    setHydratedParameters(hydrated);
  }, [parameters, value]);


  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPreset = e.target.value;
    setSelectedPreset(newPreset);
    onChange(PRESETS[newPreset]);

    // Reset Start Node if it becomes invalid? 
    // AlgorithmParams handles value mapping, but we might want to reset to first node.
    if (paramValues && onParamsChange && PRESETS[newPreset].nodes.length > 0) {
      const firstNode = PRESETS[newPreset].nodes[0].id;
      onParamsChange({ ...paramValues, startNode: firstNode, targetNode: PRESETS[newPreset].nodes[PRESETS[newPreset].nodes.length - 1].id });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          Graph Input
        </label>
        <div className="flex bg-[var(--bg-secondary)] rounded-lg p-1 border border-[var(--border-primary)]">
          <select
            value={selectedPreset}
            onChange={handlePresetChange}
            className="bg-transparent text-xs text-[var(--text-secondary)] focus:outline-none"
          >
            <option value="simple_undirected">Simple Undirected</option>
            <option value="simple_directed">Simple Directed</option>
            <option value="weighted">Weighted</option>
            <option value="complex">Complex</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-3 space-y-2">
        <div className="text-xs text-[var(--text-secondary)] flex justify-between">
          <span>Nodes: {(value as GraphInput)?.nodes?.length || 0}</span>
          <span>Edges: {(value as GraphInput)?.edges?.length || 0}</span>
        </div>
        <p className="text-xs text-[var(--text-tertiary)] italic">
          Select a preset to load a graph. Visual editor coming soon.
        </p>
      </div>

      {/* Render Hydrated Params */}
      {hydratedParameters.length > 0 && paramValues && onParamsChange && (
        <AlgorithmParams
          parameters={hydratedParameters}
          values={paramValues}
          onChange={onParamsChange}
        />
      )}

      <div className="flex gap-2">
        <Button
          onClick={onApply}
          className="flex-1 gap-2 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] hover:from-[var(--color-primary-600)] hover:to-[var(--color-secondary-600)] shadow-lg shadow-primary-500/20"
        >
          <Play className="h-4 w-4" />
          Run {algorithmId == 'bfs' ? 'BFS' : 'Algorithm'}
        </Button>
      </div>
    </div>
  );
}

'use client';

import { HashTableState, HashTableBucket } from '@/core/events/events';

interface HashTableViewProps {
  hashTableState: HashTableState;
  phase?: string;
}

export function HashTableView({ hashTableState, phase }: HashTableViewProps) {
  const {
    buckets,
    capacity,
    size,
    loadFactor,
    hashMethod,
    collisionMethod,
    currentKey,
    currentHash,
    probeSequence,
    currentProbeIndex,
    message,
    isRehashing,
    oldBuckets,
    newBuckets,
    migratingItem,
    hashCalculation,
    hashMap,
    foundPair,
    groups,
    prefixSums,
    windowData,
    sequence,
    longestLength,
  } = hashTableState;

  // Render hash calculation visualization
  const renderHashCalculation = () => {
    if (!hashCalculation) return null;
    return (
      <div className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="text-xs text-[var(--text-tertiary)] mb-1">Hash Calculation</div>
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 rounded bg-[var(--color-primary-500)]/20 text-[var(--color-primary-500)] font-mono">
            key = {hashCalculation.key}
          </span>
          <span className="text-[var(--text-secondary)]">→</span>
          <span className="text-sm text-[var(--text-secondary)] font-mono">
            {hashCalculation.formula}
          </span>
          <span className="text-[var(--text-secondary)]">=</span>
          <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 font-mono font-bold">
            {hashCalculation.result}
          </span>
        </div>
        {hashCalculation.step && (
          <div className="text-xs text-[var(--text-tertiary)] mt-2">{hashCalculation.step}</div>
        )}
      </div>
    );
  };

  // Render a single bucket (for chaining)
  const renderBucket = (bucket: HashTableBucket) => {
    const getBucketClass = () => {
      switch (bucket.highlight) {
        case 'active':
          return 'border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10';
        case 'probing':
          return 'border-yellow-500 bg-yellow-500/10';
        case 'found':
          return 'border-green-500 bg-green-500/10';
        case 'collision':
          return 'border-red-500 bg-red-500/10';
        case 'empty':
          return 'border-[var(--border-primary)] bg-[var(--bg-tertiary)]';
        default:
          return 'border-[var(--border-primary)] bg-[var(--bg-secondary)]';
      }
    };

    return (
      <div key={bucket.index} className="flex items-center gap-2">
        {/* Bucket index */}
        <div className="w-8 h-8 flex items-center justify-center rounded bg-[var(--bg-tertiary)] text-xs font-mono text-[var(--text-secondary)]">
          {bucket.index}
        </div>
        {/* Bucket content */}
        <div className={`flex-1 min-h-[40px] flex items-center gap-1 px-2 rounded-lg border ${getBucketClass()}`}>
          {bucket.items.length === 0 ? (
            <span className="text-xs text-[var(--text-tertiary)] italic">empty</span>
          ) : collisionMethod === 'chaining' ? (
            // Chaining visualization - linked list style
            bucket.items.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <div
                  className={`px-2 py-1 rounded text-sm font-mono ${item.highlight === 'active'
                      ? 'bg-[var(--color-primary-500)] text-white'
                      : item.highlight === 'found'
                        ? 'bg-green-500 text-white'
                        : item.highlight === 'collision'
                          ? 'bg-red-500/30 text-red-400'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                    }`}
                >
                  {item.key}:{item.value}
                </div>
                {idx < bucket.items.length - 1 && (
                  <span className="mx-1 text-[var(--text-tertiary)]">→</span>
                )}
              </div>
            ))
          ) : (
            // Open addressing - single item per bucket
            bucket.items[0] && (
              <div
                className={`px-2 py-1 rounded text-sm font-mono ${bucket.items[0].highlight === 'active'
                    ? 'bg-[var(--color-primary-500)] text-white'
                    : bucket.items[0].highlight === 'found'
                      ? 'bg-green-500 text-white'
                      : bucket.items[0].highlight === 'deleted'
                        ? 'bg-red-500/30 text-red-400 line-through'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                  }`}
              >
                {bucket.items[0].key}:{bucket.items[0].value}
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  // Render probe sequence for open addressing
  const renderProbeSequence = () => {
    if (!probeSequence || probeSequence.length === 0) return null;
    return (
      <div className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="text-xs text-[var(--text-tertiary)] mb-2">Probe Sequence</div>
        <div className="flex items-center gap-2 flex-wrap">
          {probeSequence.map((idx, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded font-mono text-sm ${currentProbeIndex !== undefined && i === currentProbeIndex
                    ? 'bg-[var(--color-primary-500)] text-white'
                    : i < (currentProbeIndex ?? 0)
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                  }`}
              >
                {idx}
              </div>
              {i < probeSequence.length - 1 && (
                <span className="mx-1 text-[var(--text-tertiary)]">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render hash map for applications (Two Sum, etc.)
  const renderHashMap = () => {
    if (!hashMap || hashMap.length === 0) return null;
    return (
      <div className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="text-xs text-[var(--text-tertiary)] mb-2">HashMap</div>
        <div className="flex flex-wrap gap-2">
          {hashMap.map((entry, i) => (
            <div
              key={i}
              className={`px-2 py-1 rounded text-sm font-mono ${entry.highlight
                  ? 'bg-[var(--color-primary-500)] text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                }`}
            >
              {entry.key}→{entry.value}
            </div>
          ))}
        </div>
        {foundPair && (
          <div className="mt-2 text-sm text-green-400">
            ✓ Found pair at indices: [{foundPair[0]}, {foundPair[1]}]
          </div>
        )}
      </div>
    );
  };

  // Render groups for Group Anagrams
  const renderGroups = () => {
    if (!groups || groups.length === 0) return null;
    return (
      <div className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="text-xs text-[var(--text-tertiary)] mb-2">Anagram Groups</div>
        <div className="space-y-2">
          {groups.map((group, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-xs font-mono text-[var(--text-tertiary)]">
                {group.key}
              </span>
              <span className="text-[var(--text-secondary)]">:</span>
              <div className="flex gap-1 flex-wrap">
                {group.items.map((item, j) => (
                  <span
                    key={j}
                    className={`px-2 py-0.5 rounded text-sm ${group.highlight
                        ? 'bg-[var(--color-primary-500)] text-white'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                      }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render prefix sums for Subarray Zero Sum
  const renderPrefixSums = () => {
    if (!prefixSums || prefixSums.length === 0) return null;
    return (
      <div className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="text-xs text-[var(--text-tertiary)] mb-2">Prefix Sums</div>
        <div className="flex gap-1 flex-wrap">
          {prefixSums.map((ps, i) => (
            <div
              key={i}
              className={`flex flex-col items-center px-2 py-1 rounded ${ps.highlight
                  ? 'bg-green-500/20 border border-green-500'
                  : 'bg-[var(--bg-tertiary)]'
                }`}
            >
              <span className="text-xs text-[var(--text-tertiary)]">{ps.index}</span>
              <span className={`font-mono ${ps.highlight ? 'text-green-400' : 'text-[var(--text-primary)]'}`}>
                {ps.sum}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render window data for Count Distinct
  const renderWindowData = () => {
    if (!windowData) return null;
    return (
      <div className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-[var(--text-tertiary)]">
            Window [{windowData.start}...{windowData.end}]
          </div>
          <div className="px-2 py-0.5 rounded bg-[var(--color-primary-500)]/20 text-[var(--color-primary-500)] text-sm font-bold">
            Distinct: {windowData.distinctCount}
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          {windowData.frequencies.map((f, i) => (
            <div key={i} className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--bg-tertiary)]">
              <span className="font-mono text-[var(--text-primary)]">{f.key}</span>
              <span className="text-xs text-[var(--text-tertiary)]">×{f.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render sequence for Longest Consecutive
  const renderSequence = () => {
    if (!sequence || sequence.length === 0) return null;
    return (
      <div className="mb-4 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-[var(--text-tertiary)]">Consecutive Sequence</div>
          {longestLength !== undefined && (
            <div className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-sm font-bold">
              Longest: {longestLength}
            </div>
          )}
        </div>
        <div className="flex gap-1 flex-wrap">
          {sequence.map((item, i) => (
            <div
              key={i}
              className={`px-2 py-1 rounded font-mono text-sm ${item.isStart
                  ? 'bg-[var(--color-primary-500)] text-white ring-2 ring-[var(--color-primary-500)]/50'
                  : item.inSequence
                    ? 'bg-green-500/30 text-green-400'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                }`}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render rehashing visualization
  const renderRehashing = () => {
    if (!isRehashing || !oldBuckets || !newBuckets) return null;
    return (
      <div className="mb-4">
        <div className="text-xs text-[var(--text-tertiary)] mb-2">Rehashing: Old → New Table</div>
        <div className="grid grid-cols-2 gap-4">
          {/* Old table */}
          <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/30">
            <div className="text-xs text-red-400 mb-2">Old Table (size: {oldBuckets.length})</div>
            <div className="space-y-1">
              {oldBuckets.slice(0, 8).map(renderBucket)}
            </div>
          </div>
          {/* New table */}
          <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/30">
            <div className="text-xs text-green-400 mb-2">New Table (size: {newBuckets.length})</div>
            <div className="space-y-1">
              {newBuckets.slice(0, 8).map(renderBucket)}
            </div>
          </div>
        </div>
        {migratingItem && (
          <div className="mt-2 text-center">
            <span className="px-3 py-1 rounded-full bg-[var(--color-primary-500)] text-white text-sm animate-pulse">
              Migrating: {migratingItem.key}:{migratingItem.value}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)]">
          Hash Table {collisionMethod ? `(${collisionMethod})` : ''}
        </h3>
        <div className="flex gap-3 text-xs">
          <span className="text-[var(--text-tertiary)]">
            Method: <span className="text-[var(--text-secondary)]">{hashMethod}</span>
          </span>
          <span className="text-[var(--text-tertiary)]">
            Size: <span className="text-[var(--text-secondary)]">{size}/{capacity}</span>
          </span>
          <span className="text-[var(--text-tertiary)]">
            Load: <span className={`${loadFactor > 0.7 ? 'text-yellow-400' : 'text-[var(--text-secondary)]'}`}>
              {(loadFactor * 100).toFixed(0)}%
            </span>
          </span>
        </div>
      </div>

      {/* Phase indicator */}
      {phase && (
        <div className="mb-3 px-2 py-1 rounded bg-[var(--bg-tertiary)] text-xs text-[var(--text-secondary)]">
          Phase: {phase}
        </div>
      )}

      {/* Hash calculation visualization */}
      {renderHashCalculation()}

      {/* Probe sequence for open addressing */}
      {renderProbeSequence()}

      {/* Rehashing visualization */}
      {renderRehashing()}

      {/* Application-specific visualizations */}
      {renderHashMap()}
      {renderGroups()}
      {renderPrefixSums()}
      {renderWindowData()}
      {renderSequence()}

      {/* Main bucket visualization (when not rehashing) */}
      {!isRehashing && buckets && buckets.length > 0 && (
        <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
          {buckets.map(renderBucket)}
        </div>
      )}

      {/* Current operation info */}
      {currentKey !== undefined && currentHash !== undefined && (
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-[var(--text-tertiary)]">Current:</span>
          <span className="px-2 py-0.5 rounded bg-[var(--color-primary-500)]/20 text-[var(--color-primary-500)] font-mono">
            key={currentKey}
          </span>
          <span className="text-[var(--text-tertiary)]">→</span>
          <span className="px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-mono">
            hash={currentHash}
          </span>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className="mt-3 p-2 rounded bg-[var(--bg-tertiary)] text-sm text-[var(--text-secondary)]">
          {message}
        </div>
      )}
    </div>
  );
}

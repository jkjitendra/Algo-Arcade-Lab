"use client";

import { QueueData } from "@/core/events/events";
import { useEffect, useState, useRef } from "react";

interface QueueViewProps {
  queueData: QueueData;
  phase?: string;
}

export function QueueView({ queueData, phase }: QueueViewProps) {
  const {
    elements,
    capacity,
    frontIndex,
    rearIndex,
    highlight,
    animating,
    animatingValue,
    isCircular,
    isDeque,
    priorities,
    secondaryStack1,
    secondaryStack2,
    transferringElement,
    transferDirection,
    secondaryQueue1,
    secondaryQueue2,
    queueTransferElement,
    queueTransferDirection,
    cacheMap,
    lruAnimating,
    lruAnimatingKey,
    windowStart,
    windowEnd,
    maxDeque,
    generatedNumbers,
    binaryTreeNodes,
    stations,
    currentStation,
    fuel,
    startStation,
    streamChars,
    message,
  } = queueData;

  // Animation states
  const [showEnqueueAnimation, setShowEnqueueAnimation] = useState(false);
  const [showDequeueAnimation, setShowDequeueAnimation] = useState(false);
  const [showDequeueRearAnimation, setShowDequeueRearAnimation] = useState(false);
  const [enqueueOffset, setEnqueueOffset] = useState(100); // Start far right
  const [dequeueOffset, setDequeueOffset] = useState(0);
  const [dequeueRearOffset, setDequeueRearOffset] = useState(0);
  const [dequeueOpacity, setDequeueOpacity] = useState(1);
  const [dequeueRearOpacity, setDequeueRearOpacity] = useState(1);
  const [currentAnimatingValue, setCurrentAnimatingValue] = useState<number | string | null>(null);
  const [enqueuePhase, setEnqueuePhase] = useState<'entering' | 'entered' | null>(null);

  const animationCounter = useRef(0);

  // Handle enqueue animation - element starts outside on right and moves INTO the queue (left direction)
  useEffect(() => {
    if (animating === 'enqueue' && animatingValue !== undefined) {
      animationCounter.current++;
      setCurrentAnimatingValue(animatingValue);
      setShowEnqueueAnimation(true);
      setEnqueueOffset(120); // Start far outside on the right (positive = far right)
      setEnqueuePhase('entering');

      // After a brief moment, animate to position 0 (inside the queue)
      const startTimer = setTimeout(() => {
        setEnqueueOffset(0); // Move to inside the queue (translate back to 0)
        setEnqueuePhase('entered');
      }, 100);

      // End animation after the element has "joined" the queue
      const endTimer = setTimeout(() => {
        setShowEnqueueAnimation(false);
        setCurrentAnimatingValue(null);
        setEnqueuePhase(null);
      }, 800);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
  }, [animating, animatingValue, elements.length]);

  // Handle dequeue animation
  useEffect(() => {
    if (animating === 'dequeue' && animatingValue !== undefined) {
      animationCounter.current++;
      setCurrentAnimatingValue(animatingValue);
      setShowDequeueAnimation(true);
      setDequeueOffset(0);
      setDequeueOpacity(1);

      const moveTimer = setTimeout(() => {
        setDequeueOffset(-80);
      }, 50);

      const fadeTimer = setTimeout(() => {
        setDequeueOpacity(0);
      }, 400);

      const endTimer = setTimeout(() => {
        setShowDequeueAnimation(false);
        setCurrentAnimatingValue(null);
        setDequeueOpacity(1);
        setDequeueOffset(0);
      }, 700);

      return () => {
        clearTimeout(moveTimer);
        clearTimeout(fadeTimer);
        clearTimeout(endTimer);
      };
    }
  }, [animating, animatingValue, elements.length]);

  // Handle dequeueRear animation - element pops out to the right (for Deque deleteRear)
  useEffect(() => {
    if (animating === 'dequeueRear' && animatingValue !== undefined) {
      animationCounter.current++;
      setCurrentAnimatingValue(animatingValue);
      setShowDequeueRearAnimation(true);
      setDequeueRearOffset(0);
      setDequeueRearOpacity(1);

      const moveTimer = setTimeout(() => {
        setDequeueRearOffset(80); // Move right (positive direction)
      }, 50);

      const fadeTimer = setTimeout(() => {
        setDequeueRearOpacity(0);
      }, 400);

      const endTimer = setTimeout(() => {
        setShowDequeueRearAnimation(false);
        setCurrentAnimatingValue(null);
        setDequeueRearOpacity(1);
        setDequeueRearOffset(0);
      }, 700);

      return () => {
        clearTimeout(moveTimer);
        clearTimeout(fadeTimer);
        clearTimeout(endTimer);
      };
    }
  }, [animating, animatingValue, elements.length]);

  if (!elements) return null;

  // Render dual-structure view for queue using stacks
  if (secondaryStack1 !== undefined || secondaryStack2 !== undefined) {
    return (
      <DualStackView
        stack1={secondaryStack1 || []}
        stack2={secondaryStack2 || []}
        transferringElement={transferringElement}
        transferDirection={transferDirection}
        animating={animating}
        animatingValue={animatingValue}
        phase={phase}
        message={message}
      />
    );
  }

  // Render dual-structure view for stack using queues
  if (secondaryQueue1 !== undefined || secondaryQueue2 !== undefined) {
    return (
      <DualQueueView
        queue1={secondaryQueue1 || []}
        queue2={secondaryQueue2 || []}
        queueTransferElement={queueTransferElement}
        queueTransferDirection={queueTransferDirection}
        phase={phase}
        message={message}
      />
    );
  }

  // Render LRU Cache view
  if (cacheMap !== undefined) {
    return (
      <LRUCacheView
        queue={elements}
        cacheMap={cacheMap}
        lruAnimating={lruAnimating}
        lruAnimatingKey={lruAnimatingKey}
        highlight={highlight}
        phase={phase}
        message={message}
      />
    );
  }

  // Render circular tour / gas station view
  if (stations !== undefined) {
    return (
      <CircularTourView
        stations={stations}
        currentStation={currentStation}
        fuel={fuel}
        startStation={startStation}
        phase={phase}
        message={message}
      />
    );
  }

  // Render First Non-Repeating Character view (string + queue combined)
  if (streamChars !== undefined) {
    return (
      <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">First Non-Repeating Character</h3>
          {phase && <span className="text-xs text-amber-400 font-medium">{phase}</span>}
        </div>

        {/* Message */}
        {message && (
          <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
            ⚡ {message}
          </div>
        )}

        {/* Stream Characters Visualization */}
        <div>
          <span className="text-xs text-[var(--text-secondary)] mb-2 block">Input Stream (characters)</span>
          <div className="flex gap-1 flex-wrap border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] px-2 py-2">
            {streamChars.map((item, idx) => (
              <div
                key={idx}
                className={`w-10 h-10 rounded flex items-center justify-center font-bold text-sm text-white transition-all duration-300
                  ${item.highlight === 'current'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-600 ring-2 ring-amber-400 scale-110'
                    : item.highlight === 'found'
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-600'
                      : 'bg-gradient-to-r from-slate-500 to-slate-600'}
                `}
              >
                {item.char}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] mt-1 px-1">
            <span>Index: {streamChars.map((_, idx) => idx).join(', ')}</span>
          </div>
        </div>

        {/* Queue Visualization */}
        <div>
          <span className="text-xs text-[var(--text-secondary)] mb-2 block">Candidate Queue (non-repeating characters)</span>
          <div className="flex gap-1 flex-wrap border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] px-2 py-2 min-h-[50px]">
            {elements.length > 0 ? (
              <>
                {frontIndex >= 0 && (
                  <div className="text-emerald-400 text-xs font-medium self-center mr-1">FRONT ▼</div>
                )}
                {elements.map((elem, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-10 rounded flex items-center justify-center font-bold text-sm text-white
                      ${idx === 0
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                        : 'bg-gradient-to-r from-purple-400 to-purple-600'}
                    `}
                  >
                    {elem}
                  </div>
                ))}
                {rearIndex >= 0 && (
                  <div className="text-cyan-400 text-xs font-medium self-center ml-1">▼ REAR</div>
                )}
              </>
            ) : (
              <span className="text-[var(--text-tertiary)] text-xs">Empty (no candidates)</span>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 justify-center text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-amber-400 to-amber-600" />
            <span className="text-[var(--text-secondary)]">Current</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-cyan-400 to-cyan-600" />
            <span className="text-[var(--text-secondary)]">Processed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-400 to-emerald-600" />
            <span className="text-[var(--text-secondary)]">First Non-Repeating</span>
          </div>
        </div>
      </div>
    );
  }

  // Render binary number generation view
  if (generatedNumbers !== undefined) {
    return (
      <BinaryGenerationView
        queue={elements}
        generatedNumbers={generatedNumbers}
        binaryTreeNodes={binaryTreeNodes}
        phase={phase}
        message={message}
      />
    );
  }

  // Render sliding window maximum view
  if (windowStart !== undefined && windowEnd !== undefined) {
    return (
      <SlidingWindowView
        elements={elements as number[]}
        windowStart={windowStart}
        windowEnd={windowEnd}
        maxDeque={maxDeque || []}
        phase={phase}
        message={message}
      />
    );
  }

  // Render circular queue
  if (isCircular) {
    return (
      <CircularQueueView
        elements={elements}
        capacity={capacity || elements.length}
        frontIndex={frontIndex}
        rearIndex={rearIndex}
        highlight={highlight}
        animating={animating}
        animatingValue={animatingValue}
        phase={phase}
        message={message}
      />
    );
  }

  // Default linear queue view
  const elementWidth = 52;
  const minQueueWidth = 300;
  const dynamicQueueWidth = Math.max(minQueueWidth, (elements.length + 2) * elementWidth);

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {isDeque ? 'Deque Visualization' : priorities ? 'Priority Queue' : 'Queue Visualization'}
        </h3>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          <span>
            Size: <span className="text-[var(--color-primary-500)] font-medium">{elements.length}</span>
            {capacity && <span className="text-[var(--text-tertiary)]">/{capacity}</span>}
          </span>
          <span>
            Front: <span className="text-emerald-400 font-medium">{frontIndex >= 0 ? frontIndex : 'empty'}</span>
          </span>
          <span>
            Rear: <span className="text-cyan-400 font-medium">{rearIndex >= 0 ? rearIndex : 'empty'}</span>
          </span>
          {phase && (
            <span>
              Phase: <span className="text-amber-400 font-medium">{phase}</span>
            </span>
          )}
        </div>
      </div>

      {/* Message display */}
      {message && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
          ⚡ {message}
        </div>
      )}

      {/* Main queue container */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center gap-2">
          {/* Dequeue animation (left side) */}
          {showDequeueAnimation && currentAnimatingValue !== null && (
            <div
              className="absolute z-20"
              style={{
                left: dequeueOffset,
                top: '50%',
                transform: 'translateY(-50%)',
                transition: 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
                opacity: dequeueOpacity,
              }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/50 flex items-center justify-center text-white font-bold text-base border-2 border-red-300">
                {currentAnimatingValue}
              </div>
            </div>
          )}

          {/* FRONT label */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-emerald-400 font-medium mb-1">FRONT</span>
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-emerald-400" />
          </div>

          {/* Queue box */}
          <div
            className="relative flex items-center border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] px-2 py-3"
            style={{
              minWidth: dynamicQueueWidth,
              minHeight: 60,
            }}
          >
            {/* Queue walls decoration */}
            <div className="absolute top-0 bottom-0 -left-1 w-1 bg-gradient-to-b from-[var(--color-primary-500)] to-[var(--color-primary-700)] rounded-l-full" />
            <div className="absolute top-0 bottom-0 -right-1 w-1 bg-gradient-to-b from-[var(--color-primary-500)] to-[var(--color-primary-700)] rounded-r-full" />

            {/* Queue elements - horizontal layout */}
            <div className="flex gap-1">
              {elements.map((elem, idx) => {
                const isFront = idx === frontIndex;
                const isRear = idx === rearIndex;
                const isHighlighted = highlight?.includes(idx);

                return (
                  <div
                    key={`${idx}-${elem}`}
                    className={`
                      relative flex flex-col items-center justify-center w-12 h-12 rounded-lg font-bold text-sm
                      transition-all duration-300 shadow-md
                      ${isHighlighted
                        ? 'bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-600)] text-white ring-2 ring-[var(--color-primary-300)]'
                        : isFront
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white ring-2 ring-emerald-300'
                          : isRear
                            ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white ring-2 ring-cyan-300'
                            : 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
                      }
                    `}
                  >
                    {elem}
                    {priorities && priorities[idx] !== undefined && (
                      <span className="absolute -top-2 -right-2 text-[10px] bg-amber-500 text-white px-1 rounded-full">
                        P{priorities[idx]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Empty state */}
            {elements.length === 0 && !showEnqueueAnimation && (
              <div className="flex items-center justify-center text-[var(--text-tertiary)] text-sm w-full">
                Empty Queue
              </div>
            )}
          </div>

          {/* REAR label */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-cyan-400 font-medium mb-1">REAR</span>
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-cyan-400" />
          </div>

          {/* Enqueue animation (element enters from RIGHT, moves LEFT into queue) */}
          {showEnqueueAnimation && currentAnimatingValue !== null && (
            <div
              className="absolute z-20"
              style={{
                right: 10, // Position near the REAR label
                top: '50%',
                // Start at +120px (far right, outside queue), animate to 0 (at rear)
                transform: `translateY(-50%) translateX(${enqueueOffset}px)`,
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                opacity: enqueuePhase === 'entered' ? 0.6 : 1,
              }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/50 flex items-center justify-center text-white font-bold text-base border-2 border-emerald-300">
                {currentAnimatingValue}
              </div>
            </div>
          )}

          {/* DequeueRear animation (element pops out to the RIGHT from REAR position) */}
          {showDequeueRearAnimation && currentAnimatingValue !== null && (
            <div
              className="absolute z-20"
              style={{
                right: 10, // Start at REAR position
                top: '50%',
                // Move right (positive) and fade out
                transform: `translateY(-50%) translateX(${dequeueRearOffset}px)`,
                transition: 'transform 0.5s ease-out, opacity 0.4s ease-out',
                opacity: dequeueRearOpacity,
              }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-red-500/50 flex items-center justify-center text-white font-bold text-base border-2 border-orange-300">
                {currentAnimatingValue}
              </div>
            </div>
          )}
        </div>

        <span className="mt-3 text-xs text-[var(--text-tertiary)]">
          {isDeque ? 'DEQUE (Double-Ended Queue)' : priorities ? 'PRIORITY QUEUE' : 'QUEUE (FIFO)'}
        </span>
      </div>

      {/* Legend */}
      <div className="flex gap-3 mt-4 justify-center text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
          <span className="text-[var(--text-secondary)]">Front</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600" />
          <span className="text-[var(--text-secondary)]">Rear</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-slate-500 to-slate-600" />
          <span className="text-[var(--text-secondary)]">Element</span>
        </div>
      </div>
    </div>
  );
}

// ==================== Helper Components ====================

function CircularQueueView({
  elements,
  capacity,
  frontIndex,
  rearIndex,
  highlight,
  animating,
  animatingValue,
  phase,
  message,
}: {
  elements: (number | string)[];
  capacity: number;
  frontIndex: number;
  rearIndex: number;
  highlight?: number[];
  animating?: 'enqueue' | 'dequeue' | 'dequeueRear';
  animatingValue?: number | string;
  phase?: string;
  message?: string;
}) {
  // Animation state for dequeue
  const [isDequeueAnimating, setIsDequeueAnimating] = useState(false);
  const prevLengthRef = useRef(elements.length);

  // Trigger animation when elements are removed (dequeue)
  useEffect(() => {
    if (animating === 'dequeue' && elements.length < prevLengthRef.current) {
      setIsDequeueAnimating(true);
      const timer = setTimeout(() => setIsDequeueAnimating(false), 600);
      prevLengthRef.current = elements.length;
      return () => clearTimeout(timer);
    }
    prevLengthRef.current = elements.length;
  }, [elements.length, animating]);

  // Create a proper circular array representation
  const slots: { value: number | string | null; hasValue: boolean; slotIndex: number }[] = [];

  for (let i = 0; i < capacity; i++) {
    const hasValue = i < elements.length;
    slots.push({
      value: hasValue ? elements[i] : null,
      hasValue,
      slotIndex: i,
    });
  }

  const angleStep = 360 / capacity;
  const radius = 100;

  // Helper to get position for slot
  const getPosition = (slotIndex: number) => {
    const angle = (slotIndex * angleStep - 90) * (Math.PI / 180);
    const x = Math.cos(angle) * radius + radius + 40;
    const y = Math.sin(angle) * radius + radius + 40;
    return { x, y };
  };

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Circular Queue</h3>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          <span>Size: <span className="text-[var(--color-primary-500)] font-medium">{elements.length}</span>/{capacity}</span>
          <span>Front: <span className="text-emerald-400 font-medium">{elements.length > 0 ? frontIndex : '-'}</span></span>
          <span>Rear: <span className="text-cyan-400 font-medium">{elements.length > 0 ? rearIndex : '-'}</span></span>
          {phase && <span>Phase: <span className="text-amber-400 font-medium">{phase}</span></span>}
        </div>
      </div>

      {message && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
          ⚡ {message}
        </div>
      )}

      <div className="flex justify-center">
        <div className="relative" style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}>
          {/* Circular track */}
          <div
            className="absolute border-2 border-dashed border-[var(--border-secondary)] rounded-full"
            style={{
              width: radius * 2,
              height: radius * 2,
              left: 40,
              top: 40,
            }}
          />

          {/* Center label */}
          <div className="absolute flex flex-col items-center justify-center text-[var(--text-tertiary)]" style={{
            left: radius + 40 - 30,
            top: radius + 40 - 20,
            width: 60,
            height: 40,
          }}>
            <span className="text-xs">Circular</span>
            <span className="text-xs">Queue</span>
          </div>

          {/* Dequeue animation: element flying out */}
          {isDequeueAnimating && animatingValue !== undefined && (
            <div
              className="absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-30 bg-gradient-to-r from-red-400 to-red-600 text-white ring-2 ring-red-300"
              style={{
                left: getPosition(0).x - 20,
                top: getPosition(0).y - 20,
                animation: 'circularDequeue 0.5s ease-out forwards',
              }}
            >
              {animatingValue}
            </div>
          )}

          {/* Slots */}
          {slots.map((slot, idx) => {
            const angle = (idx * angleStep - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * radius + radius + 40;
            const y = Math.sin(angle) * radius + radius + 40;
            const isFront = idx === frontIndex && elements.length > 0;
            const isRear = idx === rearIndex && elements.length > 0;
            const isHighlighted = highlight?.includes(idx);
            const isEmpty = !slot.hasValue;

            return (
              <div
                key={idx}
                className={`
                  absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all duration-500 ease-out
                  ${isEmpty
                    ? 'bg-[var(--bg-primary)] border-2 border-dashed border-[var(--border-secondary)] text-[var(--text-quaternary)] opacity-50'
                    : isHighlighted
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white ring-2 ring-amber-300 shadow-lg shadow-amber-500/40 scale-110'
                      : isFront && isRear
                        ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white ring-2 ring-purple-300 shadow-lg'
                        : isFront
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white ring-2 ring-emerald-300 shadow-lg shadow-emerald-500/30'
                          : isRear
                            ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white ring-2 ring-cyan-300 shadow-lg shadow-cyan-500/30'
                            : 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-md'
                  }
                `}
                style={{
                  left: x - 20,
                  top: y - 20,
                }}
              >
                {/* Show value if has one, otherwise show index in muted style */}
                {isEmpty ? (
                  <span className="text-[10px] opacity-50">{idx}</span>
                ) : (
                  slot.value
                )}

                {/* Front/Rear indicators */}
                {isFront && (
                  <span className="absolute -bottom-5 text-[10px] text-emerald-400 font-bold">F</span>
                )}
                {isRear && (
                  <span className="absolute -top-5 text-[10px] text-cyan-400 font-bold">R</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow" />
          <span className="text-[var(--text-secondary)]">Front (F)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow" />
          <span className="text-[var(--text-secondary)]">Rear (R)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 shadow" />
          <span className="text-[var(--text-secondary)]">Value</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full border-2 border-dashed border-[var(--border-secondary)] opacity-50" />
          <span className="text-[var(--text-secondary)]">Empty</span>
        </div>
      </div>

      {/* CSS Animation keyframes for dequeue */}
      <style>{`
        @keyframes circularDequeue {
          0% { transform: scale(1) translate(0, 0); opacity: 1; }
          50% { transform: scale(1.2) translate(-10px, -20px); opacity: 0.8; }
          100% { transform: scale(0.5) translate(-40px, -60px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function DualStackView({
  stack1,
  stack2,
  transferringElement,
  transferDirection,
  animating,
  animatingValue,
  phase,
  message,
}: {
  stack1: (number | string)[];
  stack2: (number | string)[];
  transferringElement?: number | string;
  transferDirection?: 'stack1ToStack2' | 'stack2ToStack1';
  animating?: 'enqueue' | 'dequeue' | 'dequeueRear';
  animatingValue?: number | string;
  phase?: string;
  message?: string;
}) {
  // Calculate dynamic height based on max elements (min 4 slots, grows as needed)
  const maxElements = Math.max(stack1.length, stack2.length, 4);
  const stackHeight = Math.min(maxElements * 36 + 16, 300); // 36px per element + padding, max 300px

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Queue Using Two Stacks</h3>
        {phase && <span className="text-xs text-amber-400 font-medium">{phase}</span>}
      </div>

      {message && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
          ⚡ {message}
        </div>
      )}

      <div className="flex justify-center items-end gap-8 relative">
        {/* Stack 1 (Input Stack) */}
        <div className="flex flex-col items-center relative">
          {/* Enqueue animation - element entering from above */}
          {animating === 'enqueue' && animatingValue !== undefined && (
            <div
              className="absolute -top-12 left-1/2 -translate-x-1/2 h-8 w-14 rounded flex items-center justify-center font-bold text-sm bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg z-10 animate-bounce"
            >
              {animatingValue}
            </div>
          )}
          <div
            className="relative border-2 border-[var(--border-secondary)] border-t-0 rounded-b-lg bg-[var(--bg-secondary)] w-20 transition-all duration-300"
            style={{ height: stackHeight }}
          >
            <div className="absolute bottom-2 left-2 right-2 flex flex-col-reverse gap-1">
              {stack1.map((elem, idx) => (
                <div
                  key={idx}
                  className="h-8 rounded flex items-center justify-center font-bold text-sm bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md transition-all duration-300"
                >
                  {elem}
                </div>
              ))}
            </div>
            {stack1.length === 0 && !animating && (
              <div className="absolute inset-0 flex items-center justify-center text-[var(--text-tertiary)] text-sm">Empty</div>
            )}
          </div>
          <span className="text-xs text-[var(--text-secondary)] mt-2 font-medium">Stack 1 (Input)</span>
        </div>

        {/* Arrow with Transfer Animation */}
        <div className="flex flex-col items-center mb-6">
          {/* Animated transferring element */}
          {transferringElement !== undefined && transferDirection && (
            <div
              className={`
                absolute h-8 w-14 rounded flex items-center justify-center font-bold text-sm text-white shadow-lg z-10
                ${transferDirection === 'stack1ToStack2'
                  ? 'bg-gradient-to-r from-orange-400 to-orange-600 animate-pulse'
                  : 'bg-gradient-to-r from-purple-400 to-purple-600 animate-pulse'}
              `}
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                animation: 'transferBounce 0.5s ease-in-out'
              }}
            >
              {transferringElement}
            </div>
          )}
          <span className="text-2xl text-[var(--text-tertiary)]">
            {transferDirection === 'stack1ToStack2' ? '→' : transferDirection === 'stack2ToStack1' ? '←' : '⟷'}
          </span>
        </div>

        {/* Stack 2 (Output Stack) */}
        <div className="flex flex-col items-center">
          <div
            className="relative border-2 border-[var(--border-secondary)] border-t-0 rounded-b-lg bg-[var(--bg-secondary)] w-20 transition-all duration-300"
            style={{ height: stackHeight }}
          >
            <div className="absolute bottom-2 left-2 right-2 flex flex-col-reverse gap-1">
              {stack2.map((elem, idx) => (
                <div
                  key={idx}
                  className="h-8 rounded flex items-center justify-center font-bold text-sm bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-md transition-all duration-300"
                >
                  {elem}
                </div>
              ))}
            </div>
            {stack2.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-[var(--text-tertiary)] text-sm">Empty</div>
            )}
          </div>
          <span className="text-xs text-[var(--text-secondary)] mt-2 font-medium">Stack 2 (Output)</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-400 to-blue-600" />
          <span className="text-[var(--text-secondary)]">Input Stack</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <span className="text-[var(--text-secondary)]">Output Stack</span>
        </div>
      </div>
    </div>
  );
}

function DualQueueView({
  queue1,
  queue2,
  queueTransferElement,
  queueTransferDirection,
  phase,
  message,
}: {
  queue1: (number | string)[];
  queue2: (number | string)[];
  queueTransferElement?: number | string;
  queueTransferDirection?: 'queue1ToQueue2' | 'queue2ToQueue1' | 'enqueueQueue2';
  phase?: string;
  message?: string;
}) {
  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Stack Using Two Queues</h3>
        {phase && <span className="text-xs text-amber-400 font-medium">{phase}</span>}
      </div>

      {message && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
          ⚡ {message}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Queue 1 */}
        <div className="flex items-center gap-2 relative">
          <span className="text-xs text-[var(--text-secondary)] w-20">Queue 1:</span>
          <div className="flex gap-1 border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] px-2 py-2 min-w-[200px] relative">
            {queue1.length > 0 ? queue1.map((elem, idx) => (
              <div
                key={idx}
                className="w-10 h-10 rounded flex items-center justify-center font-bold text-sm bg-gradient-to-r from-purple-400 to-purple-600 text-white"
              >
                {elem}
              </div>
            )) : (
              <span className="text-[var(--text-tertiary)] text-xs">Empty</span>
            )}
          </div>
        </div>

        {/* Transfer animation - element moving from Queue 1 to Queue 2 */}
        {queueTransferDirection === 'queue1ToQueue2' && queueTransferElement !== undefined && (
          <div className="flex justify-center items-center gap-2">
            <span className="text-orange-400 text-sm">↓</span>
            <div className="w-12 h-10 rounded flex items-center justify-center font-bold text-sm bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg animate-bounce">
              {queueTransferElement}
            </div>
            <span className="text-orange-400 text-sm">↓</span>
          </div>
        )}

        {/* Queue 2 */}
        <div className="flex items-center gap-2 relative">
          <span className="text-xs text-[var(--text-secondary)] w-20">Queue 2:</span>
          <div className="flex gap-1 border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] px-2 py-2 min-w-[200px] relative">
            {queue2.length > 0 ? queue2.map((elem, idx) => (
              <div
                key={idx}
                className="w-10 h-10 rounded flex items-center justify-center font-bold text-sm bg-gradient-to-r from-orange-400 to-orange-600 text-white"
              >
                {elem}
              </div>
            )) : (
              <span className="text-[var(--text-tertiary)] text-xs">Empty</span>
            )}
            {/* Enqueue animation - element entering from right side of Queue 2 */}
            {queueTransferDirection === 'enqueueQueue2' && queueTransferElement !== undefined && (
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="text-emerald-400 text-lg">←</span>
                <div className="w-10 h-10 rounded flex items-center justify-center font-bold text-sm bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg animate-bounce">
                  {queueTransferElement}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-400 to-purple-600" />
          <span className="text-[var(--text-secondary)]">Queue 1</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-orange-400 to-orange-600" />
          <span className="text-[var(--text-secondary)]">Queue 2</span>
        </div>
      </div>
    </div>
  );
}

function LRUCacheView({
  queue,
  cacheMap,
  lruAnimating,
  lruAnimatingKey,
  highlight,
  phase,
  message,
}: {
  queue: (number | string)[];
  cacheMap: { key: number; value: number }[];
  lruAnimating?: 'insert' | 'access' | 'evict';
  lruAnimatingKey?: number;
  highlight?: number[];
  phase?: string;
  message?: string;
}) {
  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">LRU Cache</h3>
        {phase && <span className="text-xs text-amber-400 font-medium">{phase}</span>}
      </div>

      {message && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
          ⚡ {message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Access Order Queue */}
        <div>
          <span className="text-xs text-[var(--text-secondary)] mb-2 block">Access Order (LRU → MRU)</span>
          <div className="flex gap-1 border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] px-2 py-2 min-h-[50px] flex-wrap relative">
            {queue.length > 0 ? queue.map((elem, idx) => {
              const isHighlighted = highlight?.includes(idx);
              const isAnimatingAccess = lruAnimating === 'access' && elem === lruAnimatingKey;
              return (
                <div
                  key={idx}
                  className={`w-10 h-10 rounded flex items-center justify-center font-bold text-sm text-white transition-all duration-300
                    ${idx === 0 ? 'bg-gradient-to-r from-red-400 to-red-600' : idx === queue.length - 1 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-slate-500 to-slate-600'}
                    ${isHighlighted ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-[var(--bg-secondary)]' : ''}
                    ${isAnimatingAccess ? 'animate-pulse scale-110' : ''}
                  `}
                >
                  {elem}
                </div>
              );
            }) : (
              <span className="text-[var(--text-tertiary)] text-xs">Empty</span>
            )}
            {/* Insert animation - element entering from right */}
            {lruAnimating === 'insert' && lruAnimatingKey !== undefined && (
              <div className="absolute -right-14 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="text-emerald-400 text-lg">←</span>
                <div className="w-10 h-10 rounded flex items-center justify-center font-bold text-sm bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg animate-bounce">
                  {lruAnimatingKey}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] mt-1 px-1">
            <span>← LRU (evict first)</span>
            <span>MRU →</span>
          </div>
        </div>

        {/* HashMap */}
        <div>
          <span className="text-xs text-[var(--text-secondary)] mb-2 block">HashMap</span>
          <div className="border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] p-2">
            {cacheMap.length > 0 ? cacheMap.map((entry, idx) => {
              const isAnimatingEntry = (lruAnimating === 'insert' || lruAnimating === 'access') && entry.key === lruAnimatingKey;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 py-1 border-b last:border-0 border-[var(--border-primary)] transition-all duration-300
                    ${isAnimatingEntry ? 'bg-yellow-500/20 rounded' : ''}
                  `}
                >
                  <span className={`text-xs font-mono ${isAnimatingEntry ? 'text-yellow-400' : 'text-purple-400'}`}>{entry.key}</span>
                  <span className="text-[var(--text-tertiary)]">→</span>
                  <span className={`text-xs font-mono ${isAnimatingEntry ? 'text-yellow-400' : 'text-cyan-400'}`}>{entry.value}</span>
                </div>
              );
            }) : (
              <span className="text-[var(--text-tertiary)] text-xs">Empty</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlidingWindowView({
  elements,
  windowStart,
  windowEnd,
  maxDeque,
  phase,
  message,
}: {
  elements: number[];
  windowStart: number;
  windowEnd: number;
  maxDeque: number[];
  phase?: string;
  message?: string;
}) {
  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Sliding Window Maximum</h3>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          <span>Window: <span className="text-cyan-400 font-medium">[{windowStart}, {windowEnd}]</span></span>
          {phase && <span>Phase: <span className="text-amber-400 font-medium">{phase}</span></span>}
        </div>
      </div>

      {message && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
          ⚡ {message}
        </div>
      )}

      {/* Array with window highlight */}
      <div className="flex gap-1 justify-center mb-4">
        {elements.map((elem, idx) => {
          const inWindow = idx >= windowStart && idx <= windowEnd;
          const isMax = maxDeque.length > 0 && idx === maxDeque[0];

          return (
            <div
              key={idx}
              className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300
                ${isMax
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white ring-2 ring-amber-300'
                  : inWindow
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                }
              `}
            >
              {elem}
            </div>
          );
        })}
      </div>

      {/* Deque showing indices of potential maximums */}
      <div className="mt-4">
        <span className="text-xs text-[var(--text-secondary)] mb-2 block">Deque (indices of potential max)</span>
        <div className="flex gap-1 border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] px-2 py-2 min-h-[40px]">
          {maxDeque.length > 0 ? maxDeque.map((idx, i) => (
            <div
              key={i}
              className={`w-10 h-8 rounded flex items-center justify-center font-bold text-sm text-white
                ${i === 0 ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-slate-500 to-slate-600'}
              `}
            >
              {idx}
            </div>
          )) : (
            <span className="text-[var(--text-tertiary)] text-xs">Empty</span>
          )}
        </div>
      </div>
    </div>
  );
}

function BinaryGenerationView({
  queue,
  generatedNumbers,
  binaryTreeNodes,
  phase,
  message,
}: {
  queue: (number | string)[];
  generatedNumbers: string[];
  binaryTreeNodes?: { value: string; level: number; processed: boolean }[];
  phase?: string;
  message?: string;
}) {
  // Group nodes by level for tree display
  const nodesByLevel = binaryTreeNodes?.reduce((acc, node) => {
    if (!acc[node.level]) acc[node.level] = [];
    acc[node.level].push(node);
    return acc;
  }, {} as Record<number, typeof binaryTreeNodes>) || {};

  const levels = Object.keys(nodesByLevel).map(Number).sort((a, b) => a - b);

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)] space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Binary Number Generation</h3>
        {phase && <span className="text-xs text-amber-400 font-medium">{phase}</span>}
      </div>

      {message && (
        <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
          ⚡ {message}
        </div>
      )}

      {/* Binary Tree Visualization */}
      {binaryTreeNodes && binaryTreeNodes.length > 0 && (
        <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
          <span className="text-xs text-[var(--text-secondary)] mb-3 block">🌳 Binary Tree (BFS Order)</span>
          <div className="space-y-2 overflow-x-auto">
            {levels.slice(0, 5).map((level) => (
              <div key={level} className="flex justify-center gap-1">
                {nodesByLevel[level]?.map((node, idx) => (
                  <div
                    key={node.value}
                    className={`px-2 py-1 rounded text-xs font-mono transition-all duration-300 ${node.processed
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white'
                      : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white opacity-60'
                      }`}
                    title={node.processed ? 'Output' : 'In Queue / Pending'}
                  >
                    {node.value}
                  </div>
                ))}
              </div>
            ))}
            {levels.length > 5 && (
              <div className="text-center text-xs text-[var(--text-tertiary)]">... more levels ...</div>
            )}
          </div>
          <div className="flex gap-4 justify-center mt-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-400 to-emerald-600" />
              <span className="text-[var(--text-secondary)]">Processed (Output)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-slate-400 to-slate-500 opacity-60" />
              <span className="text-[var(--text-secondary)]">Pending (In Queue)</span>
            </div>
          </div>
        </div>
      )}

      {/* Current Queue */}
      <div>
        <span className="text-xs text-[var(--text-secondary)] mb-2 block">Queue (pending binary numbers)</span>
        <div className="flex gap-1 border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] px-2 py-2 min-h-[40px] overflow-x-auto">
          {queue.length > 0 ? queue.map((elem, idx) => (
            <div
              key={idx}
              className="px-3 h-8 rounded flex items-center justify-center font-mono text-sm bg-gradient-to-r from-purple-400 to-purple-600 text-white whitespace-nowrap"
            >
              {elem}
            </div>
          )) : (
            <span className="text-[var(--text-tertiary)] text-xs">Empty</span>
          )}
        </div>
      </div>

      {/* Generated Numbers */}
      <div>
        <span className="text-xs text-[var(--text-secondary)] mb-2 block">Generated Binary Numbers (output)</span>
        <div className="flex gap-2 flex-wrap border-2 border-[var(--border-secondary)] rounded-lg bg-[var(--bg-secondary)] px-2 py-2 min-h-[40px]">
          {generatedNumbers.length > 0 ? generatedNumbers.map((num, idx) => (
            <div
              key={idx}
              className="px-3 py-1 rounded font-mono text-sm bg-gradient-to-r from-emerald-400 to-emerald-600 text-white"
            >
              {num}
            </div>
          )) : (
            <span className="text-[var(--text-tertiary)] text-xs">None yet</span>
          )}
        </div>
      </div>
    </div>
  );
}

function CircularTourView({
  stations,
  currentStation,
  fuel,
  startStation,
  phase,
  message,
}: {
  stations: { petrol: number; distance: number }[];
  currentStation?: number;
  fuel?: number;
  startStation?: number;
  phase?: string;
  message?: string;
}) {
  const radius = 100;
  const angleStep = 360 / stations.length;

  // Calculate net gains for each station
  const netGains = stations.map(s => s.petrol - s.distance);
  const totalGain = netGains.reduce((a, b) => a + b, 0);
  const maxPetrol = Math.max(...stations.map(s => s.petrol), 1);

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Circular Tour (Gas Station)</h3>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          {startStation !== undefined && <span>Start: <span className="text-emerald-400 font-medium">Station {startStation}</span></span>}
          {phase && <span className="text-cyan-400 font-medium">{phase}</span>}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
          ⚡ {message}
        </div>
      )}

      {/* Fuel Tank Gauge */}
      <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--text-secondary)]">⛽ Current Fuel Tank</span>
          <span className={`text-sm font-bold ${fuel !== undefined && fuel >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {fuel !== undefined ? fuel : 0} units
          </span>
        </div>
        <div className="h-6 bg-[var(--bg-tertiary)] rounded-full overflow-hidden border border-[var(--border-primary)]">
          <div
            className={`h-full transition-all duration-500 ${fuel !== undefined && fuel >= 0 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
            style={{ width: `${Math.min(Math.max((fuel || 0) * 5, 0), 100)}%` }}
          />
        </div>
        <div className="text-xs text-[var(--text-tertiary)] mt-1 text-center">
          {fuel !== undefined && fuel < 0 ? '❌ Tank empty! Need to reset start point' : fuel !== undefined && fuel > 0 ? '✅ Enough fuel to continue' : 'Ready to start'}
        </div>
      </div>

      {/* Circular Route Diagram */}
      <div className="flex justify-center">
        <div className="relative" style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}>
          {/* Circular road */}
          <div
            className="absolute border-4 border-dashed border-[var(--border-secondary)] rounded-full"
            style={{
              width: radius * 2,
              height: radius * 2,
              left: 40,
              top: 40,
            }}
          />

          {/* Direction arrow in center */}
          <div className="absolute text-2xl" style={{ left: radius + 30, top: radius + 25 }}>
            🔄
          </div>

          {/* Stations */}
          {stations.map((station, idx) => {
            const angle = (idx * angleStep - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * radius + radius + 40;
            const y = Math.sin(angle) * radius + radius + 40;
            const isCurrent = idx === currentStation;
            const isStart = idx === startStation;
            const netGain = station.petrol - station.distance;

            return (
              <div
                key={idx}
                className={`
                  absolute w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-xs
                  transition-all duration-300 shadow-lg
                  ${isCurrent
                    ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white ring-4 ring-amber-300/50 scale-110 z-10'
                    : isStart
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white ring-4 ring-emerald-300/50'
                      : 'bg-gradient-to-br from-slate-500 to-slate-600 text-white'
                  }
                `}
                style={{
                  left: x - 32,
                  top: y - 32,
                }}
                title={`Station ${idx}: Petrol=${station.petrol}, Distance=${station.distance}, Net=${netGain >= 0 ? '+' : ''}${netGain}`}
              >
                <span className="text-lg font-bold">{idx}</span>
                <span className={`text-[9px] ${netGain >= 0 ? 'text-emerald-200' : 'text-red-200'}`}>
                  {netGain >= 0 ? '+' : ''}{netGain}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Station Details Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[var(--border-secondary)]">
              <th className="px-2 py-1 text-left text-[var(--text-secondary)]">Station</th>
              <th className="px-2 py-1 text-center text-[var(--text-secondary)]">⛽ Petrol</th>
              <th className="px-2 py-1 text-center text-[var(--text-secondary)]">📏 Distance</th>
              <th className="px-2 py-1 text-center text-[var(--text-secondary)]">Net Gain</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, idx) => {
              const netGain = station.petrol - station.distance;
              const isCurrent = idx === currentStation;
              const isStart = idx === startStation;

              return (
                <tr
                  key={idx}
                  className={`border-b border-[var(--border-secondary)]/30 ${isCurrent ? 'bg-amber-500/20' : isStart ? 'bg-emerald-500/20' : ''}`}
                >
                  <td className="px-2 py-1.5">
                    <span className={`font-medium ${isStart ? 'text-emerald-400' : isCurrent ? 'text-amber-400' : 'text-[var(--text-primary)]'}`}>
                      {isStart ? '🚩 ' : isCurrent ? '🚗 ' : ''}Station {idx}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <div
                        className="h-2 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded"
                        style={{ width: `${(station.petrol / maxPetrol) * 40}px` }}
                      />
                      <span className="text-cyan-400">{station.petrol}</span>
                    </div>
                  </td>
                  <td className="px-2 py-1.5 text-center text-[var(--text-secondary)]">{station.distance}</td>
                  <td className={`px-2 py-1.5 text-center font-bold ${netGain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {netGain >= 0 ? '+' : ''}{netGain}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-[var(--bg-tertiary)]">
              <td className="px-2 py-1.5 font-bold text-[var(--text-primary)]">Total</td>
              <td className="px-2 py-1.5 text-center text-cyan-400 font-bold">{stations.reduce((a, s) => a + s.petrol, 0)}</td>
              <td className="px-2 py-1.5 text-center text-[var(--text-secondary)] font-bold">{stations.reduce((a, s) => a + s.distance, 0)}</td>
              <td className={`px-2 py-1.5 text-center font-bold ${totalGain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {totalGain >= 0 ? '+' : ''}{totalGain} {totalGain >= 0 ? '✅' : '❌'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
          <span className="text-[var(--text-secondary)]">Start Station</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
          <span className="text-[var(--text-secondary)]">Current Station</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-emerald-400">+N</span>
          <span className="text-[var(--text-secondary)]">Net Gain</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-red-400">-N</span>
          <span className="text-[var(--text-secondary)]">Net Loss</span>
        </div>
      </div>
    </div>
  );
}

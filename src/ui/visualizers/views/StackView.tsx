"use client";

import { StackData } from "@/core/events/events";
import { useEffect, useState, useRef } from "react";

interface StackViewProps {
  stackData: StackData;
  phase?: string;
}

export function StackView({ stackData, phase }: StackViewProps) {
  const { elements, capacity, topIndex, highlight, animating, animatingValue, outputQueue, message } = stackData;

  // Animation states
  const [showPushAnimation, setShowPushAnimation] = useState(false);
  const [showPopAnimation, setShowPopAnimation] = useState(false);
  const [popPhase, setPopPhase] = useState<'start' | 'rise' | 'pause' | 'fade'>('start');
  const [pushAnimationOffset, setPushAnimationOffset] = useState(-80);
  const [popAnimationOffset, setPopAnimationOffset] = useState(0);
  const [popOpacity, setPopOpacity] = useState(1);
  const [currentAnimatingValue, setCurrentAnimatingValue] = useState<number | string | null>(null);

  // Track animation with a unique counter
  const animationCounter = useRef(0);

  // Handle push animation - trigger on any animating='push' change
  useEffect(() => {
    if (animating === 'push' && animatingValue !== undefined) {
      animationCounter.current++;
      setCurrentAnimatingValue(animatingValue);
      setShowPushAnimation(true);
      setPushAnimationOffset(-80);

      const startTimer = setTimeout(() => {
        setPushAnimationOffset(0);
      }, 50);

      const endTimer = setTimeout(() => {
        setShowPushAnimation(false);
        setCurrentAnimatingValue(null);
      }, 600);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
  }, [animating, animatingValue, elements.length]);

  // Handle pop animation with pause at top
  useEffect(() => {
    if (animating === 'pop' && animatingValue !== undefined) {
      animationCounter.current++;
      setCurrentAnimatingValue(animatingValue);
      setShowPopAnimation(true);
      setPopPhase('start');
      setPopAnimationOffset(0);
      setPopOpacity(1);

      const riseTimer = setTimeout(() => {
        setPopPhase('rise');
        setPopAnimationOffset(-80);
      }, 50);

      const pauseTimer = setTimeout(() => {
        setPopPhase('pause');
      }, 350);

      const fadeTimer = setTimeout(() => {
        setPopPhase('fade');
        setPopOpacity(0);
      }, 600);

      const endTimer = setTimeout(() => {
        setShowPopAnimation(false);
        setCurrentAnimatingValue(null);
        setPopOpacity(1);
        setPopAnimationOffset(0);
      }, 900);

      return () => {
        clearTimeout(riseTimer);
        clearTimeout(pauseTimer);
        clearTimeout(fadeTimer);
        clearTimeout(endTimer);
      };
    }
  }, [animating, animatingValue, elements.length]);

  if (!elements) return null;

  // Dynamic sizing - no fixed limit
  const elementHeight = 44;
  const minStackHeight = 200;
  const dynamicStackHeight = Math.max(minStackHeight, (elements.length + 2) * elementHeight);

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Stack Visualization
        </h3>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          <span>
            Size: <span className="text-[var(--color-primary-500)] font-medium">{elements.length}</span>
            {capacity && <span className="text-[var(--text-tertiary)]">/{capacity}</span>}
          </span>
          <span>
            Top: <span className="text-cyan-400 font-medium">{topIndex >= 0 ? topIndex : 'empty'}</span>
          </span>
          {phase && (
            <span>
              Phase: <span className="text-emerald-400 font-medium">{phase}</span>
            </span>
          )}
        </div>
      </div>

      {/* Message display for operation reason */}
      {message && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
          ⚡ {message}
        </div>
      )}

      {/* Main content - Stack centered */}
      <div className="flex flex-col items-center">
        {/* Stack Container */}
        <div className="relative flex flex-col items-center">
          {/* Push animation */}
          {showPushAnimation && currentAnimatingValue !== null && (
            <div
              className="absolute z-20"
              style={{
                top: pushAnimationOffset,
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/50 flex items-center justify-center text-white font-bold text-base border-2 border-emerald-300">
                {currentAnimatingValue}
              </div>
            </div>
          )}

          {/* Pop animation */}
          {showPopAnimation && currentAnimatingValue !== null && (
            <div
              className="absolute z-20"
              style={{
                top: popAnimationOffset,
                left: '50%',
                transform: 'translateX(-50%)',
                transition: popPhase === 'fade'
                  ? 'opacity 0.3s ease-out'
                  : 'top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                opacity: popOpacity,
              }}
            >
              <div className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-base border-2 ${popPhase === 'pause' || popPhase === 'fade'
                ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/50 border-red-300 scale-110'
                : 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/50 border-red-300'
                }`}>
                {currentAnimatingValue}
              </div>
            </div>
          )}

          {/* Stack box */}
          <div
            className="relative border-2 border-[var(--border-secondary)] border-t-0 rounded-b-lg bg-[var(--bg-secondary)] mt-16"
            style={{
              width: 120,
              minHeight: dynamicStackHeight,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            {/* Stack walls decoration */}
            <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-primary-500)] to-[var(--color-primary-700)] rounded-l-full" />
            <div className="absolute -right-1 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-primary-500)] to-[var(--color-primary-700)] rounded-r-full" />

            {/* Stack elements - grow from bottom */}
            <div className="absolute bottom-2 left-2 right-2 flex flex-col-reverse gap-1">
              {elements.map((elem, idx) => {
                const isTop = idx === topIndex;
                const isHighlighted = highlight?.includes(idx);

                return (
                  <div
                    key={`${idx}-${elem}`}
                    className={`
                      relative flex items-center justify-center h-10 rounded-lg font-bold text-sm
                      transition-all duration-300 shadow-md
                      ${isHighlighted
                        ? 'bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-600)] text-white ring-2 ring-[var(--color-primary-300)]'
                        : isTop
                          ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 text-white ring-2 ring-cyan-300'
                          : 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
                      }
                    `}
                  >
                    {elem}
                    {isTop && (
                      <span className="absolute -right-12 text-xs text-cyan-400 font-medium whitespace-nowrap">
                        ← TOP
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Empty state */}
            {elements.length === 0 && !showPushAnimation && (
              <div className="absolute inset-0 flex items-center justify-center text-[var(--text-tertiary)] text-sm">
                Empty
              </div>
            )}
          </div>

          <span className="mt-2 text-xs text-[var(--text-tertiary)]">STACK</span>
        </div>

        {/* Output Queue - BELOW the stack, with wrapping */}
        {outputQueue && outputQueue.length > 0 && (
          <div className="w-full mt-4 pt-4 border-t border-[var(--border-primary)]">
            <div className="text-xs text-[var(--text-secondary)] mb-2 text-center">Output Queue</div>
            <div className="flex flex-wrap gap-1 justify-center px-2 py-2 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-secondary)] min-h-[36px]">
              {outputQueue.map((item, idx) => (
                <div
                  key={idx}
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-md font-bold text-xs
                    transition-all duration-300
                    ${idx === outputQueue.length - 1
                      ? 'bg-emerald-500 text-white scale-105'
                      : 'bg-[var(--color-accent-sorted)] text-white'
                    }
                  `}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-3 mt-4 justify-center text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600" />
          <span className="text-[var(--text-secondary)]">Top</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-slate-500 to-slate-600" />
          <span className="text-[var(--text-secondary)]">Element</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600" />
          <span className="text-[var(--text-secondary)]">Push</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600" />
          <span className="text-[var(--text-secondary)]">Pop</span>
        </div>
      </div>
    </div>
  );
}

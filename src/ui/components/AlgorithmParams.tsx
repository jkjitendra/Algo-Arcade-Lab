"use client";

import { useState } from "react";
import { AlgorithmParameter } from "@/core/algorithms/IAlgorithm";

interface NumberInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  defaultValue: number;
  onChange: (value: number) => void;
}

/**
 * Custom number input that allows clearing the field completely
 * before entering a new value. Uses local string state while editing.
 */
function NumberInput({ min, max, step, value, defaultValue, onChange }: NumberInputProps) {
  // Use string state to allow empty input while typing
  const [localValue, setLocalValue] = useState<string>(value.toString());
  const [isFocused, setIsFocused] = useState(false);

  // Sync with external value when not focused
  const displayValue = isFocused ? localValue : value.toString();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // If it's a valid number, update parent immediately
    const parsed = parseInt(newValue);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // On blur, if empty or invalid, reset to default
    const parsed = parseInt(localValue);
    if (isNaN(parsed) || localValue === '') {
      setLocalValue(defaultValue.toString());
      onChange(defaultValue);
    } else {
      // Clamp to min/max
      const clamped = Math.min(max, Math.max(min, parsed));
      setLocalValue(clamped.toString());
      onChange(clamped);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setLocalValue(value.toString());
  };

  return (
    <input
      type="number"
      min={min}
      max={max}
      step={step}
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="w-20 px-2 py-1 text-sm font-mono bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)]"
    />
  );
}

interface AlgorithmParamsProps {
  parameters: AlgorithmParameter[];
  values: Record<string, number | string>;
  onChange: (values: Record<string, number | string>) => void;
}

export function AlgorithmParams({ parameters, values, onChange }: AlgorithmParamsProps) {
  const handleChange = (id: string, value: number | string) => {
    onChange({ ...values, [id]: value });
  };

  if (parameters.length === 0) return null;

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
        <span className="text-lg">⚙️</span>
        Algorithm Parameters
      </h3>

      <div className="space-y-3">
        {parameters.map((param) => (
          <div key={param.id} className={param.type === 'select' || param.type === 'text' ? 'space-y-1' : 'flex items-center justify-between gap-4'}>
            <label className="text-sm text-[var(--text-secondary)] flex-shrink-0">
              {param.label}
            </label>

            {param.type === 'number' && (
              <NumberInput
                min={param.min}
                max={param.max}
                step={param.step || 1}
                value={values[param.id] as number ?? param.default}
                defaultValue={param.default}
                onChange={(val) => handleChange(param.id, val)}
              />
            )}

            {param.type === 'select' && (
              <select
                value={values[param.id] as string ?? param.default}
                onChange={(e) => handleChange(param.id, e.target.value)}
                className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
              >
                {param.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {param.type === 'text' && (
              <input
                type="text"
                value={(values[param.id] as string ?? param.default).toUpperCase()}
                onChange={(e) => handleChange(param.id, e.target.value.toUpperCase())}
                placeholder={param.placeholder || 'Enter text...'}
                maxLength={param.maxLength || 20}
                className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg px-2 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
              />
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-[var(--text-tertiary)] mt-3">
        💡 Change parameters and click &quot;Apply &amp; Run&quot; to see the effect
      </p>
    </div>
  );
}

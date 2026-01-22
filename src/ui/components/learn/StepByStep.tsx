import { ReactNode } from "react";

interface Step {
  title: string;
  description: ReactNode;
}

interface StepByStepProps {
  steps: Step[];
}

/**
 * Numbered step sequence with visual connectors.
 * Used to break down algorithm procedures into digestible steps.
 */
export function StepByStep({ steps }: StepByStepProps) {
  return (
    <div className="relative mb-6">
      {steps.map((step, index) => (
        <div key={index} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-10 w-0.5 h-[calc(100%-2.5rem)] bg-gradient-to-b from-[var(--color-primary-500)] to-[var(--color-secondary-500)]" />
          )}

          {/* Step number */}
          <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-bold text-sm">{index + 1}</span>
          </div>

          {/* Content */}
          <div className="flex-1 pt-1">
            <h4 className="font-semibold text-[var(--text-primary)] mb-1">
              {step.title}
            </h4>
            <div className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

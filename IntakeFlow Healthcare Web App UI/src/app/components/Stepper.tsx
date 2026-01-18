import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                index < currentStep
                  ? 'bg-[#0D9488] text-white'
                  : index === currentStep
                  ? 'bg-[#0D9488] text-white'
                  : 'bg-[#E5E7EB] text-[#9CA3AF]'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span
              className={`text-xs ${
                index <= currentStep ? 'text-[#111827]' : 'text-[#9CA3AF]'
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 ${
                index < currentStep ? 'bg-[#0D9488]' : 'bg-[#E5E7EB]'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

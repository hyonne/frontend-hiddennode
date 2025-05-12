"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface StepperProps {
  steps: {
    id: number
    title: string
    subtitle: string
    description: string
    icon: React.ReactNode
  }[]
  initialStep?: number
}

export default function Stepper({ steps, initialStep = 1 }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  return (
    <div className="w-full">
      {/* 스텝 인디케이터 */}
      <div className="flex items-center justify-between mb-16">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* 스텝 원형 아이콘 */}
            <button
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 text-lg font-medium z-10",
                currentStep >= step.id ? "bg-[#3AA5D1] text-white" : "bg-gray-700 text-gray-400",
              )}
            >
              {step.id}
            </button>

            {/* 연결선 (마지막 스텝 제외) */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2">
                <div className={cn("h-full", currentStep > step.id ? "bg-[#3AA5D1]" : "bg-gray-700")} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 스텝 아이콘 */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {steps.map((step) => (
          <div key={`icon-${step.id}`} className="flex justify-center">
            <div
              className={cn(
                "w-16 h-16 flex items-center justify-center border-2 rounded-sm",
                currentStep >= step.id ? "border-[#3AA5D1] text-[#3AA5D1]" : "border-gray-600 text-gray-600",
              )}
            >
              {step.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 스텝 제목 */}
      <div className="grid grid-cols-3 gap-8 mb-4">
        {steps.map((step) => (
          <div key={`title-${step.id}`} className="text-center">
            <h3 className={cn("text-sm font-bold", currentStep >= step.id ? "text-[#3AA5D1]" : "text-gray-400")}>
              STEP{step.id}
            </h3>
            <h4 className="text-white font-bold mt-2">{step.title}</h4>
          </div>
        ))}
      </div>

      {/* 스텝 설명 */}
      <div className="grid grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={`desc-${step.id}`} className="text-center">
            <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

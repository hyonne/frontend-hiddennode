"use client"

import type React from "react"
import { useStepper } from "react-progress-stepper-ts"
import { useEffect, useRef, useState } from "react"

interface StepData {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

interface StepperSectionProps {
  steps: StepData[]
}

export default function StepperSection({ steps }: StepperSectionProps) {
  const { step, incrementStep, decrementStep } = useStepper(0, steps.length - 1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollLock, setScrollLock] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // 스크롤 이벤트 처리
  const handleWheel = (e: WheelEvent) => {
    if (!isInView || scrollLock) return

    // step 전환이 가능한 경우 → 페이지 스크롤 막고 스텝만 넘김 코드
    const canScrollDown = e.deltaY > 0 && step < steps.length - 1
    const canScrollUp = e.deltaY < 0 && step > 0

    if (canScrollDown || canScrollUp) {
      setScrollLock(true)
      document.body.style.overflow = "hidden"

      if (canScrollDown) incrementStep()
      if (canScrollUp) decrementStep()

      setTimeout(() => {
        setScrollLock(false)
      }, 600)
    }

    // 경계에 도달했을 때는 다시 페이지 스크롤 허용 코드
    if (
      (e.deltaY > 0 && step === steps.length - 1) || // 마지막 step → 아래로
      (e.deltaY < 0 && step === 0) // 첫 step → 위로
    ) {
      document.body.style.overflow = "auto"
    } else {
      e.preventDefault()
    }
  }

  // 섹션이 뷰포트 중앙에 위치하는지 감지코드
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = "auto"
        }
      },
      {
        threshold: 0.6,
      }
    )

    const current = sectionRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
      document.body.style.overflow = "auto"
    }
  }, [])

  // 휠 이벤트 바인딩
  useEffect(() => {
    const node = sectionRef.current
    if (node) node.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      if (node) node.removeEventListener("wheel", handleWheel)
    }
  }, [step, scrollLock, isInView])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="w-full">
          {/* 스텝 인디케이터 */}
          <div className="relative flex items-center justify-between mb-16 overflow-visible">
            {steps.map((stepData, index) => (
              <div key={stepData.id} className="relative flex-1 flex justify-center">
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-1/2 z-0 h-1"
                    style={{
                      width: "calc(100% - 48px)",
                      left: "calc(50% + 24px)",
                      backgroundColor: step > index ? "#3AA5D1" : "#374151",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                <button
                  onClick={() =>
                    index < step ? decrementStep() : index > step ? incrementStep() : null
                  }
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 text-lg font-medium ${
                    step >= index ? "bg-[#3AA5D1] text-white" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {stepData.id}
                </button>
              </div>
            ))}
          </div>

          {/* 아이콘 */}
          <div
            className="grid gap-8 mb-8"
            style={{
              gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
            }}
          >
            {steps.map((stepData, index) => (
              <div key={`icon-${stepData.id}`} className="flex justify-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center border-2 rounded-sm ${
                    step >= index ? "border-[#3AA5D1] text-[#3AA5D1]" : "border-gray-600 text-gray-600"
                  }`}
                >
                  {stepData.icon}
                </div>
              </div>
            ))}
          </div>

          {/* 제목 */}
          <div
            className="grid gap-8 mb-4"
            style={{
              gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
            }}
          >
            {steps.map((stepData, index) => (
              <div key={`title-${stepData.id}`} className="text-center">
                <h3
                  className={`text-sm font-bold ${
                    step >= index ? "text-[#3AA5D1]" : "text-gray-400"
                  }`}
                >
                  STEP{stepData.id}
                </h3>
                <h4 className="text-white font-bold mt-2">{stepData.title}</h4>
              </div>
            ))}
          </div>

          {/* 설명 */}
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
            }}
          >
            {steps.map((stepData, index) => (
              <div key={`desc-${stepData.id}`} className="text-center">
                <p className="text-xs text-gray-400 leading-relaxed">
                  {stepData.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

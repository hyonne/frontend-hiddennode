"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StepData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepperSectionProps {
  steps: StepData[];
}

export default function StepperSection({ steps }: StepperSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  // 🔁 자동 2초 간격 step 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      className="snap-start relative h-[calc(100vh-5rem)] overflow-hidden bg-black"
    >
      <div className="sticky top-0 px-4 py-4">
        {/* 상단 타이틀 */}
        <div className="flex justify-end mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#A773AB] tracking-[0.25em]">
            기록 밖의 독립운동가를 밝히다.
          </h1>
        </div>

        <div className="max-w-7xl mx-auto mt-24">
          {/* 스텝 인디케이터 */}
          <div className="relative flex items-center justify-between mb-16">
            {steps.map((s, i) => (
              <div key={s.id} className="relative flex-1 flex justify-center">
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-1/2 z-0 h-1 transition-colors duration-300",
                      step > i ? "bg-[#A773AB]" : "bg-gray-600"
                    )}
                    style={{
                      width: "calc(100% - 56px)",
                      left: "calc(50% + 28px)",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                <button
                  className={cn(
                    "relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300",
                    step === i
                      ? "bg-[#A773AB] text-white"
                      : step > i
                      ? "bg-[#A773AB]/50 text-white"
                      : "bg-gray-700 text-gray-400"
                  )}
                >
                  {s.id}
                </button>
              </div>
            ))}
          </div>

          {/* 아이콘 */}
          <div className="grid grid-cols-3 gap-12 mb-8">
            {steps.map((s, i) => (
              <div key={`icon-${s.id}`} className="flex justify-center">
                <div
                  className={cn(
                    "w-16 h-16 flex items-center justify-center border-2 rounded-sm text-xl transition-colors duration-300",
                    step === i
                      ? "border-[#A773AB] text-[#A773AB]"
                      : step > i
                      ? "border-[#A773AB]/50 text-[#A773AB]/50"
                      : "border-gray-600 text-gray-600"
                  )}
                >
                  {s.icon}
                </div>
              </div>
            ))}
          </div>

          {/* STEP 제목 */}
          <div className="grid grid-cols-3 gap-12 mb-6">
            {steps.map((s, i) => (
              <div key={`title-${s.id}`} className="text-center">
                <h3
                  className={cn(
                    "text-base font-bold transition-colors duration-300",
                    step === i
                      ? "text-[#A773AB]"
                      : step > i
                      ? "text-[#A773AB]/50"
                      : "text-gray-400"
                  )}
                >
                  STEP{s.id}
                </h3>
                <h4 className="text-xl text-white font-bold mt-2">{s.title}</h4>
              </div>
            ))}
          </div>

          {/* 설명 */}
          <div className="grid grid-cols-3 gap-12">
            {steps.map((s, i) => (
              <div key={`desc-${s.id}`} className="text-center">
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

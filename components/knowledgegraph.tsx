"use client"

import { useState } from "react"
import { ChevronRight, X, Clock, ChevronDown, Bookmark } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function KnowledgeGraph() {
  const [activeTab, setActiveTab] = useState<string>("설명사이드바")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex w-full h-full bg-gray-100">
      <div className="flex flex-col flex-1">
        <div className="flex-1 relative overflow-hidden">
          <div className="w-full h-full relative bg-gray-100">
            {/* Floating Buttons (상단 좌측) */}
            <div
              className={`absolute top-4 z-10 flex space-x-2 transition-all duration-300 ${
                sidebarOpen ? "left-[370px]" : "left-4"
              }`}
            >
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-black shadow-md"
              >
                버튼 1
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-black shadow-md"
              >
                버튼 2
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-black shadow-md"
              >
                버튼 3
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-black shadow-md"
              >
                버튼 4
              </Button>
            </div>

            {/* 메인 이미지 */}
            <div className="w-full h-full">
              <Image
                src="./images/main01.png"
                alt="graph placeholder"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>

            {/* ✅ 우측 하단 확대/축소 버튼 */}
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-20">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-black shadow-md w-10 h-10 flex items-center justify-center"
                aria-label="확대"
              >
                +
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-black shadow-md w-10 h-10 flex items-center justify-center"
                aria-label="축소"
              >
                –
              </Button>
            </div>
          </div>

          {/* 사이드바 */}
          <div
            className={`absolute top-0 left-0 h-full w-[350px] bg-gray-200 border-r overflow-y-auto transition-transform duration-300 z-30 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 border-b">
              <h1 className="text-xl text-black font-bold">년도</h1>
            </div>

            {/* 메인 배너 */}
            <div className="relative p-3 bg-gray-200 border-b">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="text-sm text-black font-medium">사건 이름</div>
                  <div className="text-xs text-black">성명</div>
                  <div className="text-xs text-black">간단한 설명</div>
                </div>
              </div>
            </div>

            {/* 설명 섹션 */}
            <div className="p-4 border-b">
              <div className="flex items-center mb-4">
                <h2 className="text-lg text-black font-bold">지식그래프 설명</h2>
              </div>

              {/* 탭 */}
              <div className="flex justify-between mb-4">
                <div
                  className={`font-medium cursor-pointer ${
                    activeTab === "주변" ? "text-black" : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("주변")}
                >
                  사진
                </div>
              </div>

              {/* 이미지 아이템 */}
              <div className="mb-4">
                <div className="relative mb-2">
                  <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src="/images/main04_bg.png"
                      alt="Place image"
                      width={320}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-gray-700 font-medium">년도 또는 사건 또는 성명</div>
                </div>
                <div className="text-xs text-gray-500 mb-1">이름 또는 사건명</div>
                <div className="text-xs text-gray-500 mb-2 truncate">
                  설명글...
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 토글 버튼 */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 z-40 transition-transform duration-300 ${
              sidebarOpen ? "left-[350px]" : "left-0"
            }`}
          >
            <button
              onClick={toggleSidebar}
              className="bg-gray-200 h-16 w-6 flex items-center justify-center rounded-r-lg shadow-md border-t border-r border-b border-gray-200"
            >
              <ChevronRight
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  sidebarOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


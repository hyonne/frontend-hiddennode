'use client'

import { useState } from 'react'
import { Info, X } from 'lucide-react'

export default function TranslationInfo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* 정보 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="번역 정보"
      >
        <Info className="w-5 h-5" />
      </button>

      {/* 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              🌐 번역 기능 정보
            </h3>
            
            <div className="text-sm text-gray-700 space-y-3">
              <div>
                <h4 className="font-semibold text-blue-600 mb-1">현재 상태:</h4>
                <p>✅ <strong>정적 번역</strong> 사용 중 (API 키 불필요)</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-600 mb-1">정적 번역이란?</h4>
                <p>미리 정의된 번역 텍스트를 사용하여 즉시 언어 변경이 가능합니다.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-600 mb-1">동적 번역 (DeepL API):</h4>
                <p>사용자가 입력한 텍스트를 실시간으로 번역할 때만 API 키가 필요합니다.</p>
              </div>
              
              <div className="bg-gray-100 p-3 rounded">
                <h4 className="font-semibold text-green-600 mb-1">지원 언어:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>🇰🇷 한국어 (기본)</li>
                  <li>🇺🇸 영어</li>
                  <li>🇯🇵 일본어</li>
                  <li>🇨🇳 중국어</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "@/contexts/TranslationContext"
import LanguageDropdown from "@/components/LanguageDropdown"

export default function Header() {
  const { translate } = useTranslation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white backdrop-blur supports-[backdrop-filter]:bg-black/75">
      <div className="w-full h-20 flex items-center px-6">
        <div className="flex items-center">
          {/* 로고 */}
          <Image
            src="/images/logo.png"
            alt="logo"
            width={160}
            height={64}
            className="h-[64px] w-auto object-contain"
          />

          {/* 메뉴 리스트 */}
          <nav className="flex gap-6 text-sm font-medium pl-[30px]">
            <Link
              href="/"
              className="relative hover:text-[#e9e4da] transition-colors duration-300 
                         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 
                         after:h-[2px] after:bg-[#e9e4da] after:transition-all after:duration-300 
                         hover:after:w-full"
            >
              {translate('main')}
            </Link>
            <Link
              href="/graph"
              className="relative hover:text-[#e9e4da] transition-colors duration-300 
                         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 
                         after:h-[2px] after:bg-[#e9e4da] after:transition-all after:duration-300 
                         hover:after:w-full"
            >
              {translate('graph')}
            </Link>
            <Link
              href="/dataroom"
              className="relative hover:text-[#e9e4da] transition-colors duration-300 
                         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 
                         after:h-[2px] after:bg-[#e9e4da] after:transition-all after:duration-300 
                         hover:after:w-full"
            >
              {translate('dataroom')}
            </Link>
          </nav>
        </div>
        
        {/* 언어 선택 드롭다운 */}
        <div className="ml-auto">
          <LanguageDropdown />
        </div>
      </div>
    </header>
  )
}
'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe } from "lucide-react"
import { useTranslation, Language } from "@/contexts/TranslationContext"

// 언어 정보 배열
const languages = [
  { code: 'ko' as Language, name: 'language_ko', flag: '🇰🇷' },
  { code: 'en' as Language, name: 'language_en', flag: '🇺🇸' },
  { code: 'ja' as Language, name: 'language_ja', flag: '🇯🇵' },
  { code: 'zh' as Language, name: 'language_zh', flag: '🇨🇳' },
]

export default function LanguageDropdown() {
  const { currentLanguage, setLanguage, translate, isLoading } = useTranslation()

  // 현재 선택된 언어 정보
  const currentLangInfo = languages.find(lang => lang.code === currentLanguage)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/10 transition-colors duration-200 flex items-center gap-2"
          disabled={isLoading}
        >
          <Globe className="h-4 w-4" />
          <span className="flex items-center gap-1">
            {currentLangInfo?.flag}
            {translate(currentLangInfo?.name || 'language_ko')}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="min-w-[160px] bg-black/90 border-white/20 backdrop-blur-sm"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`
              flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors
              text-white hover:bg-white/10 focus:bg-white/10
              ${currentLanguage === language.code ? 'bg-white/5' : ''}
            `}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">
              {translate(language.name)}
            </span>
            {currentLanguage === language.code && (
              <span className="text-xs text-white/60">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

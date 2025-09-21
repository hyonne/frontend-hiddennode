import { useState, useCallback } from 'react'
import { Language } from '@/contexts/TranslationContext'

interface TranslationResponse {
  translatedText: string
  detectedSourceLang?: string
}

interface UseTranslationServiceReturn {
  translateText: (text: string, targetLanguage: Language) => Promise<string>
  isTranslating: boolean
  translationError: string | null
}

export function useTranslationService(): UseTranslationServiceReturn {
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationError, setTranslationError] = useState<string | null>(null)

  const translateText = useCallback(async (text: string, targetLanguage: Language): Promise<string> => {
    // 빈 문자열이거나 한국어인 경우 원본 반환
    if (!text.trim() || targetLanguage === 'ko') {
      return text
    }

    setIsTranslating(true)
    setTranslationError(null)

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          targetLanguage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Translation failed')
      }

      const data: TranslationResponse = await response.json()
      return data.translatedText

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Translation failed'
      setTranslationError(errorMessage)
      console.error('Translation error:', error)
      
      // 에러 발생시 원본 텍스트 반환
      return text
      
    } finally {
      setIsTranslating(false)
    }
  }, [])

  return {
    translateText,
    isTranslating,
    translationError,
  }
}

import { NextRequest, NextResponse } from 'next/server'
import * as deepl from 'deepl-node'

// DeepL 번역기 초기화
const translator = new deepl.Translator(process.env.DEEPL_API_KEY || '')

// 지원하는 언어 코드 매핑
const languageMap: { [key: string]: string } = {
  'ko': 'KO',
  'en': 'EN-US', 
  'ja': 'JA',
  'zh': 'ZH'
}

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json()

    // 입력 검증
    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      )
    }

    // API 키 확인
    if (!process.env.DEEPL_API_KEY) {
      return NextResponse.json(
        { error: 'DeepL API key not configured' },
        { status: 500 }
      )
    }

    // 지원하지 않는 언어 확인
    const deeplTargetLang = languageMap[targetLanguage]
    if (!deeplTargetLang) {
      return NextResponse.json(
        { error: 'Unsupported target language' },
        { status: 400 }
      )
    }

    // 이미 같은 언어인 경우 원본 반환
    if (targetLanguage === 'ko') {
      return NextResponse.json({ translatedText: text })
    }

    // DeepL API 호출
    const result = await translator.translateText(
      text,
      'ko', // 한국어에서
      deeplTargetLang as deepl.TargetLanguageCode
    )

    return NextResponse.json({
      translatedText: result.text,
      detectedSourceLang: result.detectedSourceLang
    })

  } catch (error) {
    console.error('Translation error:', error)
    
    // DeepL API 에러 처리
    if (error instanceof deepl.DeepLError) {
      return NextResponse.json(
        { error: `DeepL API error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}

// 사용량 확인 API
export async function GET() {
  try {
    if (!process.env.DEEPL_API_KEY) {
      return NextResponse.json(
        { error: 'DeepL API key not configured' },
        { status: 500 }
      )
    }

    const usage = await translator.getUsage()
    
    return NextResponse.json({
      characterCount: usage.character?.count || 0,
      characterLimit: usage.character?.limit || 0,
      characterUsagePercent: usage.character ? 
        Math.round((usage.character.count / usage.character.limit) * 100) : 0
    })

  } catch (error) {
    console.error('Usage check error:', error)
    return NextResponse.json(
      { error: 'Failed to get usage information' },
      { status: 500 }
    )
  }
}

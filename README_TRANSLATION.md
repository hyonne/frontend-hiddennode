# 번역 기능 설정 가이드

## 🌐 번역 기능 개요
- DeepL API를 사용한 다국어 번역 기능이 포함되어 있습니다.

### 지원 언어
- 🇰🇷 한국어 (기본)
- 🇺🇸 영어
- 🇯🇵 일본어
- 🇨🇳 중국어

## ⚙️ 설정 방법

### 1. DeepL API 키 발급
1. [DeepL API 홈페이지](https://www.deepl.com/pro-api)

### 2. 환경변수 설정
```bash
# .env.local 파일 생성
cp .env.example .env.local

# .env.local 파일에 API 키 입력
DEEPL_API_KEY=your_actual_api_key_here
```

### 번역 텍스트 추가
`contexts/TranslationContext.tsx` 파일의 `defaultTexts`

```typescript
new_text_key: {
  ko: '한국어 텍스트',
  en: 'English Text',
  ja: '日本語テキスト',
  zh: '中文文本'
}
```

### 컴포넌트에서 번역 사용
```typescript
import { useTranslation } from '@/contexts/TranslationContext'

function MyComponent() {
  const { translate } = useTranslation()
  
  return (
    <div>
      <h1>{translate('new_text_key')}</h1>
    </div>
  )
}
```
## 📝 API 사용량 확인
번역 API 사용량은 `/api/translate` 엔드포인트의 GET 요청으로 확인할 수 있습니다.

## 🔧 주요 파일
- `contexts/TranslationContext.tsx` - 번역 컨텍스트 및 정적 번역 텍스트
- `components/LanguageDropdown.tsx` - 언어 선택 드롭다운
- `app/api/translate/route.ts` - DeepL API 호출 엔드포인트
- `hooks/use-translation-service.ts` - 번역 서비스 훅 (동적 번역용)

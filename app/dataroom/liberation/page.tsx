'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/contexts/TranslationContext'

export default function IntroPage() {
  const { translate } = useTranslation()
  return (
    <>
      <Header />
        <main className="w-full bg-black text-white px-6 md:px-32 pt-20 pb-20 py-10 text-[27px]">
        {/* 상단 네비게이션 - 오른쪽 상단 위치 */}
        <div className="flex justify-end mb-3">
            <div className="text-base text-white flex items-center pb-10 gap-2 font-medium">
            <Link href="/dataroom" className="flex items-center hover:underline">
                <Home className="w-4 h-4 mr-1" />
                <span className="mr-2">{translate('dataroom_breadcrumb')}</span>
            </Link>
            <span>·</span>
            <span className="text-[#A773AB]">{translate('liberation_title')}</span>
            </div>
        </div>

        {/* 페이지 제목 */}
        <div className="text-[60px] text-white font-bold leading-none mb-6">{translate('dataroom_breadcrumb')}</div>

        <h1 className="text-[40px] text-white mb-10">{translate('liberation_title')}</h1>
        <br />
        <br />

        {/* 소제목 - 광복의 기쁨 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mb-6">{translate('liberation_joy_title')}</h2>

        {/* 이미지 + 설명문 가로 배치 */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
        {/* 이미지 왼쪽 */}
        <div className="w-full md:w-[700px] flex-shrink-0 self-start">
            <Image
            src="/images/liberation.png"
            alt="광복 이미지"
            width={700}
            height={600}
            className="rounded-md"
            />
        </div>

        {/* 텍스트 오른쪽 */}
        <div className="flex-1 text-white leading-relaxed text-[27px]">
            <p className="mb-4">
            {translate('liberation_content_1')}
            </p>
            <p className="mb-4">
            {translate('liberation_content_2')}
            </p>
        </div>
        </div>
            <p className="mb-3 leading-relaxed">
            {translate('liberation_content_3')}
            </p>
            <p className="mb-3 leading-relaxed">
            {translate('liberation_content_4')}
            </p>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        
        {/* 추천 콘텐츠 영역 */}
        <div className="mt-10 mb-10">
        <h2 className="text-2xl font-bold text-center mb-6">{translate('other_content_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dataroom/intro">
            <FeaturedCard image="/images/intro.png?height=200&width=300" title={translate('featured_card_intro')} />
            </Link>
            <Link href="/dataroom/occupation">
            <FeaturedCard image="/images/occupation.png?height=200&width=300" title={translate('featured_card_occupation')} />
            </Link>
            <Link href="/dataroom/liberation">
            <FeaturedCard image="/images/liberation.png?height=200&width=300" title={translate('featured_card_liberation')} />
            </Link>
        </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function FeaturedCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative rounded-md overflow-hidden hover:shadow-lg transition">
      <Image
        src={image || "/images/로고_검정ver.png"}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
        <p className="text-sm">{title}</p>
      </div>
    </div>
  )
}


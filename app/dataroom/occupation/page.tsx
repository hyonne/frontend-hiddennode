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
            <span className="text-[#A773AB]">{translate('occupation_title')}</span>
            </div>
        </div>

        {/* 페이지 제목 */}
        <div className="text-[60px] text-white font-bold leading-none mb-6">{translate('dataroom_breadcrumb')}</div>

        <h1 className="text-[40px] text-white mb-10">{translate('occupation_title')}</h1>
        <br />
        <br />

        {/* 소제목 - 구축 목적 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mb-6">{translate('occupation_title')}</h2>

        {/* 이미지 + 설명문 가로 배치 */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
        {/* 이미지 왼쪽 */}
        <div className="w-full md:w-[700px] flex-shrink-0">
            <Image
            src="/images/occupation.png"
            alt="일제강점기 체포와 수형,그리고 기록물 이미지"
            width={600}
            height={500}
            className="rounded-md"
            />
        </div>

        {/* 텍스트 오른쪽 */}
        <div className="flex-1 text-white leading-relaxed text-[27px]">
            <p className="mb-4">
            {translate('occupation_content_1')}
          </p>
        </div>
        </div>

        <br />
        <br />
        <br />

        {/* 소제목 2 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mt-14 mb-6">
          {translate('occupation_subtitle_1')}
        </h2>

        {/* 소소제목 가. */}
        <h3 className="text-[#A773AB] text-[25px] font-semibold mb-3">{translate('modern_judicial_introduction')}</h3>
        <p className="mb-4 leading-relaxed">
          {translate('modern_judicial_text')}
        </p>
        <br />
        {/* 소소제목 나. */}
        <h3 className="text-[#A773AB] text-[25px] font-semibold mt-8 mb-3">{translate('japanese_judicial_control')}</h3>
        <p className="mb-3 leading-relaxed">
          <strong>{translate('before_occupation')}</strong><br />
          {translate('before_occupation_text')}
        </p>
        <br />
        <p className="mb-3 leading-relaxed">
          <strong>{translate('after_occupation')}</strong><br />
          {translate('after_occupation_text')}
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


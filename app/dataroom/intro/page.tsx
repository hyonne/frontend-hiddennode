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
            <span className="text-[#A773AB]">{translate('intro_title')}</span>
            </div>
        </div>

        {/* 페이지 제목 */}
        <div className="text-[60px] text-white font-bold leading-none mb-6">{translate('dataroom_breadcrumb')}</div>

        <h1 className="text-[40px] text-white mb-10">{translate('intro_title')}</h1>
        <br />
        <br />

        {/* 소제목 - 구축 목적 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mb-6">{translate('construction_purpose')}</h2>

        {/* 이미지 + 설명문 가로 배치 */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
        {/* 이미지 왼쪽 */}
        <div className="w-full md:w-[500px] flex-shrink-0">
            <Image
            src="/images/intro.png"
            alt="판결문 콘텐츠 이미지"
            width={600}
            height={500}
            className="rounded-md"
            />
        </div>

        {/* 텍스트 오른쪽 */}
        <div className="flex-1 text-white leading-relaxed text-[27px]">
            <p className="mb-4">
            {translate('intro_content_1')}
            </p>
            <p className="mb-4">
            {translate('intro_content_2')}
            </p>
            <p>
            {translate('intro_content_3')}
            </p>
        </div>
        </div>

        <br />
        <br />
        <br />

        {/* 소제목 - 판결문 추출기준 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mb-3">{translate('judgment_extraction_title')}</h2>
        <p className="mb-3">
          {translate('judgment_extraction_criteria_text_1')}
        </p>
        <p className="mb-3">
          {translate('judgment_extraction_criteria_text_2')}
        </p>
        <br />
        {/* 현황 표 제목 */}
        <h3 className="text-[#A773AB] text-center text-[25px] font-semibold mb-3">
          {translate('records_status_table_title')}
        </h3>
        <br />
        {/* 표 */}
        <div className="flex justify-center mb-6">
          <table className="border border-[#A773AB] text-center text-sm w-[900px]">
            <thead className="bg-[#f8f5ea] text-[#333]">
              <tr>
                <th className="border px-4 py-2">{translate('table_classification')}</th>
                <th className="border px-4 py-2">{translate('table_judgment_documents')}</th>
                <th className="border px-4 py-2">{translate('table_criminal_case_register')}</th>
                <th className="border px-4 py-2">{translate('table_execution_register')}</th>
                <th className="border px-4 py-2">{translate('table_prisoner_register')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">{translate('table_quantity')}</td>
                <td className="border px-4 py-2">19,167</td>
                <td className="border px-4 py-2">11,890</td>
                <td className="border px-4 py-2">10,706</td>
                <td className="border px-4 py-2">22,144</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 주석 */}
        <div className="text-[20px] space-y-1 text-left w-[900px] mx-auto">
          <p>{translate('records_note_1')}</p>
          <p>{translate('records_note_2')}</p>
        </div>

        <br />
        <br />

        {/* 소제목 - 독립운동 관련 기록물의 성격 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mt-14 mb-3">
        {translate('records_nature_title')}
        </h2>
        <p className="mb-3">
        {translate('records_nature_text_1')}
        </p>
        <p className="mb-3">
        {translate('records_nature_text_2')}
        </p>
        <p>
        {translate('records_nature_text_3')}
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


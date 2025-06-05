'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function IntroPage() {
  return (
    <>
      <Header />
        <main className="w-full bg-black text-white px-6 md:px-32 pt-20 pb-20 py-10 text-[20px]">
        {/* 상단 네비게이션 - 오른쪽 상단 위치 */}
        <div className="flex justify-end mb-3">
            <div className="text-base text-white flex items-center pb-10 gap-2 font-medium">
            <Link href="/dataroom" className="flex items-center hover:underline">
                <Home className="w-4 h-4 mr-1" />
                <span className="mr-2">자료실</span>
            </Link>
            <span>·</span>
            <span className="text-[#A773AB]">판결문 콘텐츠 소개</span>
            </div>
        </div>

        {/* 페이지 제목 */}
        <div className="text-[60px] text-white font-bold leading-none mb-6">자료실</div>

        <h1 className="text-[40px] text-white mb-10">판결문 콘텐츠 소개</h1>
        <br />
        <br />

        {/* 소제목 - 구축 목적 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mb-6">구축 목적</h2>

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
        <div className="flex-1 text-white leading-relaxed text-[20px]">
            <p className="mb-4">
            독립운동 역사가 정당한 평가를 받기 위해서는 독립운동에 헌신했던 선열들을 찾아 그 공적을 널리 알리고,
            당사자 및 후손들이 정당한 예우를 받도록 해야 합니다. 독립유공자와 후손들을 예우하는 것은
            국가의 정통성과 존엄성을 바로 세우는 일이기 때문입니다.
            </p>
            <p className="mb-4">
            독립운동가의 인적사항과 당시 활동상을 확인하기 위해서는 판결문이나 재소자 신분카드,
            범죄인 명부, 수형인 명부, 당시의 기관지, 정보 보고서, 신문 등이 많이 활용됩니다.
            그러나 사학을 전공한 전문가가 아닌 일반 개인이 이런 자료를 찾고 확인하기란 쉬운 일이 아니며,
            검색채널 또한 제한적입니다.
            </p>
            <p>
            따라서, 국가기록원에 소장중인 형사사건 판결문 중 독립운동 관련 판결문을 선별하고,
            내용 이해를 돕기 위해 판결주문을 번역, 사건개요 및 주제어 등을 작성하여
            일반국민들과 학술연구자들이 보다 쉽게 검색 활용할 수 있게 하기 위해 본 콘텐츠을 구축하였습니다.
            </p>
        </div>
        </div>

        <br />
        <br />
        <br />

        {/* 소제목 - 판결문 추출기준 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mb-3">독립운동 판결문 추출기준</h2>
        <p className="mb-3">
          독립운동 관련 기록물은 죄명과 판결 내용 등을 근거로 설정하였습니다. 죄명으로는 치안유지법, 보안법, 조선 임시 보안령, 대정8년 제령 제7호, 육군형법, 해군형법,
          내란, 불경죄, 출판법, 안녕질서에 관한 죄, 정치범 처벌규칙, 폭동 등과 관련한 기록물을 선정하였습니다.
        </p>
        <p className="mb-3">
          또한 죄명이 아니더라도, 판결문에 “독립운동”, “대한독립”, “가정부(假政府)”, “군자금 모집” 등의 독립운동 관련 용어 및 내용이 포함되어 있는 경우를 선정하여 추출하였습니다.
          아울러 본 콘텐츠은 독립운동의 개연성이 있는 기록물을 소개한 것으로 국가보훈인정 여부는 별도로 해당 기관에 직접 문의하셔야 함을 알려 드립니다.
        </p>
        <br />
        {/* 현황 표 제목 */}
        <h3 className="text-[#A773AB] text-center text-[22px] font-semibold mb-3">
          국가기록원 소장 독립운동 관련 기록물 정리 현황(2014년 현재)
        </h3>
        <br />
        {/* 표 */}
        <div className="flex justify-center mb-6">
          <table className="border border-[#A773AB] text-center text-sm w-[700px]">
            <thead className="bg-[#f8f5ea] text-[#444]">
              <tr>
                <th className="border px-4 py-2">구분</th>
                <th className="border px-4 py-2">판결문</th>
                <th className="border px-4 py-2">형사사건부</th>
                <th className="border px-4 py-2">집행원부</th>
                <th className="border px-4 py-2">수형인명부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">분량(건)</td>
                <td className="border px-4 py-2">19,167</td>
                <td className="border px-4 py-2">11,890</td>
                <td className="border px-4 py-2">10,706</td>
                <td className="border px-4 py-2">22,144</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 주석 */}
        <div className="text-[15px] space-y-1 text-left w-[700px] mx-auto">
          <p>* 단 일부 정리되지 않은 기록물이 있으므로 향후 숫자는 증가할 수 있음</p>
          <p>* 국가기록원은 위의 기록물과 아직 정리되지 않은 기록물들을 연차적으로 정리하여 기본정보 및 이미지를 지속적으로 제공할 예정입니다.</p>
        </div>

        <br />
        <br />

        {/* 소제목 - 독립운동 관련 기록물의 성격 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mt-14 mb-3">
        독립운동 관련 기록물의 성격
        </h2>
        <p className="mb-3">
        이 콘텐츠에 소개된 독립운동 관련 기록물은 대부분 행형기록물입니다.
        행형이란 좁은 의미로는 징역․금고․구류 등 자유형의 집행방법을 말합니다.
        자유형이란 범죄인을 사회로부터 격리시켜 개인의 신체적 자유를 제한하는 형벌을 의미합니다.
        </p>
        <p className="mb-3">
        그러나 넓은 의미로는 사형수의 수용, 노역장 유치, 미결수 수용까지도 포함한 개념입니다.
        행형제도는 수형자에 대한 교정, 교화와 사회복귀를 위하여 교육을 시키는 제도이며,
        행형기록은 그 과정에서 생산된 기록물이라고 할 수 있습니다.
        엄격한 의미에서 행형은 감옥에 수감된 이후, 즉 수형 이후의 상황을 일컫는 것이므로
        행형기록도 수형 이후의 기록만을 지칭해야 합니다.
        </p>
        <p>
        그러나, 국가기록원에서는 피의자가 기소되어 형을 판결 받고 그 형이 집행되는 과정에서
        생산되는 기록물 모두를 아울러서 ‘행형기록’으로 지칭하고 있습니다.
        이 콘텐츠에서 소개하는 독립운동 관련 기록물은 정확히 말하자면
        일제시기 형사소송 행형기록물 중 독립운동과 관련한 기록물이라고 할 수 있습니다.
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
        <h2 className="text-2xl font-bold text-center mb-6">다른 콘텐츠도 둘러보세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dataroom/intro">
            <FeaturedCard image="/images/intro.png?height=200&width=300" title="판결문 콘텐츠 소개" />
            </Link>
            <Link href="/dataroom/occupation">
            <FeaturedCard image="/images/main04_bg.png?height=200&width=300" title="국권피탈과 독립운동" />
            </Link>
            <Link href="/dataroom/liberation">
            <FeaturedCard image="/images/main02.jpg?height=200&width=300" title="해방" />
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


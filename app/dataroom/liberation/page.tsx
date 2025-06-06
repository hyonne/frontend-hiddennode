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
        <main className="w-full bg-black text-white px-6 md:px-32 pt-20 pb-20 py-10 text-[27px]">
        {/* 상단 네비게이션 - 오른쪽 상단 위치 */}
        <div className="flex justify-end mb-3">
            <div className="text-base text-white flex items-center pb-10 gap-2 font-medium">
            <Link href="/dataroom" className="flex items-center hover:underline">
                <Home className="w-4 h-4 mr-1" />
                <span className="mr-2">자료실</span>
            </Link>
            <span>·</span>
            <span className="text-[#A773AB]">해방</span>
            </div>
        </div>

        {/* 페이지 제목 */}
        <div className="text-[60px] text-white font-bold leading-none mb-6">자료실</div>

        <h1 className="text-[40px] text-white mb-10">해방</h1>
        <br />
        <br />

        {/* 소제목 - 광복의 기쁨 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mb-6">광복의 기쁨</h2>

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
        <div className="flex-1 max-w-[750px] text-white leading-relaxed text-[23px]">
            <p className="mb-4">
            1945년 8월 15일 조선은 일본 천황이 항복 사실을 발표하면서 해방되었다.
            지역에 따라 소식이 전해지는 데에는 시간차가 있었지만, 전국에서 해방을 환영하는 시위가 열렸다.
            식민통치를 상징하던 관공서, 주재소, 신사 등이 불붙던 지역도 상당했다.
            다만, 태평양전쟁 승전국인 미군과 소련군이 진주하기 전까지 일본군의 무장은 해제되지 않았고,
            조선 내 행정·치안은 공식적으로 조선총독부가 장악하고 있었다.
            </p>
            <p className="mb-4">
            조선총독부에 남아있던 행정·치안권은 남과 북에 미군과 소련이 진주하면서 해체되었다.
            이미 8월 중순부터 38도선 이북지역에 진주했던 소련군은 북한 지역 내 일본군에게 항복을 받고 무기를 접수하였으며,
            식민통치기구 및 일본인 소유 재산 등을 관리하기 시작했다.
            38도선 이남지역은 9월 8일 미군이 남한 지역에 상륙하고 다음날 서울에 진주하면서 조선총독부의 권한이 이양되었다.
            서울 진주와 동시에 미군은 "맥아더 사령부 포고 제1호"를 발표하면서 공식적으로 북위 38도 이남 지역의 점령통치를 선언하였다.
            </p>
        </div>
        </div>
            <p className="mb-3 leading-relaxed">
            이후 38도선을 경계로 남북 모두에서 군정청이 설치되면서 한반도는 사실상 분단의 길로 나아갔다.
            한편, 해방과 함께 한반도 내외부에서 대규모 이주가 시작되었다.
            식민지기 조선인의 해외이주는 대표적으로 일본으로 약 183만 명, 만주로 약 103만 명으로 추산되는데,
            해방이 되자 한반도로 귀환하기 시작했다.
            </p>
            <p className="mb-3 leading-relaxed">
            1945~1948년 사이에 귀한민과 월남민을 포함해 남한지역으로 들어온 인구는 약 250만 명,
            본국으로 돌아간 일본인은 약 60만 명으로 추정된다.
            『해방』 테마에서는 이 같은 시대적 분위기를 확인할 수 있는 영상이 상당수 수록되어 있다.
            미군의 인천 상륙 장면부터, 조선총독부 일장기 하강, 미군에 대한 환영식, 미군 조선 주둔 일본군의 항복문서에 서명 및 무장해제 등의 모습을 확인할 수 있다.
            또한 인천항과 부산항을 통해 해외이주민들이 귀환하는 모습, 일본군이 귀환하는 모습 역시 살펴볼 수 있다.
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
            <FeaturedCard image="/images/occupation.png?height=200&width=300" title="일제강점기 체포와 수형,그리고 기록물" />
            </Link>
            <Link href="/dataroom/liberation">
            <FeaturedCard image="/images/liberation.png?height=200&width=300" title="해방" />
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


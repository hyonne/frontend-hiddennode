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
            <span className="text-[#A773AB]">일제강점기 체포와 수형,그리고 기록물</span>
            </div>
        </div>

        {/* 페이지 제목 */}
        <div className="text-[60px] text-white font-bold leading-none mb-6">자료실</div>

        <h1 className="text-[40px] text-white mb-10">일제강점기 체포와 수형,그리고 기록물</h1>
        <br />
        <br />

        {/* 소제목 - 구축 목적 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mb-6">일제강점기 체포와 수형,그리고 기록물</h2>

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
            우리나라의 사법근대화는 1894년 갑오개혁기의 권설재판소로부터 시작되었다.
            그러나, 1909년 기유각서에 의해 사법제도는 일제에 완전히 장악되었고,
            일제강점기에는 식민지적 특수성을 갖는 왜곡된 형태로 변질되었다.
            일제의 식민통치는 우리민족 대다수가 이를 반대하였다는 점에서 강압적 치안유지와 일상적 감시체제를 통해 유지되었으며,
            경찰과 재판소, 감옥은 이를 위한 제도적 장치로 작동하였다.
          </p>
        </div>
        </div>

        <br />
        <br />
        <br />

        {/* 소제목 2 */}
        <h2 className="text-[#00D9FF] text-[35px] font-semibold mt-14 mb-6">
          일제의 사법제도, 조선을 지배하다.
        </h2>

        {/* 소소제목 가. */}
        <h3 className="text-[#A773AB] text-[25px] font-semibold mb-3">가. 근대 사법제도의 도입</h3>
        <p className="mb-4 leading-relaxed">
          우리나라에서 근대적 사법체계의 필요성은 1880년대 김옥균, 박영효 등 개화파에 의해 제기되기도 하였으나,
          구체화된 것은 1894년 갑오개혁기였다.
          이 시기에 법무아문이 신설되고 산하에 권설 재판소가 설치된 것이 그 시초라고 할 수 있다.
          이후 고등재판소, 평리원으로 이름이 바뀌어 유지되었고, 지방재판소와 감옥서도 점차 근대적 틀을 갖추게 되었다.
        </p>
        <br />
        {/* 소소제목 나. */}
        <h3 className="text-[#A773AB] text-[25px] font-semibold mt-8 mb-3">나. 일제의 사법제도 장악과 사법기구</h3>
        <p className="mb-3 leading-relaxed">
          <strong>1. 조선 강점 이전</strong><br />
          1907년 재판소 구성법 제정으로 일제는 구재판소, 지방재판소, 공소원, 대심원 체계를 만들고 일본인 판검사를 임용하기 시작했다.
          1909년 기유각서로 한국의 사법권이 통감부로 이관되며 재판소들이 일제 체계로 편입되었다.
        </p>
        <br />
        <p className="mb-3 leading-relaxed">
          <strong>2. 조선 강점 이후</strong><br />
          1910년 조선총독부는 통감부 사법청을 총독부 사법부로 개편하고,
          재판소는 고등법원, 공소원, 지방재판소, 구재판소 등 총 92개소 체계로 운영되었다.
          이후 1912년 재판소령 개정으로 3심 3계급제로 재편되었고, 제2차 세계대전 말기까지 유지되었다.
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


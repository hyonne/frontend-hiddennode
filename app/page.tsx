"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Cube } from "@/components/cube";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/contexts/TranslationContext";

// 클라이언트 컴포넌트를 불러오는 코드
const StepperSection = dynamic(() => import("@/components/stepper-section"), {
  ssr: false,
  loading: () => (
    <div className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400">스텝퍼 로딩 중...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const router = useRouter();
  const { translate } = useTranslation();

  const steps = [
    {
      id: 1,
      title: translate('step_collection_title'),
      description: translate('step_collection_desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: translate('step_sti_title'),
      description: translate('step_sti_desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: translate('step_visualization_title'),
      description: translate('step_visualization_desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      {/* 섹션 01 - 메인 */}
      <section className="snap-start relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/main01.png"
            alt="배경 이미지"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-24 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center leading-snug">
            {translate('main_title_1')}
          </h1>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-white text-center leading-snug">
            {translate('main_title_2')}
          </h1>
          <p className="mt-8 text-base md:text-lg text-white/80 text-center max-w-2xl tracking-[0.10em]">
            {translate('main_subtitle')}
          </p>
        </div>
        <div className="z-10 w-full h-full flex flex-col justify-end px-4 pb-12">
          <div className="ml-8 md:ml-16">
            <div
              className="
                bg-white p-5 rounded-lg shadow-lg
                flex flex-col items-start justify-center
                w-full max-w-md
                h-56 md:h-64 lg:h-[350px]
              "
            >
              <h2 className="text-4xl md:text-4xl mb-4 text-black font-bold tracking-[0.05em]">
                {translate('welcome_title').split(' ').map((word, index) => (
                  <span key={index}>
                    {word}
                    {index === 1 ? <br /> : ' '}
                  </span>
                ))}
              </h2>
              <h5 className="text-base md:text-lg mb-6 text-gray-500 font-medium whitespace-pre-line">
                {translate('welcome_description')}
              </h5>
              <Button
                onClick={() => router.push("/graph")}
                className="flex items-center justify-between w-full px-6 py-7 bg-black text-white text-lg hover:bg-black/90"
              >
                <span>{translate('start_exploration')}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>


       {/* 섹션 02 - 독립운동 판결문 */}
      <section className="snap-start relative h-[calc(100vh-5rem)] overflow-hidden">
        {/* 상단 배경 이미지 */}
        <div className="absolute top-0 inset-x-0 h-[40%] z-0 bg-black">
          <Image
            src="/images/main02.jpg"
            alt="배경 이미지"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#775977]/30"/>
        </div>

        {/* 상단 제목 */}
        <div className="absolute top-0 inset-x-0 h-[40%] z-10 flex items-center px-8">
          <span className="w-2 h-2 bg-black rounded-full mr-3" />
          <div className="h-px bg-black w-16 mr-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[0.35em]">
            <span className="bg-black/70 px-3 py-1">
              {translate('section2_title')}
            </span>
          </h2>
        </div>

        {/* 하단 배경 */}
        <div className="absolute bottom-0 inset-x-0 h-[60%] bg-black bg-opacity-80 z-0" />

        <div className="absolute bottom-0 inset-x-0 h-[60%] z-20 flex flex-col md:flex-row items-center justify-center md:gap-x-24 px-6">
          {/* 이미지 영역 */}
          <div className="w-[clamp(220px,30vw,400px)] h-auto mb-6 md:mb-0">
            <Image
              src="/images/intro.png"
              alt="판결문 이미지"
              width={500}
              height={400}
              className="object-contain w-full h-auto rounded shadow-lg"
            />
          </div>

          {/* 텍스트 영역 */}
          <div className="w-[clamp(320px,40vw,600px)] space-y-8 text-left leading-[clamp(1.5rem,3vw,2rem)] bg-gray-800 rounded-xl p-6 shadow text-white">
            <p className="text-[clamp(1rem,2.5vw,1.25rem)] tracking-[0.2em]">
              {translate('section2_content_1')}
              <br />
              {translate('section2_content_2')} <strong>{translate('section2_content_3')}</strong>
              {translate('section2_content_4')}
              <br />
              {translate('section2_content_5')} <strong>{translate('section2_content_6')}</strong>{translate('section2_content_7')}
              <br />
              <strong>{translate('section2_content_8')}</strong>{translate('section2_content_9')}
            </p>
            <button className="text-gray-400 font-semibold flex items-center justify-start text-[clamp(1rem,2.5vw,1.125rem)] tracking-[0.15em]">
              {translate('explore_more')} <span className="ml-1">&gt;</span>
            </button>
          </div>
        </div>
      </section>

      {/* 섹션 03 - 카드 섹션 */}
      <section className="snap-start relative h-[calc(100vh-5rem)] bg-black overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[30%] z-0">
          <Image
            src="/images/main03_bg.jpg"
            alt="배경 이미지"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"/>
        </div>
        <div className="absolute top-0 inset-x-0 h-[30%] z-10 flex items-center justify-between px-8">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-3" />
            <div className="h-px bg-white w-16 mr-4" />
            <h2 className="text-4xl md:text-3xl font-bold text-white tracking-[0.35em]">
              <span className="bg-black/70 px-3 py-1">
                {translate('section3_title')}
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-white tracking-[0.15em] text-right whitespace-pre-line">
            {translate('section3_subtitle')}
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[70%] z-20 flex items-center justify-center px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
            {/* 카드 1 */}
            <Card className="bg-black border border-gray-800 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full mr-4">
                    1
                  </span>
                  <h3 className="text-base font-medium text-[#ded78b] tracking-[0.15em]">
                    {translate('card1_title')}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 tracking-[0.10em]">
                  {translate('card1_desc')}
                </p>
              </div>
              <div className="h-56 bg-gray-800 relative">
                <Image
                  src="/images/main03_1.png"
                  alt="단계 1 이미지"
                  fill
                  className="object-cover"
                />
              </div>
            </Card>

            {/* 카드 2 */}
            <Card className="bg-black border border-gray-800 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full mr-4">
                    2
                  </span>
                  <h3 className="text-base font-medium text-[#ded78b] tracking-[0.15em]">
                    {translate('card2_title')}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 tracking-[0.10em]">
                  {translate('card2_desc')}
                </p>
              </div>
              <div className="h-56 bg-gray-800 relative">
                <Image
                  src="/images/main03_2.png"
                  alt="단계 2 이미지"
                  fill
                  className="object-cover"
                />
              </div>
            </Card>

            {/* 카드 3 */}
            <Card className="bg-black border border-gray-800 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full mr-4">
                    3
                  </span>
                  <h3 className="text-base font-medium text-[#ded78b] tracking-[0.15em]">
                    {translate('card3_title')}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 tracking-[0.10em]">
                  {translate('card3_desc')}
                </p>
              </div>
              <div className="h-56 bg-gray-800 relative">
                <Image
                  src="/images/main03_3.png"
                  alt="단계 3 이미지"
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 섹션 04 - Stepper */}
      <StepperSection steps={steps} />

      {/* 섹션 05 */}
      <section className="snap-start relative h-[calc(100vh-5rem)] px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/footer_bg.jpg"
            alt="배경 이미지"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto h-full flex items-center justify-end relative z-10">
          <div className="bg-black/60 backdrop-blur-sm p-8 rounded-lg text-left max-w-lg">
            <h2 className="text-2xl text-white font-bold mb-4">
              {translate('section5_title')}
            </h2>
            <p className="text-base text-white leading-relaxed whitespace-pre-line">
              {translate('section5_content')}
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 06 - 팀 소개 */}
      <section className="w-full min-h-screen bg-black text-white px-4 flex flex-col justify-center">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 mb-24 mx-auto">
          <div className="w-full md:w-1/3 flex justify-center">
            <Cube />
          </div>

          <div className="w-full md:w-1/2 space-y-8 text-base md:text-xl leading-relaxed text-center md:text-left">
            <p className="whitespace-pre-line">
              {translate('team_intro_1')}
            </p>
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl text-blue-400 tracking-wider font-light text-left">
            {translate('team_title_1')}
            <span className="text-blue-400 ml-2 align-middle animate-pulse">
              ■
            </span>
          </h1>
        </div>
      </section>

      {/* 섹션 06-02 */}
      <section className="w-full min-h-screen bg-black text-white px-4 flex flex-col justify-center">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 mb-24 mx-auto">
          <div className="w-full md:w-1/3 flex justify-center">
            <Cube />
          </div>

          <div className="w-full md:w-1/2 space-y-8 text-base md:text-xl leading-relaxed text-center md:text-left">
            <p className="whitespace-pre-line">
              {translate('team_intro_2')}
            </p>
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl text-blue-400 tracking-wider font-light text-left">
            {translate('team_title_2')}
            <span className="text-blue-400 ml-2 align-middle animate-pulse">
              ■
            </span>
          </h1>
        </div>
      </section>

      {/* 섹션 06-03 */}
      <section className="w-full min-h-screen bg-black text-white px-4 flex flex-col justify-center">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 mb-24 mx-auto">
          <div className="w-full md:w-1/3 flex justify-center">
            <Cube />
          </div>

          <div className="w-full md:w-1/2 space-y-8 text-base md:text-xl leading-relaxed text-center md:text-left">
            <p className="whitespace-pre-line">
              {translate('team_intro_3')}
            </p>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl text-blue-400 tracking-wider font-light text-left">
            {translate('team_title_3')}
            <span className="text-blue-400 ml-2 align-middle animate-pulse">
              ■
            </span>
          </h1>
        </div>
      </section>

      {/*footer */}
      <Footer />
    </div>
  );
}

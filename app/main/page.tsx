"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/footer";
import Header from "@/components/header";
import dynamic from "next/dynamic";

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
  // Stepper 데이터
  const steps = [
    {
      id: 1,
      title: "판결문 수집 및 엔티티 추출",
      description: "판결문에서 인물, 사건, 장소 정보를 추출합니다.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "STI 기반 의미 연결",
      description:
        "STI(Semantic Table Interpretation) 방식으로 요소 간 의미 있는 관계를 연결하고 지식그래프를 구성합니다.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "지식그래프 시각화 탐색",
      description:
        "시각화된 그래프에서 숨겨진 특징들을 찾고 시간을 직접 탐색할 수 있습니다.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/main01.png"
            alt="배경 이미지"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="z-10 w-full h-full flex flex-col justify-end px-4 pb-16">
          <div className="max-w-md ml-8 md:ml-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg mb-4 text-black font-bold">
                Welcome to HiddenNode
              </h2>
              <h5 className="text-lg mb-4 text-gray-500 font-medium">
                숨겨진 이름, 잊힌 기록 판결문과 사건을 따라 지식그래프로
                이어지는 독립운동의 여정
              </h5>
              <Button className="bg-black text-white hover:bg-black/90 w-full">
                탐색 시작하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 02 - 소개 */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/main04_bg.png"
            alt="배경 이미지"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <h2 className="text-2xl font-bold mb-8">판결문이란 왜 중요한가</h2>
          <p className="text-lg mb-12">
            교과서에 나오지 않는 기록이 있습니다. 그건 바로, 일제에 체포된
            사람들의 재판 기록입니다. 우리는 이 판결문 속 이름 없는 인물들에서
            잊힌 독립운동의 실마리를 찾습니다.
          </p>
        </div>
      </section>

      {/* 섹션 03 - card 섹션 */}
      <section className="py-20 px-4 bg-black/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">
            사라진 이름을 기억하는 방법
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 카드 1 */}
            <Card className="bg-black border border-gray-800 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-white text-black rounded-full mr-2">
                    1
                  </span>
                  <h3 className="text-sm font-medium">데이터 정규화</h3>
                </div>
                <p className="text-xs text-gray-400">
                  잊혀진 독립운동가, 데이터를 통해 발견합니다.
                </p>
              </div>
              <div className="h-40 bg-gray-800 relative">
                <Image
                  src="/images/main03_1.png"
                  alt="단계 1 이미지"
                  width={320}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* 카드 2 */}
            <Card className="bg-black border border-gray-800 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-white text-black rounded-full mr-2">
                    2
                  </span>
                  <h3 className="text-sm font-medium">지식그래프</h3>
                </div>
                <p className="text-xs text-gray-400">
                  사건과 사람을 지식그래프로 엮습니다.
                </p>
              </div>
              <div className="h-40 bg-gray-800 relative">
                <Image
                  src="/images/main03_2.png"
                  alt="단계 2 이미지"
                  width={320}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* 카드 3 */}
            <Card className="bg-black border border-gray-800 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-white text-black rounded-full mr-2">
                    3
                  </span>
                  <h3 className="text-sm font-medium">탐색</h3>
                </div>
                <p className="text-xs text-gray-400">
                  누구나 쉽게 탐색할 수 있는 도구로 만듭니다다.
                </p>
              </div>
              <div className="h-40 bg-gray-800 relative">
                <Image
                  src="/images/main03_3.png"
                  alt="단계 3 이미지"
                  width={320}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 섹션 03 */}
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="w-full relative aspect-[16/9] bg-gray-800 rounded overflow-hidden">
              <Image
                src="/images/main01.png" // 실제 그래프 이미지로 교체
                alt="그래프 시각화"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-xl font-bold text-right">
              당신이 몰랐던 독립운동가의 이야기
            </h2>

            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">
                정OO은 기존 인명사전에 없지만…
              </h3>
              <p className="text-sm leading-relaxed">
                이 인물은 현재 인명사전에도 등재되지 않은 숨겨진
                독립운동가입니다. 판결문 속 이름을 기반으로 그래프를 구성한
                결과, 1931년 ○○사건, ○○단체와의 연결이 확인되었고 이에 따라
                독립운동 개입 가능성이 드러났습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 04 - Stepper */}
      <StepperSection steps={steps} />

      {/* 섹션 05  */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="./images/footer_bg.jpg"
            alt="배경 이미지"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-right">
              당신이 몰랐던 독립운동가의 이야기를 찾아보세요
            </h2>
            <p className="text-sm text-gray-300 text-right">
              이 인물은 현재 인명사전에도 등재되지 않은 숨겨진 독립운동가입니다.
              판결문 속 이름을 기반으로 그래프를 구성한 결과, 1931년 ○○사건,
              ○○단체와의 연결이 확인되었고 이에 따라 독립운동 개입 가능성이
              드러났습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 06-01 */}
      <section id="section-6-1" className="py-16 px-4 bg-black relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-16 w-1 bg-[#3AA5D1]/50 -bottom-8 z-10" />
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/4 relative">
            <div className="relative aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-sm">
              <Image
                src="/images/pic.gif"
                alt="gif image"
                width={200}
                height={200}
                className="object-cover rounded bg-[#3AA5D1]"
              />
            </div>
          </div>
          <div className="w-full md:w-3/4 space-y-4">
            <h2 className="text-xl font-bold">HiddenNode팀을 소개합니다.</h2>
            <p className="text-sm text-gray-300">
              HiddenNodeTeam은 판결문 기반의 인물·사건 데이터를 구조화하고, STI
              기반 관계 분석과 지식그래프 기술로 독립운동의 숨은 연결을
              시각화합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 06-02 */}
      <section id="section-6-2" className="py-16 px-4 bg-black relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-16 w-1 bg-[#3AA5D1]/50 -top-8 z-10" />
        <div className="absolute left-1/2 transform -translate-x-1/2 h-16 w-1 bg-[#3AA5D1]/50 -bottom-8 z-10" />
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/4 relative">
            <div className="relative aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-sm">
              <Image
                src="/images/pic.gif"
                alt="gif image"
                width={200}
                height={200}
                className="object-cover rounded bg-[#3AA5D1]"
              />
            </div>
          </div>
          <div className="w-full md:w-3/4 space-y-4">
            <h2 className="text-xl font-bold">기억의 가치를 전달 한다는것.</h2>
            <p className="text-sm text-gray-300">
              판결문은 단지 결과가 아니라, 저항의 흔적이 남은 역사적 단서입니다.
              그 안의 인물·사건·장소는 독립운동의 또 다른 퍼즐 조각입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 06-03 */}
      <section id="section-6-3" className="py-16 px-4 bg-black relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-16 w-1 bg-[#3AA5D1]/50 -top-8 z-10" />
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/4 relative">
            <div className="relative aspect-square w-full max-w-[200px] mx-auto overflow-hidden rounded-sm">
              <Image
                src="/images/pic.gif"
                alt="gif image"
                width={200}
                height={200}
                className="object-cover rounded bg-[#3AA5D1]"
              />
            </div>
          </div>
          <div className="w-full md:w-3/4 space-y-4">
            <h2 className="text-xl font-bold">이름 없는 기억을 잇는다는 것</h2>
            <p className="text-sm text-gray-300">
              잊힌 이름을 다시 연결하는 이 작업이,누군가에게는 역사를 다시
              생각하는 계기가 되길 바랍니다.
            </p>
          </div>
        </div>
      </section>
      {/*footer */}
      <Footer />
    </div>
  );
}

'use client'
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, FileText, ChevronDown } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import React, { useState } from "react"

type FilterCategory = 'subject' | 'type' | 'era' | 'person'
interface Filters {
  subject: string[]
  type: string[]
  era: string[]
  person: string[]
}

export default function dataroom() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    subject: [],
    type: [],
    era: [],
    person: []
  })

  const subjectOptions = [
    '부제목1', '부제목2', '부제목', '부제목', '부제목'
  ]
  const typeOptions = [
    '부제목', '부제목', '부제목'
  ]
  const eraOptions = [
    '부제목', '부제목', '부제목', '부제목', '부제목', '부제목'
  ]
  const personOptions = [
    '부제목', '부제목'
  ]

  const handleFilterChange = (category: FilterCategory, value: string) => {
    setFilters(prev => {
      const arr = prev[category]
      return {
        ...prev,
        [category]: arr.includes(value)
          ? arr.filter((v: string) => v !== value)
          : [...arr, value]
      }
    })
  }
  const handleClear = () => setFilters({ subject: [], type: [], era: [], person: [] })

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto">
        {/* Top Search Button */}
        <div className="flex justify-end py-1 pr-1 relative">
          <button
            className="bg-black border border-gray-300 rounded px-3 py-1 text-sm flex items-center"
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            검색 <ChevronDown className="h-3 w-3 ml-1" />
          </button>
          {filterOpen && (
            <div className="absolute left-0 right-0 mx-auto mt-2 w-[1300px] max-w-[99vw] bg-white border border-gray-200 rounded shadow-lg z-30 p-12 flex text-black" style={{top: '100%'}}>
              {/* 필터 컬럼들 */}
              <div className="flex flex-1 gap-24">
                <div className="flex-1 min-w-[180px]">
                  <div className="font-bold text-lg mb-4">제목1</div>
                  {subjectOptions.map((opt, idx) => (
                    <label key={opt + '-' + idx} className="flex items-center text-base mb-3 cursor-pointer text-black">
                      <input type="checkbox" className="mr-2 w-5 h-5" checked={filters.subject.includes(opt)} onChange={() => handleFilterChange('subject', opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="font-bold text-lg mb-4">제목2</div>
                  {typeOptions.map((opt, idx) => (
                    <label key={opt + '-' + idx} className="flex items-center text-base mb-3 cursor-pointer text-black">
                      <input type="checkbox" className="mr-2 w-5 h-5" checked={filters.type.includes(opt)} onChange={() => handleFilterChange('type', opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="font-bold text-lg mb-4">제목3</div>
                  {eraOptions.map((opt, idx) => (
                    <label key={opt + '-' + idx} className="flex items-center text-base mb-3 cursor-pointer text-black">
                      <input type="checkbox" className="mr-2 w-5 h-5" checked={filters.era.includes(opt)} onChange={() => handleFilterChange('era', opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="font-bold text-lg mb-4">제목4</div>
                  {personOptions.map((opt, idx) => (
                    <label key={opt + '-' + idx} className="flex items-center text-base mb-3 cursor-pointer text-black">
                      <input type="checkbox" className="mr-2 w-5 h-5" checked={filters.person.includes(opt)} onChange={() => handleFilterChange('person', opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* 버튼 컬럼 */}
              <div className="flex flex-col justify-between ml-12 min-w-[180px] h-full">
                <div></div>
                <div className="flex flex-col gap-4">
                  <button
                    className="w-full py-3 bg-gray-200 text-black rounded mb-3 text-lg font-semibold"
                    onClick={handleClear}
                  >
                    모두 지우기
                  </button>
                  <button
                    className="w-full py-3 bg-black text-white rounded text-lg font-semibold"
                    onClick={() => setFilterOpen(false)}
                  >
                    검색하기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Border Line */}
        <div className="border border-white"></div>

        {/* Top Navigation */}
        <div className="flex flex-wrap text-xs md:text-sm border-b border-gray-300 gap-x-3 gap-y-1 py-1">
          <NavItem text="V1" bgColor="bg-purple-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="정보마당" bgColor="bg-green-600" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="참여마당" bgColor="bg-green-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="소통" bgColor="bg-lime-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="정책정보" bgColor="bg-blue-600" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="행정정보공개" bgColor="bg-sky-400" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="국민신문고" bgColor="bg-blue-400" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="정책브리핑" bgColor="bg-green-300" textColor="text-black" className="px-3 py-1 rounded" />
          <NavItem text="기관안내" bgColor="bg-purple-400" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="사전정보공표" bgColor="bg-pink-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="자료" bgColor="bg-purple-300" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="지원정보안내" bgColor="bg-blue-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="지원" bgColor="bg-blue-500" textColor="text-white" className="px-3 py-1 rounded" />
        </div>

        {/* Main Content */}
        <div className="py-8">
          <h1 className="text-2xl font-bold text-center mb-8">콘텐츠</h1>

          {/* Featured Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <FeaturedCard image="/placeholder.svg?height=200&width=300" title="집회모습 사진 학생들의 모습" number="1" />
            <FeaturedCard image="/placeholder.svg?height=200&width=300" title="우 리나라의 상징" number="2" />
            <FeaturedCard
              image="/placeholder.svg?height=200&width=300"
              title="6·10 민주항쟁을 되새 대한민국 민주화의"
              number="3"
            />
          </div>

          {/* Content Table */}
          <div className="overflow-x-auto border-t-2 border-b-2 border-blue-500">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 text-center">
                  <th className="px-4 py-2 border-b">번호</th>
                  <th className="px-4 py-2 border-b">제목</th>
                  <th className="px-4 py-2 border-b">작성자</th>
                  <th className="px-4 py-2 border-b">등록일</th>
                  <th className="px-4 py-2 border-b">첨부</th>
                  <th className="px-4 py-2 border-b">조회</th>
                </tr>
              </thead>
              <tbody>
                <TableRow
                  id="399"
                  title="2024년도 1회 기념식행사 관련 기관 대책회의"
                  author="서울특별시"
                  date="2024-06-07"
                  views="6"
                />
                <TableRow
                  id="398"
                  title="2024년도 1회 기념식행사 관련 감독자 대책회의"
                  author="서울특별시청"
                  date="2024-04-18"
                  views="12"
                />
                <TableRow
                  id="397"
                  title="2024년도 1회 기념식행사 관련 안전대책(1)"
                  author="서울특별시청"
                  date="2024-04-18"
                  views="9"
                />
                <TableRow
                  id="396"
                  title="2024년도 1회 기념식행사 관련 안전대책 (1차안)"
                  author="서울특별시청"
                  date="2024-04-18"
                  views="17"
                />
                <TableRow id="395" title="청사내 민원사무 개선" author="김영수" date="2022-11-29" views="30" />
                <TableRow id="394" title="10개 지역 안내도" author="김영수" date="2022-05-20" views="43" />
                <TableRow id="393" title="지방청 안전지침" author="김영수" date="2022-05-04" views="40" />
                <TableRow
                  id="392"
                  title="위험안전지침 확인하세요(다수부서 이용시)"
                  author="서울특별시청"
                  date="2021-10-06"
                  views="20"
                />
                <TableRow
                  id="391"
                  title="2021년도 1회 기념행사안내 수정안내 2"
                  author="박민수"
                  date="2021-04-16"
                  views="12"
                />
                <TableRow
                  id="390"
                  title="2021년도 1회 기념행사안내 수정안 안내 1"
                  author="박민수"
                  date="2021-04-16"
                  views="11"
                />
                <TableRow id="389" title="강남지역 행사안내입니다." author="서울특별시청" date="2020-08-29" views="34" />
                <TableRow
                  id="388"
                  title="서울지역 안전지침안내 1차(수정안내사항)"
                  author="박민수"
                  date="2020-03-14"
                  views="94"
                />
                <TableRow
                  id="387"
                  title="경기지 지역 1차(수정안내사항 안내)"
                  author="박민수"
                  date="2020-03-14"
                  views="146"
                />
                <TableRow
                  id="386"
                  title="인천광역시 사회안전 1차(수정안내사항 확인안)"
                  author="박민수"
                  date="2020-03-14"
                  views="423"
                />
                <TableRow id="385" title="4개지역 안전지침 (1차안)" author="서울특별시청" date="2020-03-13" views="107" />
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav className="inline-flex">
              <Link href="#" className="px-3 py-1 border border-gray-300">
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <Link href="#" className="px-3 py-1 border border-gray-300 bg-blue-500 text-white">
                1
              </Link>
              <Link href="#" className="px-3 py-1 border border-gray-300">
                2
              </Link>
              <Link href="#" className="px-3 py-1 border border-gray-300">
                3
              </Link>
              <Link href="#" className="px-3 py-1 border border-gray-300">
                4
              </Link>
              <Link href="#" className="px-3 py-1 border border-gray-300">
                5
              </Link>
              <Link href="#" className="px-3 py-1 border border-gray-300">
                6
              </Link>
              <Link href="#" className="px-3 py-1 border border-gray-300">
                7
              </Link>
              <Link href="#" className="px-3 py-1 border border-gray-300">
                <ChevronRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

function NavItem({
  text,
  bgColor = "bg-white",
  textColor = "text-black",
  className = "",
}: {
  text: string
  bgColor?: string
  textColor?: string
  className?: string
}) {
  return (
    <Link href="#" className={`border-r border-gray-300 font-semibold ${bgColor} ${textColor} ${className}`}>
      {text}
    </Link>
  )
}

function FeaturedCard({ image, title, number }: { image: string; title: string; number: string }) {
  return (
    <div className="relative border border-gray-300">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
        <p className="text-sm">
          {number} {title}
        </p>
      </div>
    </div>
  )
}

function TableRow({
  id,
  title,
  author,
  date,
  views,
}: { id: string; title: string; author: string; date: string; views: string }) {
  return (
    <tr className="hover:bg-gray-50 text-center">
      <td className="px-4 py-2 border-b">{id}</td>
      <td className="px-4 py-2 border-b text-left">
        <Link href="#" className="hover:underline">
          {title}
        </Link>
      </td>
      <td className="px-4 py-2 border-b">{author}</td>
      <td className="px-4 py-2 border-b">{date}</td>
      <td className="px-4 py-2 border-b">
        <FileText className="h-4 w-4 mx-auto text-yellow-600" />
      </td>
      <td className="px-4 py-2 border-b">{views}</td>
    </tr>
  )
}

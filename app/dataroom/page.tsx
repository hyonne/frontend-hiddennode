'use client'
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, FileText, ChevronDown } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useTranslation } from "@/contexts/TranslationContext"
import React, { useState } from "react"

type FilterCategory = 'subject' | 'type' | 'era' | 'person'
interface Filters {
  subject: string[]
  type: string[]
  era: string[]
  person: string[]
}

export default function dataroom() {
  const { translate } = useTranslation()
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
            {translate('search')} <ChevronDown className="h-3 w-3 ml-1" />
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
                    {translate('clear_all')}
                  </button>
                  <button
                    className="w-full py-3 bg-black text-white rounded text-lg font-semibold"
                    onClick={() => setFilterOpen(false)}
                  >
                    {translate('search_btn')}
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
          <NavItem text="csv" bgColor="bg-purple-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="1922" bgColor="bg-green-600" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="항일운동" bgColor="bg-green-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="1917" bgColor="bg-lime-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="1941" bgColor="bg-blue-600" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="1955" bgColor="bg-sky-400" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="인물정보" bgColor="bg-blue-400" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="판결사례" bgColor="bg-green-300" textColor="text-black" className="px-3 py-1 rounded" />
          <NavItem text="사건개요" bgColor="bg-purple-400" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="사1923" bgColor="bg-pink-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="관계정보" bgColor="bg-blue-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="판결문" bgColor="bg-blue-500" textColor="text-white" className="px-3 py-1 rounded" />
          <NavItem text="공공데이터셋" bgColor="bg-gray-400" textColor="text-white" className="px-3 py-1 rounded" />
           <NavItem text="공공자료" bgColor="bg-gray-300" textColor="text-white" className="px-3 py-1 rounded" />
        </div>

        {/* Main Content */}
        <div className="py-8">
          <h1 className="text-2xl font-bold text-center mb-8">{translate('dataroom_title')}</h1>

          { /* Featured Cards - update */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
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

          {/* Content Table */}
          <div className="overflow-x-auto border-t-2 border-b-2 border-blue-500">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-900 text-center">
                  <th className="px-4 py-2 border-b">{translate('table_number')}</th>
                  <th className="px-4 py-2 border-b">{translate('table_title')}</th>
                  <th className="px-4 py-2 border-b">{translate('table_author')}</th>
                  <th className="px-4 py-2 border-b">{translate('table_date')}</th>
                  <th className="px-4 py-2 border-b">{translate('table_attachment')}</th>
                  <th className="px-4 py-2 border-b">{translate('table_views')}</th>
                </tr>
              </thead>
              <tbody>
                <TableRow id="1" title={translate('judgment_summary')} author="teamhiddennode" date="2025-03-02" views="13" />
                <TableRow id="2" title={translate('june_10_movement')} author="teamhiddennode" date="2025-03-15" views="18" />
                <TableRow id="3" title={translate('gwangju_student_movement')} author="teamhiddennode" date="2025-03-28" views="22" />
                <TableRow id="4" title={translate('shingan_society')} author="teamhiddennode" date="2025-04-04" views="15" />
                <TableRow id="5" title={translate('korean_language_society')} author="teamhiddennode" date="2025-04-17" views="27" />
                <TableRow id="6" title={translate('korean_independence_corps')} author="teamhiddennode" date="2025-04-29" views="19" />
                <TableRow id="7" title={translate('heungsadan')} author="teamhiddennode" date="2025-05-03" views="24" />
                <TableRow id="8" title={translate('bumin_hall_bombing')} author="teamhiddennode" date="2025-05-10" views="16" />
                <TableRow id="9" title={translate('korean_communist_party')} author="teamhiddennode" date="2025-05-18" views="21" />
                <TableRow id="10" title={translate('korean_liberation_association')} author="teamhiddennode" date="2025-05-25" views="14" />
                <TableRow id="11" title={translate('march_first_movement')} author="teamhiddennode" date="2025-06-01" views="25" />
                <TableRow id="12" title={translate('hyeongpyeongsa')} author="teamhiddennode" date="2025-06-07" views="28" />
                <TableRow id="13" title={translate('korean_student_science_society')} author="teamhiddennode" date="2025-06-13" views="17" />
                <TableRow id="14" title={translate('korean_people_association')} author="teamhiddennode" date="2025-06-18" views="29" />
                <TableRow id="15" title={translate('sinmin_society')} author="teamhiddennode" date="2025-06-22" views="23" />
                <TableRow id="16" title={translate('korean_liberation_army')} author="teamhiddennode" date="2025-06-26" views="19" />
                <TableRow id="17" title={translate('korean_founding_alliance')} author="teamhiddennode" date="2025-03-07" views="21" />
                <TableRow id="18" title={translate('korean_volunteer_corps')} author="teamhiddennode" date="2025-03-21" views="15" />
                <TableRow id="19" title={translate('provisional_government')} author="teamhiddennode" date="2025-04-09" views="24" />
                <TableRow id="20" title={translate('korean_youth_independence_corps')} author="teamhiddennode" date="2025-04-23" views="18" />
                <TableRow id="21" title={translate('korean_labor_union_council')} author="teamhiddennode" date="2025-05-06" views="22" />
                <TableRow id="22" title={translate('korean_revolutionary_army')} author="teamhiddennode" date="2025-05-15" views="17" />
                <TableRow id="23" title={translate('korean_national_revolutionary_party')} author="teamhiddennode" date="2025-05-29" views="20" />
                <TableRow id="24" title={translate('korean_women_friendship_society')} author="teamhiddennode" date="2025-06-04" views="14" />
                <TableRow id="25" title={translate('korean_youth_league')} author="teamhiddennode" date="2025-06-15" views="23" />
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

{/* Featured Card Component - update*/}
function FeaturedCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative border border-gray-300">
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


function TableRow({
  id,
  title,
  author,
  date,
  views,
}: { id: string; title: string; author: string; date: string; views: string }) {
  return (
    <tr className="hover:bg-gray-800 text-center">
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

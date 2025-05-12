import Link from "next/link"
import { Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-white mb-2">HiddenNode</h2>
            <p className="text-gray-400 text-xs">© 2023 HiddenNode. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Github size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M6.75 3C4.67893 3 3 4.67893 3 6.75V17.25C3 19.3211 4.67893 21 6.75 21H17.25C19.3211 21 21 19.3211 21 17.25V6.75C21 4.67893 19.3211 3 17.25 3H6.75Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">소개</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white">
                    팀 소개
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">서비스</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white">
                    기능 1
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white">
                    기능 2
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white">
                    기능 3
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">고객 지원</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white">
                    문의하기
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">법적 고지</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-xs text-gray-400 hover:text-white">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, X, Clock, ChevronDown, Bookmark } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import GraphComponent from "@/components/graph"

export default function KnowledgeGraph() {
  const [activeTab, setActiveTab] = useState<string>("설명사이드바")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState<string | undefined>(undefined)
  const [graphData, setGraphData] = useState<any>(null)

  // 데이터셋 버튼 핸들러 (각 버튼마다 파일명 코드에서 지정)
  const [activeDataset, setActiveDataset] = useState('줄인데이터.json');
  const datasetFiles = [
    { name: '전체', file: '줄인데이터.json' },
    { name: '함경도', file: '함경도.json' }, // 여기에 원하는 파일명 입력
    { name: '평안도', file: '평안도.json' }, // 여기에 원하는 파일명 입력
    { name: '황해도', file: '황해도.json' },
    { name: '강원도', file: '강원도.json' }, // 여기에 원하는 파일명 입력
    { name: '경기도', file: '경기도.json' },
    { name: '충청도', file: '충청도.json' }, // 여기에 원하는 파일명 입력
    { name: '전라도', file: '전라도.json' },
    { name: '경상도', file: '경상도.json' }, // 여기에 원하는 파일명 입력
    { name: '기타', file: '기타.json' }
  ];

  useEffect(() => {
    fetch(`/data/${activeDataset}`)
      .then((res) => res.json())
      .then((json) => setGraphData(json));
  }, [activeDataset]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // 노드 및 이웃 정보 추출
  let nodeInfo: any = null
  let neighborInfos: any[] = []
  if (graphData && selectedNode) {
    const nodeMap = new Map(
      graphData.nodes.map((n: any) => [n.key, n.attributes])
    )
    nodeInfo = nodeMap.get(selectedNode)
    // 이웃 찾기 (양방향)
    const neighbors = new Set<string>()
    if (graphData.edges) {
      graphData.edges.forEach((e: any) => {
        if (e.source === selectedNode) neighbors.add(e.target)
        if (e.target === selectedNode) neighbors.add(e.source)
      })
    }
    neighborInfos = Array.from(neighbors)
      .map((k) => nodeMap.get(k))
      .filter(Boolean)
  }

  // 주요 label 매핑
  const LABEL_MAP: Record<string, string> = {
    '주소': '주소',
    '연도': '년도',
    '이름': '이름',
    '죄명': '죄명',
    '사건': '사건개요',
    '사건개요': '사건개요',
    '개요' : '개요',
    'label': '이름',
    'type': '유형',
    '나이': '나이',
    '주문': '주문',
    '본주거지': '주소',
    '판결시점': '판결시점',
  };
  // 고정 라벨 순서 및 키 매핑
  const FIXED_LABELS = [
    { label: '주소', keys: ['주소', '본주거지'] },
    { label: '판결시점', keys: ['판결시점'] }, // 판결시점으로 수정
    { label: '이름', keys: ['이름', 'label'] },
    { label: '주문', keys: ['주문'] }, 
    { label: 'URI', keys: ['uri'] },  // 사건개요 URI로 수정 수정4
  ];

  function extractMainInfo(attr: any) {
    if (!attr) return [];
    const result: { label: string; value: string }[] = [];
    // 주소
    if (attr.type === '주소' || attr['본주거지']) {
      result.push({ label: '주소', value: attr['label'] || attr['본주거지'] || '' });
    }
    // 년도
    if (attr.type === '연도' || /^year_/.test(attr['label'])) {
      result.push({ label: '년도', value: attr['label'] });
    }
    // 이름(인물)
    if (attr.type === '인물' || attr['label']) {
      result.push({ label: '이름', value: attr['label'] });
    }
    // 죄명
    if (attr.type === '죄명' || attr['type'] === '죄명' || attr['label']?.includes('죄')) {
      result.push({ label: '죄명', value: attr['label'] });
    }
    // 기타 주요 속성
    ['나이', '주문', '판결시점'].forEach((k) => {
      if (attr[k]) result.push({ label: LABEL_MAP[k] || k, value: attr[k] });
    });
    // 중복 제거
    const seen = new Set();
    return result.filter(({ label, value }) => {
      const key = label + value;
      if (seen.has(key) || !value) return false;
      seen.add(key);
      return true;
    });
  }

  function renderMainInfo(mainInfo: any[]) {
    if (!mainInfo || mainInfo.length === 0) {
      return <div className="text-gray-400">주요 정보 없음</div>;
    }
    return mainInfo.map((item, i) => (
      <div key={i} className="flex justify-between text-black">
        <span className="font-medium text-black">{item.label}</span>
        <span className="ml-2 text-black">{item.value}</span>
      </div>
    ));
  }
  function renderFixedInfo(attr: any) {
    if (!attr) return null;
    return (
      <div className="space-y-1">
        {FIXED_LABELS.map(({ label, keys }) => {
          const value = keys.map(k => attr[k]).find(v => !!v);
          return (
            <div key={label} className="flex justify-between text-black">
              <span className="font-medium">{label}</span>
              <span className="ml-2">
                {label === 'URI' && value ? (   // URI a태그 달았음 수정5
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {value}
                  </a>
                ) : (
                  value || <span className="text-gray-400">정보 없음</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  // 관계 정보(이웃 노드)에서 이름만 보이게 렌더링
  function renderNeighborInfo(neighborInfos: any[]) {
    if (!neighborInfos || neighborInfos.length === 0) return null;
    return (
      <div className="p-4 border-b">
        <h2 className="text-lg text-black font-bold mb-2">관계 정보</h2>
        {neighborInfos.map((info, idx) => {
          let name = "이름 없음";
          const type = info?.type || info?.attributes?.type;
          if (type === '사건') {
            name = info['개요'] || info['사건개요'] ||
                   (info.attributes && (info.attributes['개요'] || info.attributes['사건개요'])) ||
                   info['label'] || info['이름'] || info['name'] ||
                   (info.attributes && (info.attributes['label'] || info.attributes['이름'] || info.attributes['name'])) ||
                   "이름 없음";
          } else {
            name = info['label'] || info['이름'] || info['name'] ||
                   (info.attributes && (info.attributes['label'] || info.attributes['이름'] || info.attributes['name'])) ||
                   "이름 없음";
          }
          return (
            <div key={idx} className="mb-2 p-2 bg-gray-100 rounded flex justify-between text-xs text-black">
              <span className="font-medium text-black">node</span>
              <span className="ml-2 text-black">{name}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // 노드 정보 렌더링
  let nodeInfoBlock = null;
  useEffect(() => {
    // 노드가 선택되면 사이드바 자동 오픈
    if (selectedNode) setSidebarOpen(true);
  }, [selectedNode]);
  if (nodeInfo) {
    const mainInfo = extractMainInfo(nodeInfo);
    nodeInfoBlock = (
      <div className="mt-2 mb-4 text-sm space-y-1">
        {renderMainInfo(mainInfo)}
      </div>
    );
  }

  const sidebarRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 노드 선택 해제, 검색창 드롭다운이 열려있으면(X버튼 누르기 전까지) 초기화하지 않음
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      // 검색창이 활성화되어 있으면(X버튼 누르기 전까지) 초기화하지 않음
      if (searchActive) return;
      // 사이드바가 열려있고, 사이드바 내부 클릭/드래그/텍스트 선택이면 무시
      if (sidebarOpen && sidebarRef.current && sidebarRef.current.contains(e.target as Node)) {
        return;
      }
      // 사이드바가 닫혀있을 때는 무조건 초기화
      if (!sidebarOpen) {
        setSelectedNode(undefined);
        return;
      }
      // 사이드바가 열려있고, 클릭한 곳이 사이드바가 아니면 초기화
      if (sidebarOpen && !(sidebarRef.current && sidebarRef.current.contains(e.target as Node))) {
        setSelectedNode(undefined);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [sidebarOpen, searchActive]);

  // 검색창 포커스/블러/X버튼 처리
  // GraphComponent에 searchInputRef, setSearchActive prop 전달 필요

  // 드롭다운 방향 상태
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex w-full h-full bg-gray-100">
      <div className="flex flex-col flex-1">
        <div className="flex-1 relative overflow-hidden">
          <div className="w-full h-full relative bg-gray-100">
            {/* Floating Buttons (상단 좌측) */}
            <div
              className={`absolute top-4 z-10 flex space-x-2 transition-all duration-300 ${
                sidebarOpen ? "left-[370px]" : "left-4"
              }`}
            >
              {datasetFiles.map((btn, idx) => (
                <Button
                  key={btn.name + idx}
                  variant={activeDataset === btn.file ? "default" : "secondary"}
                  size="sm"
                  className={`bg-white text-black shadow-md border ${activeDataset === btn.file ? 'border-blue-500 font-bold' : 'border-gray-200'}`}
                  onClick={() => setActiveDataset(btn.file)}
                >
                  {btn.name}
                </Button>
              ))}
            </div>

            {/* 메인 이미지 */}
            <div className="w-full h-full">
              <GraphComponent 
                onSelectNode={setSelectedNode} 
                selectedFile={activeDataset}
                searchInputRef={searchInputRef}
                setSearchActive={setSearchActive}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            </div>
          </div>

          {/* 사이드바 */}
          <div
            ref={sidebarRef}
            className={`absolute top-0 left-0 h-full w-[350px] bg-gray-200 border-r overflow-y-auto transition-transform duration-300 z-30 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 border-b">
              <h1 className="text-xl text-black font-bold">노드 정보</h1>
              {/* e로 시작하는 key면 개요로, 아니면 기존대로 */}
              {selectedNode && selectedNode.startsWith('e') && nodeInfo && nodeInfo['개요'] ? (
                <div className="text-black whitespace-pre-line">{nodeInfo['개요']}</div>
              ) : (
                renderFixedInfo(nodeInfo)
              )}
            </div>
            {neighborInfos.length > 0 && renderNeighborInfo(neighborInfos)}

            {/* 설명 섹션 */}
            <div className="p-4 border-b">
              
              {/* 탭 */}
              <div className="flex justify-between mb-4">
                <div
                  className={`font-medium cursor-pointer ${
                    activeTab === "주변" ? "text-black" : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("주변")}
                >
                  사진 없음
                </div>
              </div>

              {/* 이미지 아이템 */}
              
            </div>
          </div>

          {/* 사이드바 토글 버튼 */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 z-40 transition-transform duration-300 ${
              sidebarOpen ? "left-[350px]" : "left-0"
            }`}
          >
            <button
              onClick={toggleSidebar}
              className="bg-gray-200 h-16 w-6 flex items-center justify-center rounded-r-lg shadow-md border-t border-r border-b border-gray-200"
            >
              <ChevronRight
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  sidebarOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { ChevronRight, X, Clock, ChevronDown, Bookmark } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import GraphComponent from "@/components/graph"

export default function KnowledgeGraph() {
  const [activeTab, setActiveTab] = useState<string>("설명사이드바")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedNode, setSelectedNode] = useState<string | undefined>(undefined)
  const [graphData, setGraphData] = useState<any>(null)

  // 데이터셋 버튼 핸들러 (각 버튼마다 파일명 코드에서 지정)
  const [activeDataset, setActiveDataset] = useState('test1.json');
  const datasetFiles = [
    { name: '버튼 1', file: 'test1.json' }, // 여기에 원하는 파일명 입력
    { name: '버튼 2', file: 'data.json' }, // 여기에 원하는 파일명 입력
    { name: '버튼 3', file: 'data.json' },
    { name: '버튼 3', file: 'data.json' } // 여기에 원하는 파일명 입력
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
    'label': '이름',
    'type': '유형',
    '나이': '나이',
    '주문': '주문',
    '본주거지': '주소',
    '판결시점': '판결시점',
  };

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
    // 사건개요(사건)
    if (attr.type === '사건' || attr['사건개요'] || (attr['label'] && attr['label'].length > 30)) {
      result.push({ label: '사건개요', value: attr['label'] });
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
  function renderNeighborInfo(neighborInfos: any[]) {
    if (!neighborInfos || neighborInfos.length === 0) return null;
    return (
      <div className="p-4 border-b">
        <h2 className="text-lg text-black font-bold mb-2">관계 노드정보</h2>
        {neighborInfos.map((info, idx) => {
          const mainInfo = extractMainInfo(info);
          if (mainInfo.length === 0) {
            return (
              <div key={idx} className="mb-2 p-2 bg-gray-100 rounded">
                <div className="text-gray-400 text-xs">주요 정보 없음</div>
              </div>
            );
          }
          return (
            <div key={idx} className="mb-2 p-2 bg-gray-100 rounded">
              {mainInfo.map((item, i) => (
                <div key={i} className="flex justify-between text-xs text-black">
                  <span className="font-medium text-black">{item.label}</span>
                  <span className="ml-2 text-black">{item.value}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  // 노드 정보 렌더링
  let nodeInfoBlock = null;
  if (nodeInfo) {
    const mainInfo = extractMainInfo(nodeInfo);
    nodeInfoBlock = (
      <div className="mt-2 mb-4 text-sm space-y-1">
        {renderMainInfo(mainInfo)}
      </div>
    );
  }

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
              <GraphComponent onSelectNode={setSelectedNode} selectedFile={activeDataset} />
            </div>
          </div>

          {/* 사이드바 */}
          <div
            className={`absolute top-0 left-0 h-full w-[350px] bg-gray-200 border-r overflow-y-auto transition-transform duration-300 z-30 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 border-b">
              <h1 className="text-xl text-black font-bold">노드 정보</h1>
              {renderMainInfo(extractMainInfo(nodeInfo))}
            </div>
            {renderNeighborInfo(neighborInfos)}

            {/* 설명 섹션 */}
            <div className="p-4 border-b">
              <div className="flex items-center mb-4">
                <h2 className="text-lg text-black font-bold">지식그래프 설명</h2>
              </div>

              {/* 탭 */}
              <div className="flex justify-between mb-4">
                <div
                  className={`font-medium cursor-pointer ${
                    activeTab === "주변" ? "text-black" : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("주변")}
                >
                  사진
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

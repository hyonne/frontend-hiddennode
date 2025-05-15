"use client";
import Header from "../../components/header";
import KnowledgeGraph from "../../components/knowledgegraph";
import Footer from "../../components/footer";

export default function GraphPage() {
  return (
    <div className="flex flex-col h-screen m-0 p-0">
      {/* Header는 fixed되어 있다고 가정 */}
      <Header />

      {/* 헤더 높이만큼 padding-top 추가해서 침범 방지 */}
      <main
        className="bg-white w-full h-100px flex-1"
        style={{ paddingTop: "0px" , height: 700}} // Header/Footer 높이만큼
      >
        <KnowledgeGraph />
      </main>

      <Footer />
    </div>
  );
}





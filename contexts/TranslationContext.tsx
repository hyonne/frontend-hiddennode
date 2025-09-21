'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 지원하는 언어 타입 정의
export type Language = 'ko' | 'en' | 'ja' | 'zh'

// 번역 텍스트 타입 정의
export interface TranslationTexts {
  [key: string]: {
    ko: string
    en: string
    ja?: string
    zh?: string
  }
}

// 컨텍스트 타입 정의
interface TranslationContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  translate: (key: string) => string
  isLoading: boolean
}

// 기본 번역 텍스트 (정적 텍스트들)
const defaultTexts: TranslationTexts = {
  // 헤더 메뉴
  main: {
    ko: '메인화면',
    en: 'Main',
    ja: 'メイン',
    zh: '主页'
  },
  graph: {
    ko: '관계도 탐색',
    en: 'Relationship Graph',
    ja: '関係図の探索',
    zh: '关系图探索'
  },
  dataroom: {
    ko: '자료실',
    en: 'Data Room',
    ja: '資料室',
    zh: '资料室'
  },
  // 언어 선택
  language_ko: {
    ko: '한국어',
    en: 'Korean',
    ja: '韓国語',
    zh: '韩语'
  },
  language_en: {
    ko: '영어',
    en: 'English',
    ja: '英語',
    zh: '英语'
  },
  language_ja: {
    ko: '일본어',
    en: 'Japanese',
    ja: '日本語',
    zh: '日语'
  },
  language_zh: {
    ko: '중국어',
    en: 'Chinese',
    ja: '中国語',
    zh: '中文'
  },
  // 메인 페이지 텍스트들
  main_title_1: {
    ko: '숨겨진 독립운동의',
    en: 'Hidden Independence Movement',
    ja: '隠された独立運動の',
    zh: '隐藏的独立运动'
  },
  main_title_2: {
    ko: '조각을 연결하다.',
    en: 'Connecting the Pieces.',
    ja: 'かけらをつなぐ。',
    zh: '连接碎片。'
  },
  main_subtitle: {
    ko: '판결문 속 독립운동가와 사건, 알려지지 않은 항쟁을 지식그래프로 밝혀냅니다.',
    en: 'We reveal independence activists, events, and unknown resistance in court records through knowledge graphs.',
    ja: '判決文の中の独立運動家と事件、知られていない抗争を知識グラフで明らかにします。',
    zh: '通过知识图谱揭示判决书中的独立运动家、事件和未知的抗争。'
  },
  welcome_title: {
    ko: 'Welcome to HiddenNode',
    en: 'Welcome to HiddenNode',
    ja: 'Welcome to HiddenNode',
    zh: 'Welcome to HiddenNode'
  },
  welcome_description: {
    ko: '잊혀진 독립운동가와 기록들\n독립운동 판결문과 사건을 따라\n지식그래프로 이어지는 독립운동의 여정',
    en: 'Forgotten independence activists and records\nFollowing independence movement court records and events\nA journey of independence movement connected by knowledge graphs',
    ja: '忘れられた独立運動家と記録\n独立運動判決文と事件をたどって\n知識グラフでつながる独立運動の旅路',
    zh: '被遗忘的独立运动家和记录\n跟随独立运动判决书和事件\n通过知识图谱连接的独立运动之旅'
  },
  start_exploration: {
    ko: '탐색 시작하기',
    en: 'Start Exploration',
    ja: '探索を開始',
    zh: '开始探索'
  },
  // 자료실 페이지
  dataroom_title: {
    ko: '자료실',
    en: 'Data Room',
    ja: '資料室',
    zh: '资料室'
  },
  search: {
    ko: '검색',
    en: 'Search',
    ja: '検索',
    zh: '搜索'
  },
  clear_all: {
    ko: '모두 지우기',
    en: 'Clear All',
    ja: 'すべてクリア',
    zh: '清除全部'
  },
  search_btn: {
    ko: '검색하기',
    en: 'Search',
    ja: '検索する',
    zh: '搜索'
  },
  table_number: {
    ko: '번호',
    en: 'Number',
    ja: '番号',
    zh: '编号'
  },
  table_title: {
    ko: '제목',
    en: 'Title',
    ja: 'タイトル',
    zh: '标题'
  },
  table_author: {
    ko: '작성자',
    en: 'Author',
    ja: '作成者',
    zh: '作者'
  },
  table_date: {
    ko: '등록일',
    en: 'Date',
    ja: '登録日',
    zh: '注册日期'
  },
  table_attachment: {
    ko: '첨부',
    en: 'Attachment',
    ja: '添付',
    zh: '附件'
  },
  table_views: {
    ko: '조회',
    en: 'Views',
    ja: '閲覧',
    zh: '查看'
  },
  // 메인 페이지 추가 텍스트들
  loading: {
    ko: '스텝퍼 로딩 중...',
    en: 'Loading stepper...',
    ja: 'ステッパー読み込み中...',
    zh: '步骤加载中...'
  },
  step_collection_title: {
    ko: '판결문 수집 및 엔티티 추출',
    en: 'Court Record Collection & Entity Extraction',
    ja: '判決文収集とエンティティ抽出',
    zh: '判决书收集与实体提取'
  },
  step_collection_desc: {
    ko: '판결문에서 인물, 사건, 장소와 같은 정보를 추출합니다.',
    en: 'Extract information such as people, events, and places from court records.',
    ja: '判決文から人物、事件、場所などの情報を抽出します。',
    zh: '从判决书中提取人物、事件、地点等信息。'
  },
  step_sti_title: {
    ko: 'STI 기반 의미 연결',
    en: 'STI-based Semantic Connection',
    ja: 'STIベースの意味接続',
    zh: '基于STI的语义连接'
  },
  step_sti_desc: {
    ko: 'STI(Semantic Table Interpretation) 방식으로 요소 간 의미 있는 관계를 연결하고 지식그래프를 구성합니다.',
    en: 'Connect meaningful relationships between elements using STI (Semantic Table Interpretation) method and construct knowledge graphs.',
    ja: 'STI（Semantic Table Interpretation）方式で要素間の意味のある関係を接続し、知識グラフを構成します。',
    zh: '使用STI（语义表解释）方法连接元素间的有意义关系，构建知识图谱。'
  },
  step_visualization_title: {
    ko: '지식그래프 시각화 탐색',
    en: 'Knowledge Graph Visualization & Exploration',
    ja: '知識グラフの可視化探索',
    zh: '知识图谱可视化探索'
  },
  step_visualization_desc: {
    ko: '시각화된 그래프에서 공적으로 알려지지 않은 독립운동의 흐름을 직접 탐색할 수 있습니다.',
    en: 'You can directly explore the flow of independence movements not publicly known in the visualized graph.',
    ja: '可視化されたグラフで公に知られていない独立運動の流れを直接探索できます。',
    zh: '在可视化图表中直接探索公众不知晓的独立运动流程。'
  },
  section2_title: {
    ko: '독립운동 판결문, 왜 중요할까요?',
    en: 'Why are Independence Movement Court Records Important?',
    ja: '独立運動判決文、なぜ重要なのでしょうか？',
    zh: '独立运动判决书，为什么重要？'
  },
  section2_content_1: {
    ko: '교과서에 나오지 않는 기록이 있습니다.',
    en: 'There are records not found in textbooks.',
    ja: '教科書に載っていない記録があります。',
    zh: '有一些教科书中没有的记录。'
  },
  section2_content_2: {
    ko: '그건 바로, 일제에 체포된 사람들의',
    en: 'These are the',
    ja: 'それは日帝に逮捕された人々の',
    zh: '那就是被日帝逮捕的人们的'
  },
  section2_content_3: {
    ko: '재판 기록',
    en: 'trial records',
    ja: '裁判記録',
    zh: '审判记录'
  },
  section2_content_4: {
    ko: '입니다.',
    en: 'of those arrested by the Japanese.',
    ja: 'です。',
    zh: '。'
  },
  section2_content_5: {
    ko: '우리는 이 판결문 속',
    en: 'We find clues to',
    ja: '私たちはこの判決文の中の',
    zh: '我们从这些判决书中的'
  },
  section2_content_6: {
    ko: '잊혀진 인물',
    en: 'forgotten figures',
    ja: '忘れられた人物',
    zh: '被遗忘的人物'
  },
  section2_content_7: {
    ko: '들로부터',
    en: 'in these court records to discover',
    ja: 'たちから',
    zh: '身上找到'
  },
  section2_content_8: {
    ko: '잊혀진 독립운동',
    en: 'forgotten independence movements',
    ja: '忘れられた独立運動',
    zh: '被遗忘的独立运动'
  },
  section2_content_9: {
    ko: '의 실마리를 찾습니다.',
    en: '.',
    ja: 'の手がかりを見つけます。',
    zh: '的线索。'
  },
  explore_more: {
    ko: '탐색해보기',
    en: 'Explore More',
    ja: 'もっと探索',
    zh: '探索更多'
  },
  section3_title: {
    ko: '사라진 영웅의 이름을 기억하는 방법.',
    en: 'How to Remember the Names of Forgotten Heroes.',
    ja: '消えた英雄の名前を記憶する方法。',
    zh: '记住消失英雄姓名的方法。'
  },
  section3_subtitle: {
    ko: '숨겨진 독립운동을 되짚기 위해\n우리는 세 가지에 집중합니다.',
    en: 'To trace hidden independence movements,\nwe focus on three things.',
    ja: '隠された独立運動を振り返るために\n私たちは3つのことに集中します。',
    zh: '为了追溯隐藏的独立运动，\n我们专注于三件事。'
  },
  card1_title: {
    ko: '데이터 정규화',
    en: 'Data Normalization',
    ja: 'データ正規化',
    zh: '数据规范化'
  },
  card1_desc: {
    ko: '잊혀진 독립운동가, 데이터를 통해 발견합니다.',
    en: 'Discovering forgotten independence activists through data.',
    ja: '忘れられた独立運動家をデータを通じて発見します。',
    zh: '通过数据发现被遗忘的独立运动家。'
  },
  card2_title: {
    ko: '지식그래프',
    en: 'Knowledge Graph',
    ja: '知識グラフ',
    zh: '知识图谱'
  },
  card2_desc: {
    ko: '사건과 사람을 지식그래프로 엮습니다.',
    en: 'Connecting events and people through knowledge graphs.',
    ja: '事件と人物を知識グラフで結びます。',
    zh: '通过知识图谱连接事件和人物。'
  },
  card3_title: {
    ko: '탐색',
    en: 'Exploration',
    ja: '探索',
    zh: '探索'
  },
  card3_desc: {
    ko: '누구나 쉽게 탐색할 수 있는 도구로 만듭니다.',
    en: 'Creating tools that anyone can easily explore.',
    ja: '誰でも簡単に探索できるツールを作ります。',
    zh: '制作任何人都能轻松探索的工具。'
  },
  section5_title: {
    ko: '우리가 알지 못했던 이름들 속에서 새로운 역사가 시작됩니다.',
    en: 'New history begins among the names we never knew.',
    ja: '私たちが知らなかった名前の中で新しい歴史が始まります。',
    zh: '在我们不知道的名字中，新的历史开始了。'
  },
  section5_content: {
    ko: '당신의 클릭 하나가, 기록되지 못한 진실을 밝혀냅니다.\n수많은 재판 기록 속에 숨겨진 목소리를 연결했습니다.\n과거의 조각들을 엮어, 하나의 이야기를 완성해보세요.',
    en: 'Your single click reveals unrecorded truths.\nWe have connected hidden voices in numerous trial records.\nWeave together fragments of the past to complete one story.',
    ja: 'あなたのワンクリックが、記録されなかった真実を明らかにします。\n数多くの裁判記録に隠された声をつなぎました。\n過去のかけらを織り合わせて、一つの物語を完成させてください。',
    zh: '您的一次点击，揭示了未被记录的真相。\n我们连接了众多审判记录中隐藏的声音。\n将过去的碎片编织在一起，完成一个故事。'
  },
  team_intro_1: {
    ko: '우리는 판결문 기반의 인물·사건 데이터를 구조화하고,\nSTI 기반 관계 분석과 지식그래프 기술로\n독립운동의 숨은 연결을 시각화합니다.',
    en: 'We structure character and event data based on court records,\nand visualize hidden connections of independence movements\nthrough STI-based relationship analysis and knowledge graph technology.',
    ja: '私たちは判決文ベースの人物・事件データを構造化し、\nSTIベースの関係分析と知識グラフ技術で\n独立運動の隠れたつながりを可視化します。',
    zh: '我们将基于判决书的人物·事件数据结构化，\n通过基于STI的关系分析和知识图谱技术\n可视化独立运动的隐藏连接。'
  },
  team_title_1: {
    ko: 'HiddenNode 팀을 소개합니다.',
    en: 'Introducing the HiddenNode Team.',
    ja: 'HiddenNodeチームを紹介します。',
    zh: '介绍HiddenNode团队。'
  },
  team_intro_2: {
    ko: '판결문은 단지 결과가 아니라,\n저항의 흔적이 남은 역사적 단서입니다.\n그 안의 인물·사건·장소는 독립운동의 또 다른 퍼즐 조각입니다.',
    en: 'Court records are not just results,\nbut historical clues with traces of resistance.\nThe people, events, and places within are another piece of the independence movement puzzle.',
    ja: '判決文は単なる結果ではなく、\n抵抗の痕跡が残る歴史的手がかりです。\nその中の人物・事件・場所は独立運動のもう一つのパズルピースです。',
    zh: '判决书不仅仅是结果，\n而是留有抵抗痕迹的历史线索。\n其中的人物·事件·地点是独立运动的另一个拼图碎片。'
  },
  team_title_2: {
    ko: '이름 없는 기억을 잇는다는 것.',
    en: 'Connecting Nameless Memories.',
    ja: '名もない記憶をつなぐということ。',
    zh: '连接无名的记忆。'
  },
  team_intro_3: {
    ko: '잊힌 이름을 다시 연결하는 이 작업이,\n누군가에게는 역사를 다시 생각하는 계기가 되길 바랍니다.',
    en: 'We hope this work of reconnecting forgotten names\nwill become an opportunity for someone to rethink history.',
    ja: '忘れられた名前を再びつなぐこの作業が、\n誰かにとって歴史を再び考える機会になることを願います。',
    zh: '我们希望这项重新连接被遗忘姓名的工作，\n能成为某些人重新思考历史的契机。'
  },
  team_title_3: {
    ko: '이름 없는 기억을 잇는다는 것',
    en: 'Connecting Nameless Memories',
    ja: '名もない記憶をつなぐということ',
    zh: '连接无名的记忆'
  },
  // 자료실 서브페이지 번역
  dataroom_breadcrumb: {
    ko: '자료실',
    en: 'Data Room',
    ja: '資料室',
    zh: '资料室'
  },
  intro_title: {
    ko: '판결문 콘텐츠 소개',
    en: 'Introduction to Court Record Content',
    ja: '判決文コンテンツの紹介',
    zh: '判决书内容介绍'
  },
  liberation_title: {
    ko: '해방',
    en: 'Liberation',
    ja: '解放',
    zh: '解放'
  },
  liberation_joy_title: {
    ko: '광복의 기쁨',
    en: 'Joy of Liberation',
    ja: '光復の喜び',
    zh: '光复的喜悦'
  },
  // 자료실 서브페이지 추가 번역
  construction_purpose: {
    ko: '구축 목적',
    en: 'Construction Purpose',
    ja: '構築目的',
    zh: '建设目的'
  },
  judgment_extraction_criteria: {
    ko: '판결문 추출기준',
    en: 'Judgment Extraction Criteria',
    ja: '判決文抽出基準',
    zh: '判决书提取标准'
  },
  occupation_title: {
    ko: '일제강점기 체포와 수형,그리고 기록물',
    en: 'Arrests, Imprisonment, and Records during Japanese Colonial Period',
    ja: '日帝強占期の逮捕と受刑、そして記録物',
    zh: '日帝强占期的逮捕与服刑，以及记录物'
  },
  // Featured Cards 번역
  featured_card_intro: {
    ko: '판결문 콘텐츠 소개',
    en: 'Introduction to Court Record Content',
    ja: '判決文コンテンツの紹介',
    zh: '判决书内容介绍'
  },
  featured_card_occupation: {
    ko: '일제강점기 체포와 수형,그리고 기록물',
    en: 'Arrests, Imprisonment, and Records during Japanese Colonial Period',
    ja: '日帝強占期の逮捕と受刑、そして記録物',
    zh: '日帝强占期的逮捕与服刑，以及记录物'
  },
  featured_card_liberation: {
    ko: '해방',
    en: 'Liberation',
    ja: '解放',
    zh: '解放'
  },
  // Liberation 페이지 본문 번역
  liberation_content_1: {
    ko: '1945년 8월 15일 조선은 일본 천황이 항복 사실을 발표하면서 해방되었다. 지역에 따라 소식이 전해지는 데에는 시간차가 있었지만, 전국에서 해방을 환영하는 시위가 열렸다. 식민통치를 상징하던 관공서, 주재소, 신사 등이 불붙던 지역도 상당했다. 다만, 태평양전쟁 승전국인 미군과 소련군이 진주하기 전까지 일본군의 무장은 해제되지 않았고, 조선 내 행정·치안은 공식적으로 조선총독부가 장악하고 있었다.',
    en: 'On August 15, 1945, Korea was liberated when the Japanese Emperor announced Japan\'s surrender. Although there was a time lag in the news reaching different regions, liberation celebration demonstrations were held nationwide. There were considerable areas where government offices, police stations, and shrines symbolizing colonial rule were set on fire. However, until the U.S. and Soviet armies, the victorious nations of the Pacific War, entered, the Japanese military was not disarmed, and the administrative and security affairs within Korea were officially controlled by the Government-General of Korea.',
    ja: '1945年8月15日、朝鮮は日本天皇が降伏の事実を発表することで解放された。地域によってニュースが伝わるのに時間差があったが、全国で解放を歓迎するデモが開かれた。植民統治を象徴する官公署、駐在所、神社などが燃やされた地域もかなりあった。ただし、太平洋戦争戦勝国である米軍とソ連軍が進駐するまで日本軍の武装は解除されず、朝鮮内の行政・治安は公式的に朝鮮総督府が掌握していた。',
    zh: '1945年8月15日，朝鲜随着日本天皇宣布投降而获得解放。虽然消息传达到各地区有时间差，但全国各地都举行了欢迎解放的示威活动。象征殖民统治的政府机关、派出所、神社等被焚烧的地区也相当多。但是，在太平洋战争战胜国美军和苏军进驻之前，日军并未解除武装，朝鲜内的行政·治安仍由朝鲜总督府正式掌握。'
  },
  liberation_content_2: {
    ko: '조선총독부에 남아있던 행정·치안권은 남과 북에 미군과 소련이 진주하면서 해체되었다. 이미 8월 중순부터 38도선 이북지역에 진주했던 소련군은 북한 지역 내 일본군에게 항복을 받고 무기를 접수하였으며, 식민통치기구 및 일본인 소유 재산 등을 관리하기 시작했다. 38도선 이남지역은 9월 8일 미군이 남한 지역에 상륙하고 다음날 서울에 진주하면서 조선총독부의 권한이 이양되었다. 서울 진주와 동시에 미군은 "맥아더 사령부 포고 제1호"를 발표하면서 공식적으로 북위 38도 이남 지역의 점령통치를 선언하였다.',
    en: 'The administrative and security powers remaining in the Government-General of Korea were dismantled as U.S. and Soviet forces entered the south and north. The Soviet forces, which had already entered the northern region above the 38th parallel since mid-August, received surrender from Japanese forces in North Korea and confiscated weapons, and began managing colonial administrative institutions and Japanese-owned property. In the region south of the 38th parallel, U.S. forces landed in South Korea on September 8 and entered Seoul the next day, transferring the authority of the Government-General of Korea. Upon entering Seoul, the U.S. military announced "MacArthur Command Proclamation No. 1," officially declaring occupation rule over the area south of the 38th parallel.',
    ja: '朝鮮総督府に残っていた行政・治安権は南と北に米軍とソ連が進駐することで解体された。すでに8月中旬から38度線以北地域に進駐していたソ連軍は北朝鮮地域内の日本軍に降伏を受け武器を接収し、植民統治機構及び日本人所有財産などを管理し始めた。38度線以南地域は9月8日米軍が南朝鮮地域に上陸し翌日ソウルに進駐することで朝鮮総督府の権限が移譲された。ソウル進駐と同時に米軍は「マッカーサー司令部布告第1号」を発表し、公式的に北緯38度以南地域の占領統治を宣言した。',
    zh: '朝鲜总督府剩余的行政·治安权随着美军和苏军分别进驻南北而被解体。从8月中旬开始就已进驻38线以北地区的苏军接受了北朝鲜地区内日军的投降并没收武器，开始管理殖民统治机构及日本人所有财产等。38线以南地区，9月8日美军在南朝鲜地区登陆，次日进驻首尔，朝鲜总督府的权限得以移交。在进驻首尔的同时，美军发表了"麦克阿瑟司令部布告第1号"，正式宣布对北纬38度以南地区的占领统治。'
  },
  liberation_content_3: {
    ko: '이후 38도선을 경계로 남북 모두에서 군정청이 설치되면서 한반도는 사실상 분단의 길로 나아갔다. 한편, 해방과 함께 한반도 내외부에서 대규모 이주가 시작되었다. 식민지기 조선인의 해외이주는 대표적으로 일본으로 약 183만 명, 만주로 약 103만 명으로 추산되는데, 해방이 되자 한반도로 귀환하기 시작했다.',
    en: 'Subsequently, with military governments established in both the north and south along the 38th parallel, the Korean Peninsula effectively moved toward division. Meanwhile, large-scale migration began both within and outside the Korean Peninsula with liberation. The overseas migration of Koreans during the colonial period is estimated to be approximately 1.83 million to Japan and 1.03 million to Manchuria, and they began returning to the Korean Peninsula upon liberation.',
    ja: 'その後38度線を境界に南北両方で軍政庁が設置されることで韓半島は事実上分断の道に進んだ。一方、解放とともに韓半島内外で大規模移住が始まった。植民地期朝鮮人の海外移住は代表的に日本に約183万人、満州に約103万人と推算されるが、解放となると韓半島に帰還し始めた。',
    zh: '此后以38线为界在南北都设立军政厅，朝鲜半岛事实上走向了分裂的道路。另一方面，随着解放，朝鲜半岛内外开始了大规模迁移。殖民地时期朝鲜人的海外迁移，据推算主要是约183万人到日本，约103万人到满洲，解放后开始返回朝鲜半岛。'
  },
  liberation_content_4: {
    ko: '1945~1948년 사이에 귀한민과 월남민을 포함해 남한지역으로 들어온 인구는 약 250만 명, 본국으로 돌아간 일본인은 약 60만 명으로 추정된다. 『해방』 테마에서는 이 같은 시대적 분위기를 확인할 수 있는 영상이 상당수 수록되어 있다. 미군의 인천 상륙 장면부터, 조선총독부 일장기 하강, 미군에 대한 환영식, 미군 조선 주둔 일본군의 항복문서에 서명 및 무장해제 등의 모습을 확인할 수 있다. 또한 인천항과 부산항을 통해 해외이주민들이 귀환하는 모습, 일본군이 귀환하는 모습 역시 살펴볼 수 있다.',
    en: 'Between 1945 and 1948, approximately 2.5 million people, including repatriates and refugees from the north, entered South Korea, while approximately 600,000 Japanese returned to their homeland. The "Liberation" theme contains numerous videos that confirm the atmosphere of this era. You can see scenes from the U.S. military\'s landing at Incheon, the lowering of the Japanese flag at the Government-General of Korea, welcome ceremonies for U.S. forces, the signing of surrender documents and disarmament of Japanese forces stationed in Korea by the U.S. military. You can also observe overseas migrants returning through Incheon and Busan ports, as well as scenes of Japanese troops returning.',
    ja: '1945~1948年の間に帰還民と越南民を含めて南朝鮮地域に入った人口は約250万人、本国に帰った日本人は約60万人と推定される。『解放』テーマではこのような時代的雰囲気を確認できる映像がかなり収録されている。米軍の仁川上陸場面から、朝鮮総督府日章旗下降、米軍に対する歓迎式、米軍朝鮮駐屯日本軍の降伏文書に署名及び武装解除などの様子を確認できる。また仁川港と釜山港を通じて海外移住民たちが帰還する様子、日本軍が帰還する様子も見ることができる。',
    zh: '1945~1948年间，包括归还民和越南民在内进入南朝鲜地区的人口约250万人，回到本国的日本人约60万人。在《解放》主题中收录了相当多能够确认这种时代氛围的影像。可以确认从美军仁川登陆场面开始，朝鲜总督府日章旗下降、对美军的欢迎式、美军朝鲜驻屯日本军投降文书签名及武装解除等样子。还可以看到通过仁川港和釜山港海外移住民归还的样子、日本军归还的样子。'
  },
  other_content_title: {
    ko: '다른 콘텐츠도 둘러보세요',
    en: 'Explore Other Content',
    ja: '他のコンテンツもご覧ください',
    zh: '浏览其他内容'
  },
  // Intro 페이지 본문 번역
  intro_content_1: {
    ko: '독립운동 역사가 정당한 평가를 받기 위해서는 독립운동에 헌신했던 선열들을 찾아 그 공적을 널리 알리고, 당사자 및 후손들이 정당한 예우를 받도록 해야 합니다. 독립유공자와 후손들을 예우하는 것은 국가의 정통성과 존엄성을 바로 세우는 일이기 때문입니다.',
    en: 'For the history of the independence movement to receive proper evaluation, we must find the patriots who devoted themselves to the independence movement, widely publicize their achievements, and ensure that the parties and their descendants receive proper recognition. Honoring independence patriots and their descendants is a matter of establishing the legitimacy and dignity of the nation.',
    ja: '独立運動の歴史が正当な評価を受けるためには、独立運動に献身した先烈たちを探してその功績を広く知らしめ、当事者及び後孫たちが正当な礼遇を受けるようにしなければなりません。独立功労者と後孫たちを礼遇することは国家の正統性と尊厳性を正しく立てることだからです。',
    zh: '为了使独立运动历史得到正当评价，必须找到献身于独立运动的先烈们，广泛宣传他们的功绩，使当事人及后代得到正当的礼遇。礼遇独立功臣和后代是确立国家正统性和尊严性的工作。'
  },
  intro_content_2: {
    ko: '독립운동가의 인적사항과 당시 활동상을 확인하기 위해서는 판결문이나 재소자 신분카드, 범죄인 명부, 수형인 명부, 당시의 기관지, 정보 보고서, 신문 등이 많이 활용됩니다. 그러나 사학을 전공한 전문가가 아닌 일반 개인이 이런 자료를 찾고 확인하기란 쉬운 일이 아니며, 검색채널 또한 제한적입니다.',
    en: 'To verify the personal information and activities of independence activists, court records, detainee identity cards, criminal registers, prisoner registers, publications of the time, intelligence reports, newspapers, etc. are frequently used. However, it is not easy for ordinary individuals who are not experts in history to find and verify such materials, and search channels are also limited.',
    ja: '独立運動家の人的事項と当時の活動状況を確認するためには、判決文や在監者身分カード、犯罪人名簿、受刑人名簿、当時の機関誌、情報報告書、新聞などが多く活用されます。しかし史学を専攻した専門家ではない一般個人がこのような資料を探し確認することは容易なことではなく、検索チャンネルも制限的です。',
    zh: '为了确认独立运动家的人员信息和当时的活动状况，经常使用判决书、在押者身份证、罪犯名册、服刑人名册、当时的机关报、情报报告书、报纸等。但是，非史学专业的一般个人要找到并确认这些资料并不容易，搜索渠道也有限。'
  },
  intro_content_3: {
    ko: '따라서, 국가기록원에 소장중인 형사사건 판결문 중 독립운동 관련 판결문을 선별하고, 내용 이해를 돕기 위해 판결주문을 번역, 사건개요 및 주제어 등을 작성하여 일반국민들과 학술연구자들이 보다 쉽게 검색 활용할 수 있게 하기 위해 본 콘텐츠을 구축하였습니다.',
    en: 'Therefore, this content was built to select independence movement-related judgments from criminal case judgments held in the National Archives, translate judgment orders to help understand the content, and write case summaries and keywords so that the general public and academic researchers can more easily search and utilize them.',
    ja: 'したがって、国家記録院に所蔵中の刑事事件判決文の中から独立運動関連判決文を選別し、内容理解を助けるために判決主文を翻訳、事件概要及び主題語などを作成して一般国民と学術研究者たちがより簡単に検索活用できるようにするためにこのコンテンツを構築しました。',
    zh: '因此，我们构建了这个内容，从国家档案院收藏的刑事案件判决书中筛选出独立运动相关判决书，为了帮助理解内容而翻译判决主文，编写案件概要和主题词等，使一般国民和学术研究者能够更容易地搜索利用。'
  },
  judgment_extraction_title: {
    ko: '독립운동 판결문 추출기준',
    en: 'Independence Movement Judgment Extraction Criteria',
    ja: '独立運動判決文抽出基準',
    zh: '独立运动判决书提取标准'
  },
  // Dataroom table 제목들 번역
  judgment_summary: {
    ko: '의열단 사건 판결문 요약',
    en: 'Uiyeoldan Incident Judgment Summary',
    ja: '義烈団事件判決文要約',
    zh: '义烈团事件判决书摘要'
  },
  june_10_movement: {
    ko: '6.10 만세운동 주요 인물 및 판결 정보',
    en: 'June 10 Independence Movement Key Figures and Judgment Information',
    ja: '6.10万歳運動主要人物及び判決情報',
    zh: '6.10万岁运动主要人物及判决信息'
  },
  gwangju_student_movement: {
    ko: '광주학생운동 판결문 및 인물 관계',
    en: 'Gwangju Student Movement Judgments and Personal Relations',
    ja: '光州学生運動判決文及び人物関係',
    zh: '光州学生运动判决书及人物关系'
  },
  // 나머지 테이블 제목들
  shingan_society: {
    ko: '신간회 사건 요약 및 판결문 발췌',
    en: 'Singan Society Incident Summary and Judgment Excerpts',
    ja: '新幹会事件要約及び判決文抜粋',
    zh: '新干会事件摘要及判决书摘录'
  },
  korean_language_society: {
    ko: '조선어학회 사건 판결문 및 인물 정보',
    en: 'Korean Language Society Incident Judgments and Personal Information',
    ja: '朝鮮語学会事件判決文及び人物情報',
    zh: '朝鲜语学会事件判决书及人物信息'
  },
  korean_independence_corps: {
    ko: '대한독립단 사건 주요 판결문',
    en: 'Korean Independence Corps Major Judgments',
    ja: '大韓独立団事件主要判決文',
    zh: '大韩独立团事件主要判决书'
  },
  heungsadan: {
    ko: '흥사단 사건 인물 및 판결 요약',
    en: 'Heungsadan Incident Figures and Judgment Summary',
    ja: '興士団事件人物及び判決要約',
    zh: '兴士团事件人物及判决摘要'
  },
  bumin_hall_bombing: {
    ko: '부민관 폭파사건 판결문 및 관계망',
    en: 'Bumin Hall Bombing Incident Judgments and Networks',
    ja: '府民館爆破事件判決文及び関係網',
    zh: '府民馆爆破事件判决书及关系网'
  },
  korean_communist_party: {
    ko: '조선공산당 사건 판결문 요약',
    en: 'Korean Communist Party Incident Judgment Summary',
    ja: '朝鮮共産党事件判決文要約',
    zh: '朝鲜共产党事件判决书摘要'
  },
  korean_liberation_association: {
    ko: '대한광복회 사건 인물 및 판결 정보',
    en: 'Korean Liberation Association Incident Figures and Judgment Information',
    ja: '大韓光復会事件人物及び判決情報',
    zh: '大韩光复会事件人物及判决信息'
  },
  march_first_movement: {
    ko: '3.1운동 주요 인물 판결문',
    en: 'March 1st Movement Key Figures Judgments',
    ja: '3.1運動主要人物判決文',
    zh: '3.1运动主要人物判决书'
  },
  hyeongpyeongsa: {
    ko: '형평사 사건 판결문 및 인물 관계',
    en: 'Hyeongpyeongsa Incident Judgments and Personal Relations',
    ja: '衡平社事件判決文及び人物関係',
    zh: '衡平社事件判决书及人物关系'
  },
  korean_student_science_society: {
    ko: '조선학생과학연구회 사건 요약',
    en: 'Korean Student Science Research Society Incident Summary',
    ja: '朝鮮学生科学研究会事件要約',
    zh: '朝鲜学生科学研究会事件摘要'
  },
  korean_people_association: {
    ko: '조선민흥회 사건 판결문 발췌',
    en: 'Korean People\'s Association Incident Judgment Excerpts',
    ja: '朝鮮民興会事件判決文抜粋',
    zh: '朝鲜民兴会事件判决书摘录'
  },
  sinmin_society: {
    ko: '신민회 사건 인물 및 판결 정보',
    en: 'Sinmin Society Incident Figures and Judgment Information',
    ja: '新民会事件人物及び判決情報',
    zh: '新民会事件人物及判决信息'
  },
  korean_liberation_army: {
    ko: '대한광복군 사건 판결문 요약',
    en: 'Korean Liberation Army Incident Judgment Summary',
    ja: '大韓光復軍事件判決文要約',
    zh: '大韩光复军事件判决书摘要'
  },
  korean_founding_alliance: {
    ko: '조선건국동맹 사건 판결문 및 인물 정보',
    en: 'Korean Founding Alliance Incident Judgments and Personal Information',
    ja: '朝鮮建国同盟事件判決文及び人物情報',
    zh: '朝鲜建国同盟事件判决书及人物信息'
  },
  korean_volunteer_corps: {
    ko: '조선의용대 사건 판결문 발췌',
    en: 'Korean Volunteer Corps Incident Judgment Excerpts',
    ja: '朝鮮義勇隊事件判決文抜粋',
    zh: '朝鲜义勇队事件判决书摘录'
  },
  provisional_government: {
    ko: '대한민국임시정부 사건 요약',
    en: 'Provisional Government of Korea Incident Summary',
    ja: '大韓民国臨時政府事件要約',
    zh: '大韩民国临时政府事件摘要'
  },
  korean_youth_independence_corps: {
    ko: '조선청년독립단 사건 판결문',
    en: 'Korean Youth Independence Corps Incident Judgments',
    ja: '朝鮮青年独立団事件判決文',
    zh: '朝鲜青年独立团事件判决书'
  },
  korean_labor_union_council: {
    ko: '조선노동조합전국평의회 사건',
    en: 'Korean National Labor Union Council Incident',
    ja: '朝鮮労働組合全国評議会事件',
    zh: '朝鲜劳动组合全国评议会事件'
  },
  korean_revolutionary_army: {
    ko: '조선혁명군 사건 판결문 및 인물 정보',
    en: 'Korean Revolutionary Army Incident Judgments and Personal Information',
    ja: '朝鮮革命軍事件判決文及び人物情報',
    zh: '朝鲜革命军事件判决书及人物信息'
  },
  korean_national_revolutionary_party: {
    ko: '조선민족혁명당 사건 판결문 요약',
    en: 'Korean National Revolutionary Party Incident Judgment Summary',
    ja: '朝鮮民族革命党事件判決文要約',
    zh: '朝鲜民族革命党事件判决书摘要'
  },
  korean_women_friendship_society: {
    ko: '조선여성동우회 사건 판결문',
    en: 'Korean Women\'s Friendship Society Incident Judgments',
    ja: '朝鮮女性同友会事件判決文',
    zh: '朝鲜女性同友会事件判决书'
  },
  korean_youth_league: {
    ko: '조선소년연맹 사건 판결문 및 인물 관계',
    en: 'Korean Youth League Incident Judgments and Personal Relations',
    ja: '朝鮮少年連盟事件判決文及び人物関係',
    zh: '朝鲜少年联盟事件判决书及人物关系'
  },
  // Occupation 페이지 본문 번역
  occupation_content_1: {
    ko: '우리나라의 사법근대화는 1894년 갑오개혁기의 권설재판소로부터 시작되었다. 그러나, 1909년 기유각서에 의해 사법제도는 일제에 완전히 장악되었고, 일제강점기에는 식민지적 특수성을 갖는 왜곡된 형태로 변질되었다. 일제의 식민통치는 우리민족 대다수가 이를 반대하였다는 점에서 강압적 치안유지와 일상적 감시체제를 통해 유지되었으며, 경찰과 재판소, 감옥은 이를 위한 제도적 장치로 작동하였다.',
    en: 'The judicial modernization of Korea began with the temporary courts established during the Gabo Reform of 1894. However, by the 1909 Giyugeakseo Agreement, the judicial system was completely seized by Japan, and during the Japanese colonial period, it was distorted into a form with colonial peculiarities. Japanese colonial rule was maintained through coercive security measures and daily surveillance systems, as the majority of our people opposed it, and police, courts, and prisons functioned as institutional mechanisms for this purpose.',
    ja: 'わが国の司法近代化は1894年甲午改革期の権設裁判所から始まった。しかし、1909年己酉覚書により司法制度は日帝に完全に掌握され、日帝強占期には植民地的特殊性を持つ歪曲された形態に変質した。日帝の植民統治は我が民族の大多数がこれに反対したという点で強圧的治安維持と日常的監視体制を通じて維持され、警察と裁判所、監獄はこのための制度的装置として作動した。',
    zh: '我国的司法现代化始于1894年甲午改革期的临时法院。但是，1909年己酉协定使司法制度完全被日帝掌握，日帝强占期变质为具有殖民地特殊性的扭曲形态。日帝的殖民统治由于我民族大多数人反对，通过强制性治安维持和日常监视体制得以维持，警察、法院、监狱作为其制度性装置运作。'
  },
  occupation_subtitle_1: {
    ko: '일제의 사법제도, 조선을 지배하다.',
    en: 'Japanese Judicial System Dominates Korea.',
    ja: '日帝の司法制度、朝鮮を支配する。',
    zh: '日帝司法制度，统治朝鲜。'
  },
  // Intro 페이지 추가 섹션들
  judgment_extraction_criteria_text_1: {
    ko: '독립운동 관련 기록물은 죄명과 판결 내용 등을 근거로 설정하였습니다. 죄명으로는 치안유지법, 보안법, 조선 임시 보안령, 대정8년 제령 제7호, 육군형법, 해군형법, 내란, 불경죄, 출판법, 안녕질서에 관한 죄, 정치범 처벌규칙, 폭동 등과 관련한 기록물을 선정하였습니다.',
    en: 'Independence movement-related records were established based on charges and judgment contents. Records related to charges such as the Peace Preservation Law, Security Law, Temporary Korean Security Ordinance, Imperial Ordinance No. 7 of 1919, Army Criminal Law, Navy Criminal Law, insurrection, lese majeste, Publication Law, crimes against public peace and order, political criminal punishment rules, and riots were selected.',
    ja: '独立運動関連記録物は罪名と判決内容などを根拠に設定しました。罪名としては治安維持法、保安法、朝鮮臨時保安令、大正8年制令第7号、陸軍刑法、海軍刑法、内乱、不敬罪、出版法、安寧秩序に関する罪、政治犯処罰規則、暴動などに関連した記録物を選定しました。',
    zh: '独立运动相关记录以罪名和判决内容等为根据进行设定。选定了与治安维持法、保安法、朝鲜临时保安令、大正8年制令第7号、陆军刑法、海军刑法、内乱、不敬罪、出版法、安宁秩序罪、政治犯处罚规则、暴动等相关的记录。'
  },
  judgment_extraction_criteria_text_2: {
    ko: '또한 죄명이 아니더라도, 판결문에 "독립운동", "대한독립", "가정부(假政府)", "군자금 모집" 등의 독립운동 관련 용어 및 내용이 포함되어 있는 경우를 선정하여 추출하였습니다. 아울러 본 콘텐츠은 독립운동의 개연성이 있는 기록물을 소개한 것으로 국가보훈인정 여부는 별도로 해당 기관에 직접 문의하셔야 함을 알려 드립니다.',
    en: 'Even if not charges, cases where judgment documents contained independence movement-related terms and contents such as "independence movement", "Korean independence", "provisional government", "military fund collection" were selected and extracted. Please note that this content introduces records with the possibility of independence movement activities, and recognition by national veterans affairs should be separately inquired directly to the relevant institutions.',
    ja: 'また罪名でなくても、判決文に「独立運動」、「大韓独立」、「仮政府」、「軍資金募集」などの独立運動関連用語及び内容が含まれている場合を選定して抽出しました。なお、このコンテンツは独立運動の蓋然性がある記録物を紹介したもので、国家報勲認定については別途該当機関に直接お問い合わせください。',
    zh: '即使不是罪名，也选定并提取了判决书中包含"独立运动"、"大韩独立"、"假政府"、"军资金募集"等独立运动相关用语及内容的案例。另外，本内容介绍的是具有独立运动可能性的记录，国家报勋认定与否需要另行向相关机关直接咨询。'
  },
  records_status_table_title: {
    ko: '국가기록원 소장 독립운동 관련 기록물 정리 현황(2014년 현재)',
    en: 'Status of Independence Movement-Related Records Organized by National Archives (as of 2014)',
    ja: '国家記録院所蔵独立運動関連記録物整理現況（2014年現在）',
    zh: '国家档案院收藏独立运动相关记录整理现状（截至2014年）'
  },
  table_classification: {
    ko: '구분',
    en: 'Classification',
    ja: '区分',
    zh: '分类'
  },
  table_judgment_documents: {
    ko: '판결문',
    en: 'Judgment Documents',
    ja: '判決文',
    zh: '判决书'
  },
  table_criminal_case_register: {
    ko: '형사사건부',
    en: 'Criminal Case Register',
    ja: '刑事事件簿',
    zh: '刑事案件簿'
  },
  table_execution_register: {
    ko: '집행원부',
    en: 'Execution Register',
    ja: '執行原簿',
    zh: '执行原簿'
  },
  table_prisoner_register: {
    ko: '수형인명부',
    en: 'Prisoner Register',
    ja: '受刑人名簿',
    zh: '服刑人名册'
  },
  table_quantity: {
    ko: '분량(건)',
    en: 'Quantity (Cases)',
    ja: '分量（件）',
    zh: '数量（件）'
  },
  records_note_1: {
    ko: '* 단 일부 정리되지 않은 기록물이 있으므로 향후 숫자는 증가할 수 있음',
    en: '* However, some records are not yet organized, so the numbers may increase in the future',
    ja: '* ただし、一部整理されていない記録物があるため、今後数字は増加する可能性があります',
    zh: '* 但由于存在部分未整理的记录，今后数字可能会增加'
  },
  records_note_2: {
    ko: '* 국가기록원은 위의 기록물과 아직 정리되지 않은 기록물들을 연차적으로 정리하여 기본정보 및 이미지를 지속적으로 제공할 예정입니다.',
    en: '* The National Archives plans to organize the above records and those not yet organized on an annual basis to continuously provide basic information and images.',
    ja: '* 国家記録院は上記の記録物とまだ整理されていない記録物を年次的に整理し、基本情報及びイメージを継続的に提供する予定です。',
    zh: '* 国家档案院计划逐年整理上述记录和尚未整理的记录，持续提供基本信息和图像。'
  },
  records_nature_title: {
    ko: '독립운동 관련 기록물의 성격',
    en: 'Nature of Independence Movement-Related Records',
    ja: '独立運動関連記録物の性格',
    zh: '独立运动相关记录的性质'
  },
  records_nature_text_1: {
    ko: '이 콘텐츠에 소개된 독립운동 관련 기록물은 대부분 행형기록물입니다. 행형이란 좁은 의미로는 징역․금고․구류 등 자유형의 집행방법을 말합니다. 자유형이란 범죄인을 사회로부터 격리시켜 개인의 신체적 자유를 제한하는 형벌을 의미합니다.',
    en: 'Most of the independence movement-related records introduced in this content are correctional records. Corrections in a narrow sense refers to the execution methods of liberty punishment such as imprisonment, confinement, and detention. Liberty punishment means punishment that isolates criminals from society and restricts individual physical freedom.',
    ja: 'このコンテンツに紹介された独立運動関連記録物は大部分が行刑記録物です。行刑とは狭い意味では懲役・禁錮・拘留など自由刑の執行方法を言います。自由刑とは犯罪人を社会から隔離して個人の身体的自由を制限する刑罰を意味します。',
    zh: '本内容介绍的独立运动相关记录大部分是行刑记录。行刑狭义上是指徒刑、禁锢、拘留等自由刑的执行方法。自由刑是指将罪犯从社会中隔离，限制个人身体自由的刑罚。'
  },
  records_nature_text_2: {
    ko: '그러나 넓은 의미로는 사형수의 수용, 노역장 유치, 미결수 수용까지도 포함한 개념입니다. 행형제도는 수형자에 대한 교정, 교화와 사회복귀를 위하여 교육을 시키는 제도이며, 행형기록은 그 과정에서 생산된 기록물이라고 할 수 있습니다. 엄격한 의미에서 행형은 감옥에 수감된 이후, 즉 수형 이후의 상황을 일컫는 것이므로 행형기록도 수형 이후의 기록만을 지칭해야 합니다.',
    en: 'However, in a broad sense, it includes concepts such as housing death row inmates, labor camp detention, and detention of unconvicted prisoners. The correctional system is a system that educates prisoners for correction, rehabilitation, and social reintegration, and correctional records can be said to be records produced in that process. In the strict sense, corrections refers to situations after imprisonment, that is, after sentencing, so correctional records should also refer only to records after sentencing.',
    ja: 'しかし広い意味では死刑囚の収容、労役場留置、未決囚収容までも含んだ概念です。行刑制度は受刑者に対する矯正、教化と社会復帰のために教育をさせる制度であり、行刑記録はその過程で生産された記録物と言えます。厳格な意味で行刑は監獄に収監された以後、すなわち受刑以後の状況を指すものなので行刑記録も受刑以後の記録のみを指称すべきです。',
    zh: '但从广义上讲，还包括死刑犯收容、劳役场拘留、未决犯收容等概念。行刑制度是对服刑者进行矫正、教化和社会复归教育的制度，行刑记录可以说是在此过程中产生的记录。严格意义上，行刑是指入狱后，即判刑后的情况，因此行刑记录也应该只指判刑后的记录。'
  },
  records_nature_text_3: {
    ko: '그러나, 국가기록원에서는 피의자가 기소되어 형을 판결 받고 그 형이 집행되는 과정에서 생산되는 기록물 모두를 아울러서 \'행형기록\'으로 지칭하고 있습니다. 이 콘텐츠에서 소개하는 독립운동 관련 기록물은 정확히 말하자면 일제시기 형사소송 행형기록물 중 독립운동과 관련한 기록물이라고 할 수 있습니다.',
    en: 'However, the National Archives refers to all records produced in the process of suspects being prosecuted, sentenced, and having their sentences executed as "correctional records." The independence movement-related records introduced in this content can be said to be, strictly speaking, records related to independence movements among criminal litigation correctional records from the Japanese colonial period.',
    ja: 'しかし、国家記録院では被疑者が起訴されて刑を判決され、その刑が執行される過程で生産される記録物すべてをまとめて「行刑記録」と呼んでいます。このコンテンツで紹介する独立運動関連記録物は正確に言えば日帝時期刑事訴訟行刑記録物のうち独立運動に関連した記録物と言えます。',
    zh: '但是，国家档案院将嫌疑人被起诉、判刑及其刑罚执行过程中产生的所有记录统称为"行刑记录"。本内容介绍的独立运动相关记录，准确地说，可以说是日帝时期刑事诉讼行刑记录中与独立运动相关的记录。'
  },
  // Occupation 페이지 추가 섹션들
  modern_judicial_introduction: {
    ko: '가. 근대 사법제도의 도입',
    en: 'A. Introduction of Modern Judicial System',
    ja: 'ア. 近代司法制度の導入',
    zh: '甲. 现代司法制度的引入'
  },
  modern_judicial_text: {
    ko: '우리나라에서 근대적 사법체계의 필요성은 1880년대 김옥균, 박영효 등 개화파에 의해 제기되기도 하였으나, 구체화된 것은 1894년 갑오개혁기였다. 이 시기에 법무아문이 신설되고 산하에 권설 재판소가 설치된 것이 그 시초라고 할 수 있다. 이후 고등재판소, 평리원으로 이름이 바뀌어 유지되었고, 지방재판소와 감옥서도 점차 근대적 틀을 갖추게 되었다.',
    en: 'The necessity of a modern judicial system in Korea was raised by enlightenment activists such as Kim Ok-gyun and Park Yeong-hyo in the 1880s, but it was materialized during the Gabo Reform of 1894. The establishment of the Ministry of Justice and the installation of temporary courts under it during this period can be said to be the beginning. Later, the names were changed to High Court and Pyeongwon and maintained, and local courts and prison offices gradually acquired modern frameworks.',
    ja: 'わが国で近代的司法体系の必要性は1880年代金玉均、朴泳孝など開化派によって提起されたりもしましたが、具体化されたのは1894年甲午改革期でした。この時期に法務衙門が新設され傘下に権設裁判所が設置されたのがその始まりと言えます。その後高等裁判所、平理院と名前が変わって維持され、地方裁判所と監獄署も次第に近代的枠組みを備えるようになりました。',
    zh: '我国现代司法体系的必要性在1880年代由金玉均、朴泳孝等开化派提出，但具体化是在1894年甲午改革期。这一时期新设法务衙门，下设临时法院，可以说是其开端。此后改名为高等法院、平理院并得以维持，地方法院和监狱署也逐渐具备了现代框架。'
  },
  japanese_judicial_control: {
    ko: '나. 일제의 사법제도 장악과 사법기구',
    en: 'B. Japanese Control of Judicial System and Judicial Organizations',
    ja: 'イ. 日帝の司法制度掌握と司法機構',
    zh: '乙. 日帝对司法制度的掌握和司法机构'
  },
  before_occupation: {
    ko: '1. 조선 강점 이전',
    en: '1. Before Korean Occupation',
    ja: '1. 朝鮮強占以前',
    zh: '1. 朝鲜强占以前'
  },
  before_occupation_text: {
    ko: '1907년 재판소 구성법 제정으로 일제는 구재판소, 지방재판소, 공소원, 대심원 체계를 만들고 일본인 판검사를 임용하기 시작했다. 1909년 기유각서로 한국의 사법권이 통감부로 이관되며 재판소들이 일제 체계로 편입되었다.',
    en: 'With the enactment of the Court Organization Act in 1907, Japan created a system of district courts, local courts, public prosecutors\' offices, and the Supreme Court, and began appointing Japanese judges and prosecutors. In 1909, with the Giyugeakseo Agreement, Korea\'s judicial authority was transferred to the Residency-General, and the courts were incorporated into the Japanese system.',
    ja: '1907年裁判所構成法制定により日帝は区裁判所、地方裁判所、控訴院、大審院体系を作り日本人判検事を任用し始めた。1909年己酉覚書で韓国の司法権が統監府に移管され裁判所たちが日帝体系に編入された。',
    zh: '1907年制定法院组织法，日帝建立了区法院、地方法院、上诉院、大审院体系，开始任用日本人法官检察官。1909年己酉协定使韩国司法权移交给统监府，法院被纳入日帝体系。'
  },
  after_occupation: {
    ko: '2. 조선 강점 이후',
    en: '2. After Korean Occupation',
    ja: '2. 朝鮮強占以後',
    zh: '2. 朝鲜强占以后'
  },
  after_occupation_text: {
    ko: '1910년 조선총독부는 통감부 사법청을 총독부 사법부로 개편하고, 재판소는 고등법원, 공소원, 지방재판소, 구재판소 등 총 92개소 체계로 운영되었다. 이후 1912년 재판소령 개정으로 3심 3계급제로 재편되었고, 제2차 세계대전 말기까지 유지되었다.',
    en: 'In 1910, the Government-General of Korea reorganized the Residency-General\'s judiciary into the Government-General\'s judicial department, and the courts operated under a system of 92 institutions including high courts, public prosecutors\' offices, local courts, and district courts. Later, with the revision of the Court Ordinance in 1912, it was reorganized into a three-trial, three-tier system and maintained until the end of World War II.',
    ja: '1910年朝鮮総督府は統監府司法庁を総督府司法部に改編し、裁判所は高等法院、控訴院、地方裁判所、区裁判所など総92箇所体系で運営された。その後1912年裁判所令改正により3審3階級制に再編され、第2次世界大戦末期まで維持された。',
    zh: '1910年朝鲜总督府将统监府司法厅改编为总督府司法部，法院以高等法院、上诉院、地方法院、区法院等共92个机构的体系运营。此后1912年法院令修订，改编为三审三级制，维持到第二次世界大战末期。'
  }
}

// 컨텍스트 생성
const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

// Provider 컴포넌트
export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ko')
  const [isLoading, setIsLoading] = useState(false)
  const [translationCache, setTranslationCache] = useState<TranslationTexts>(defaultTexts)

  // 로컬 스토리지에서 언어 설정 로드
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language
    if (savedLanguage && ['ko', 'en', 'ja', 'zh'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  // 언어 변경 함수
  const setLanguage = async (language: Language) => {
    if (language === currentLanguage) return

    setIsLoading(true)
    try {
      setCurrentLanguage(language)
      localStorage.setItem('selectedLanguage', language)
      
      // TODO: 페이지의 동적 콘텐츠 번역 (필요시)
      // 현재는 정적 번역만 사용
      
    } catch (error) {
      console.error('Language change error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 번역 함수
  const translate = (key: string): string => {
    const translation = translationCache[key]
    if (!translation) {
      console.warn(`Translation key "${key}" not found`)
      return key
    }
    
    return translation[currentLanguage] || translation.ko || key
  }

  const value: TranslationContextType = {
    currentLanguage,
    setLanguage,
    translate,
    isLoading
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

// 커스텀 훅
export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

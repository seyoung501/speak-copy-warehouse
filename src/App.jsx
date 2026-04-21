import { useState, useMemo } from "react";

const LEVELS = [
  { id:"1", label:"Brand Vision", color:"#3B82F6", desc:"The world Speak wants to create", subs:null },
  { id:"2", label:"Brand Philosophy", color:"#8B5CF6", desc:"What Speak believes", subs:null },
  { id:"3", label:"Brand Definition", color:"#10B981", desc:"나를 끌어주는 영어 앱", subs:null },
  { id:"4", label:"USP", color:"#F59E0B", desc:"Uncomfortable truth + solution", subs:[
    {id:"usp1",label:"Pulls Speech Out",tag:"USP1"},{id:"usp2",label:"Catches Until Right",tag:"USP2"},{id:"usp3",label:"Real Language",tag:"USP3"},{id:"usp4",label:"Won't Let Quit",tag:"USP4"},
  ]},
  { id:"5", label:"Targeting", color:"#EC4899", desc:"Target-specific messaging", subs:[
    {id:"t-career",label:"Career / Business",tag:"T-Career"},{id:"t-travel",label:"Travel",tag:"T-Travel"},{id:"t-growth",label:"Growth",tag:"T-Growth"},{id:"t-overseas",label:"Life Overseas",tag:"T-Overseas"},{id:"t-test",label:"Test Prep",tag:"T-Test"},{id:"t-parents",label:"Parents",tag:"T-Parents"},{id:"t-general",label:"General",tag:"T-General"},
  ]},
  { id:"6", label:"RTB", color:"#06B6D4", desc:"All evidence and proof", subs:[
    {id:"rtb-feat",label:"Features",tag:"RTB-Features"},{id:"rtb-tech",label:"Tech / Data",tag:"RTB-Tech"},{id:"rtb-awards",label:"Awards",tag:"RTB-Awards"},{id:"rtb-scale",label:"Scale",tag:"RTB-Scale"},{id:"rtb-reviews",label:"User Reviews",tag:"RTB-Reviews"},{id:"rtb-team",label:"Team / Expertise",tag:"RTB-Team"},{id:"rtb-price",label:"Pricing Value",tag:"RTB-Price"},
  ]},
  { id:"7", label:"CTA", color:"#EF4444", desc:"Action drivers", subs:[
    {id:"cta-gen",label:"General CTA",tag:"CTA-General"},{id:"cta-price",label:"Pricing CTA",tag:"CTA-Price"},{id:"cta-ch",label:"Channel CTA",tag:"CTA-Channel"},
  ]},
];

const FEAT_TAGS = [
  {tag:"feat-freetalk",label:"AI Free Talk"},{tag:"feat-tutor",label:"AI Tutor"},{tag:"feat-mylesson",label:"My Lesson"},{tag:"feat-smartreview",label:"Smart Review"},{tag:"feat-pronunciation",label:"Pronunciation Coach"},{tag:"feat-personalization",label:"Personalization"},{tag:"feat-3step",label:"3-Step Method"},{tag:"feat-curriculum",label:"Curriculum"},{tag:"feat-tracking",label:"Level Tracking"},{tag:"feat-circular",label:"Circular Learning"},{tag:"feat-gamification",label:"Gamification"},{tag:"feat-b2b",label:"B2B (S4B)"},
];

const FIT_TAGS = ["All","TO-BE aligned","Universal","AS-IS legacy"];
const CHANNELS = [
  {name:"Brand Campaign",levels:["1","2","3"],desc:"Philosophy + positioning"},
  {name:"Perf Ad (Headline)",levels:["4","5"],desc:"USP + Targeting"},
  {name:"Perf Ad (Sub)",levels:["6"],desc:"RTB backs it up"},
  {name:"Landing Page",levels:["3","4","5","6","7"],desc:"Hierarchy descends with scroll"},
  {name:"App Store",levels:["2","4","6"],desc:"Philosophy + USP + evidence"},
  {name:"CRM / Push",levels:["4","5","6","7"],desc:"USP + targeting + evidence + nudge"},
  {name:"Social / Owned",levels:["4","5","6"],desc:"USP + targeting + proof"},
  {name:"Influencer",levels:["4","5","6"],desc:"USP + targeting + user story"},
];

const D=[
// ===1 VISION===
{l:"1",sub:null,g:null,ko:"To reinvent the way people learn, starting with language.",en:"",s:"Press Kit — Vision",f:"TO-BE aligned",k:true},
{l:"1",sub:null,g:null,ko:"스픽은 언어 교육의 혁신을 만들고 있습니다",en:"Speak is creating an innovation in language education",s:"Website — Brand Story",f:"Universal",k:false},
{l:"1",sub:null,g:null,ko:"언제, 어디서든, 누구나 쉽게 언어를 배울 수 있도록",en:"So that anyone, anywhere, can learn a language easily",s:"Website — Brand Story",f:"Universal",k:false},
{l:"1",sub:null,g:null,ko:"스픽은 이미 영어 학습의 새로운 패러다임이 되었습니다",en:"Speak has already become a new paradigm",s:"Website — Brand Story",f:"Universal",k:false},
{l:"1",sub:null,g:null,ko:"\"앞으로 10년 안에 언어 학습 방식은 완전히 달라질 겁니다.\"",en:"In 10 years, language learning will be completely different.",s:"Connor Zwick — Press Kit",f:"TO-BE aligned",k:false},
{l:"1",sub:null,g:null,ko:"\"스픽은 언어 학습을 누구에게나 평등하게 만들고 싶어요.\"",en:"We want to make language learning equal for everyone.",s:"Connor Zwick — EO Korea 2025",f:"TO-BE aligned",k:false},
{l:"1",sub:null,g:null,ko:"\"더 많은 사람들에게 기회의 문을 열어주고 싶어요.\"",en:"We want to open more doors of opportunity.",s:"Connor Zwick — EO Korea 2025",f:"TO-BE aligned",k:false},
{l:"1",sub:null,g:null,ko:"\"저희 목표는 언어를 배울 때 가장 먼저 떠올리는 기본 수단이 되는 거예요.\"",en:"Our goal: become the default way people learn a language.",s:"Connor Zwick — EO Korea 2025",f:"TO-BE aligned",k:false},
{l:"1",sub:null,g:null,ko:"언어 숙달의 길을 재정의하여, 언어 장벽을 넘어 나아가려는 삶을 지원한다.",en:"Redefine the path to fluency beyond the language barrier",s:"Brand Bible — Vision v0.2",f:"Universal",k:false},
// ===2 PHILOSOPHY===
{l:"2",sub:null,g:null,ko:"틀려라, 트일 것이다!",en:"Make mistakes — you'll break through!",s:"Press Kit — Philosophy",f:"TO-BE aligned",k:true},
{l:"2",sub:null,g:null,ko:"영어, 새해엔 트일 것이다",en:"English — it'll break through this new year",s:"Press Kit — 2026 Campaign",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"올해는 트일 것이다",en:"This year, it'll break through",s:"Press Kit — 2026 Campaign",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"틀려라 ▶ 된다!",en:"Make mistakes ▶ It works!",s:"Press Kit — 2026 Sub",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"언어는 지식이 아니라 '말하기 경험'입니다.",en:"Language is not knowledge — it's a 'speaking experience.'",s:"Press Kit — Philosophy",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"\"틀리는 것을 두려워하지 않는 용기\"가 영어를 잘하는 유일한 길",en:"Courage to not fear mistakes is the only path to fluency.",s:"Press Kit — 2026",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"틀려도 괜찮습니다. AI와의 안전한 환경에서 두려움 없이 말합니다.",en:"It's okay to make mistakes. Speak without fear in AI's safe environment.",s:"Press Kit — Key Messages",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"언어를 배우려면 소리 내어 말해야 합니다.",en:"To learn a language, you must speak out loud.",s:"Website",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"스픽의 핵심 철학은 당신이 소리내어 말하게 하는 데 있어요. 최대한 많이요!",en:"Speak's core philosophy: getting you to speak out loud. As much as possible!",s:"Website",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"\"To Speak, You Must Speak!\"",en:"",s:"Brand Bible",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"We do not overpromise. We support sustainable language learning.",en:"",s:"Brand Bible — 2021",f:"TO-BE aligned",k:false},
// ===3 DEFINITION===
{l:"3",sub:null,g:null,ko:"따라오면, 말이 된다 스픽",en:"Follow along — you'll speak. Speak.",s:"Refined Brand Positioning",f:"TO-BE aligned",k:true},
{l:"3",sub:null,g:null,ko:"나를 끌어주는 영어 앱",en:"The English app that pulls me along",s:"Brand Definition",f:"TO-BE aligned",k:true},
{l:"3",sub:null,g:null,ko:"당신을 말하게 할 영어 앱",en:"The English app that will make you speak",s:"Legacy key copy",f:"Universal",k:false},
{l:"3",sub:null,g:null,ko:"당신을 실제로 말하게 하는 영어 앱",en:"The app that actually makes you speak",s:"Website — Main",f:"Universal",k:false},
{l:"3",sub:null,g:null,ko:"스픽은 당신을 말하게 합니다",en:"Speak makes you speak",s:"Bloo Outcome LP",f:"Universal",k:false},
{l:"3",sub:null,g:null,ko:"입이 트이는 영어 앱",en:"The English app that opens your mouth",s:"App Store",f:"Universal",k:false},
{l:"3",sub:null,g:null,ko:"이제 영어는 스픽입니다",en:"Now English is Speak",s:"Campaign LP",f:"AS-IS legacy",k:false},
{l:"3",sub:null,g:null,ko:"AI 영어 스피킹 앱",en:"AI English speaking app",s:"Press Kit",f:"AS-IS legacy",k:false},
{l:"3",sub:null,g:null,ko:"영어 스피킹은 스픽",en:"English speaking is Speak",s:"YouTube",f:"AS-IS legacy",k:false},
// ===4 USP===
{l:"4",sub:"USP1",g:null,ko:"몇 년을 공부했는데도 아직 말을 못 합니다. → 스픽은 말하기를 끌어냅니다.",en:"Years of studying, still can't speak → Speak pulls speech out.",s:"Refined Positioning",f:"TO-BE aligned",k:true},
{l:"4",sub:"USP1",g:null,ko:"한국 사람들은 왜 영어를 몇십 년씩 배워도 말하기를 어려워할까?",en:"Why do Koreans struggle to speak after decades?",s:"Website",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"이제 말 못하는 영어는 버려야 합니다",en:"Time to drop the English you can't speak",s:"Campaign LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"영어는 말해야 늡니다",en:"English improves only when you speak",s:"Bloo Outcome LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"수업 1일차부터 미친듯이 말하게 합니다",en:"From day 1, makes you speak like crazy",s:"Campaign LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"누구라도 말을 할 수 밖에 없는 환경",en:"An environment where anyone must speak",s:"Campaign LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"7일만에 1,000문장 발화",en:"1,000 sentences in 7 days",s:"Playstore",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"하루 10분만 투자하면 150문장",en:"10 min/day → 150 sentences",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"30분에 150문장, 영어 스피킹 끝판왕",en:"150 sentences in 30 min",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"수영 인강이 아니라 물에 들어가야 하는 것처럼",en:"Like swimming — get in the water",s:"App Store",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"영어로 말하게 너무 어렵다 → 이제는 두렵지않아요!",en:"So hard to speak → Not scared anymore!",s:"Performance (B/A)",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"미드 보는 건 좋아하는데, 직접 말하는 건 어려운 사람?",en:"Love watching shows, can't speak?",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"말하면서 배워야 실제로 응용할 수 있어요!",en:"Learn by speaking to apply it!",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP2",g:null,ko:"실수를 건너뛰면 성장은 없습니다. → 스픽은 될 때까지 마주하게 만듭니다.",en:"Skipping mistakes = skipping growth → Speak makes you face them.",s:"Refined Positioning",f:"TO-BE aligned",k:true},
{l:"4",sub:"USP2",g:null,ko:"틀려도 괜찮아요 — 실시간 AI 피드백",en:"It's okay to make mistakes — real-time AI feedback",s:"Press Kit / Playstore",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP2",g:null,ko:"모든 문장을 즉각적으로 교정해주는 AI 피드백",en:"AI feedback corrects every sentence instantly",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP2",g:null,ko:"피드백 기반 복습 시스템",en:"Review system based on feedback",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP2",g:null,ko:"원어민 발음으로 만들어주는 AI 발음 코치",en:"AI pronunciation coach for native pronunciation",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP3",g:null,ko:"교과서 영어는 실제 상황에서 통하지 않습니다. → 스픽은 실제로 쓸 수 있는 언어를 가르칩니다.",en:"Textbook English doesn't work → Speak teaches usable language.",s:"Refined Positioning",f:"TO-BE aligned",k:true},
{l:"4",sub:"USP3",g:null,ko:"배운대로만 말하는 게 아니라, 말하고 싶은대로 배울 수 있는 곳",en:"Learn what you want to say, not just what you were taught",s:"App Store",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP3",g:null,ko:"AI 롤플레이로 실전 같은 대화 연습",en:"Real conversation practice through AI roleplay",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP3",g:null,ko:"내 상황과 경험을 바탕으로 생성된 맞춤 수업",en:"Custom lessons based on my situation",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP3",g:null,ko:"머릿 속 번역 없이 바로 말하게 됩니다",en:"Speak without translating in your head",s:"Business LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"의지만으로는 지속할 수 없습니다. → 스픽은 멈추지 않게 만듭니다.",en:"Willpower alone can't keep you going → Speak won't let you stop.",s:"Refined Positioning",f:"TO-BE aligned",k:true},
{l:"4",sub:"USP4",g:null,ko:"⚠ error: 올해 영어공부도 미루시겠습니까? YES / NO",en:"Will you put off English again this year?",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"영어 공부가 양치질처럼 당연한 습관이 됐어요",en:"English became as natural as brushing teeth",s:"SNS habit ad",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"하루에 딱 10분, 한 달 습관 완성!",en:"10 min/day, one month habit!",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"출근길 인스타 대신 20분 영어 공부",en:"20 min English instead of Instagram",s:"Performance (Kim Woo-bin)",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"영어공부와 습관을 한번에!",en:"English study + habit at once!",s:"Travel LP",f:"TO-BE aligned",k:false},
// ===5 TARGETING===
// Career / Business
{l:"5",sub:"T-Career",g:null,ko:"외국계처럼 말하는 한 끗 차이",en:"The subtle difference — foreign company level",s:"Performance (biz)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"영어 하나로 바뀌는 내 연봉 앞자리",en:"First digit of my salary changes with English",s:"Performance (Kim Woo-bin)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"미팅 때 할 수 있는 말이 많아졌어요!",en:"I can say so much more in meetings now!",s:"Instagram biz ad",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"아무 말도 못하던 미팅에서 의견제시 명확하게 하는 미팅으로!",en:"From silent meetings to clearly stating my opinions!",s:"Instagram biz ad",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"스픽으로 비즈니스 영어 시작하기→",en:"Start business English with Speak→",s:"Instagram CTA",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"하버드 출신 연구진이 개발, OpenAI 기술 제휴로 실리콘밸리에서도 주목",en:"Developed by Harvard researchers, noted in Silicon Valley via OpenAI partnership",s:"Business LP",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"직장인을 위한 비즈니스 영어",en:"Business English for working professionals",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"영어면접: 이젠 두렵지 않다!",en:"English interviews: no longer scary!",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
// Travel
{l:"5",sub:"T-Travel",g:null,ko:"여행에서 만날 수 있는 모든 상황 대비",en:"Prepared for every travel situation",s:"Travel LP",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"비행기까지 딱 남았는데 시간을 되돌릴수는 없잖아요 ✈",en:"Flight's coming and you can't turn back time ✈",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"상상할 수 있는 모든 여행 상황 스픽 하나로 완벽 미리 준비하기",en:"Prepare for every imaginable travel scenario with Speak",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"여행가서 바로 써먹는 해외 필수 표현.zip ✈",en:"Essential overseas expressions you'll use right away.zip ✈",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"여행 떠나기 전 궁극적 여행 준비",en:"The ultimate travel prep before departure",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"해외여행 계획하고 있으면 딱 하나만 준비하세요",en:"Planning a trip? Just prepare one thing",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"여행 필수 표현 이제 스픽 하나로 끝내세요!",en:"End travel expression prep with just Speak!",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"해외여행 완벽대비, 만족 후기 폭발! 딱 하루 10분 스픽 여행 영어",en:"Perfect trip prep, reviews exploding! Just 10 min/day Speak travel English",s:"Travel LP Ad",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"🏆 BEST 여행 영어 코스 41강의",en:"🏆 BEST travel English course — 41 lessons",s:"Travel LP",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"여행 전 벼락치기 스픽에서 완벽대비",en:"Last-minute cramming? Perfect prep with Speak",s:"Travel LP",f:"TO-BE aligned",k:false},
// Growth / Self-improvement
{l:"5",sub:"T-Growth",g:null,ko:"10년 넘게 영어 공부를 해도 스피킹은 힘드신가요?",en:"Still struggling with speaking after 10+ years?",s:"App Store",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"영어가 쉬워지니까, 선택지가 무한대!",en:"When English gets easier, choices become infinite!",s:"Performance",f:"AS-IS legacy",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"영어가 트이면 인생이 트인다",en:"When English opens up, life opens up",s:"Performance / KakaoTalk",f:"AS-IS legacy",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"전화영어 효과에 실망했다면? 딱 1달만 이거 해보세요",en:"Disappointed by phone English? Try this for 1 month",s:"Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"스픽을 꾸준히 하니까 내 영어가 고급지게 바뀜!",en:"Consistent Speak use made my English more sophisticated!",s:"User story video ad",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"자꾸만 막히는 영어, '이렇게' 하면 입에 붙습니다.",en:"English keeps getting stuck? Do 'this' and it sticks.",s:"SNS Ad",f:"TO-BE aligned",k:false},
// Life Overseas
{l:"5",sub:"T-Overseas",g:null,ko:"해외에서 영어가 안 되면 아무것도 안 된다",en:"Without English overseas, nothing works",s:"Influencer LP (life-overseas)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Overseas",g:null,ko:"해외 생활 영어, 스픽으로 미리 준비하세요",en:"Prep your overseas life English with Speak",s:"Influencer LP (life-overseas)",f:"TO-BE aligned",k:false},
// Test Prep (OPIc / TOEIC Speaking)
{l:"5",sub:"T-Test",g:null,ko:"시험 점수는 높은데 말은 안 나온다",en:"High test scores but can't speak",s:"Audience Deep Dive",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Test",g:null,ko:"상황별 대화 구성으로 시험 대비는 물론 현실 변수까지 연습",en:"Situational conversations prep for tests AND real-life variables",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
// Parents
{l:"5",sub:"T-Parents",g:null,ko:"엄마빠 영어",en:"Mom & Dad English",s:"Website — Curriculum (Course name)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Parents",g:null,ko:"자녀에게 영어로 말하고 싶은 부모",en:"Parents who want to speak English to their kids",s:"Audience Deep Dive",f:"TO-BE aligned",k:false},
// General
{l:"5",sub:"T-General",g:null,ko:"영어 좀 하는 사람은 다 아는 스픽!",en:"Everyone who speaks English knows Speak!",s:"Campaign LP",f:"AS-IS legacy",k:false},
{l:"5",sub:"T-General",g:null,ko:"꼼꼼히 따져볼 수록 영어는 스픽이 답이다",en:"The more you compare, the more Speak is the answer",s:"Performance (Kim Woo-bin)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-General",g:null,ko:"올해, 영어부터 트이자!",en:"This year, let's start by breaking through English!",s:"Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-General",g:null,ko:"이제 진짜 제대로 영어 스피킹 뽀개보자!",en:"Let's really crush English speaking for real!",s:"Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-General",g:null,ko:"영어로 말하기 부끄러운 사람들",en:"People embarrassed to speak English",s:"SNS Ad",f:"TO-BE aligned",k:false},
// ===6 RTB===
// RTB-Features
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"원어민 없이도 가능한 자유로운 대화 연습",en:"Free conversation practice without a native speaker",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"원하는 주제로 말하면 AI가 피드백 + 맞춤 수업 자동 생성",en:"AI gives feedback + auto-generates custom lessons",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"언제 어디서든, 어떤 주제에 대해서든 대화하세요",en:"Talk about any topic, anytime, anywhere",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"AI 프리톡이 '비주얼 모드'로 더 몰입감있게 돌아왔습니다.",en:"AI Free Talk — now with immersive Visual Mode.",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"원하는 상황과 주제로 대화하며 실시간 피드백, 맞춤형 수업 생성",en:"Converse freely, get feedback, generate lessons from mistakes.",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-tutor",ko:"스픽 튜터는 오로지 당신만을 위한 언어 선생님",en:"Speak Tutor is a language teacher exclusively for you.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-tutor",ko:"스픽 튜터와 함께라면 당신은 혼자가 아닙니다.",en:"With Speak Tutor, you're not alone.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-mylesson",ko:"'나만의 수업' — 당장 내일 필요한 영어를 배울 수 있는 기능",en:"'My Lesson' — learn the English you need tomorrow.",s:"App Store",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-mylesson",ko:"배운 패턴을 '실제 내 상황'에 적용해 실시간 생성되는 수업",en:"Lessons generated real-time from your actual situation.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-smartreview",ko:"간격 반복 알고리즘으로 최적 타이밍에 복습 → 장기 기억화",en:"Spaced repetition → optimal review → long-term memory.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-smartreview",ko:"배운 패턴을 자동 복습 항목으로 저장, 맞는 복습 수업 제공",en:"Auto-saves patterns, provides tailored review lessons.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-pronunciation",ko:"학습자의 발음을 음소 단위로 정밀 분석",en:"Analyzes pronunciation at phoneme level.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-pronunciation",ko:"원어민 발음과 실시간 대조 → 교정 가이드",en:"Real-time native comparison → correction guide.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-personalization",ko:"나에게 딱 맞는 나만을 위한 맞춤 수업",en:"Lessons tailored just for me",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-personalization",ko:"목표/수준/관심사/학습 속도에 맞춰 계속 조정",en:"Continuously adjusts to goals, level, interests, pace.",s:"Press Kit — AI",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-personalization",ko:"여행/비즈니스/면접 등 목표에 맞는 수업을 AI가 추천",en:"AI recommends courses for travel, business, interviews.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-3step",ko:"나도 모르게 체득되는 3단계 학습법",en:"3-step method — internalize without realizing",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-3step",ko:"20분 동안 100문장 이상을 소리 내어 말하게 됩니다",en:"100+ sentences out loud in 20 minutes.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-3step",ko:"1단계 배우기 → 2단계 스피킹 연습 → 3단계 실전 대화",en:"Step 1 Learn → Step 2 Practice → Step 3 Real Conversation",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-curriculum",ko:"왕초보부터 마스터까지 500일 분량 커리큘럼",en:"Beginner to master — 500 days of courses",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-curriculum",ko:"왕초보부터 비즈니스까지 무제한 영어 수업",en:"Unlimited: beginner to business English",s:"Bloo Outcome LP",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-curriculum",ko:"한국인 대상 10년+ 교육 전문가가 직접 기획",en:"Planned by 10+ year experts for Koreans.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-curriculum",ko:"현재 원어민이 사용하는 자연스러운 영어 표현",en:"Natural expressions currently used by natives.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-tracking",ko:"'대화 유창성' 중심으로 학습 진전을 시각화",en:"Visualizes progress around conversation fluency.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-tracking",ko:"CEFR 기반 내 영어 레벨 체크",en:"Check your level based on CEFR.",s:"Interview materials",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-circular",ko:"영어는 결국 말해야 트입니다. 스픽은 정말 말을 많이 시킵니다.",en:"English opens when you speak. Speak makes you speak a lot.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-gamification",ko:"매일 불꽃이 켜집니다. 100일 연속이면 특별한 선물!",en:"Daily streak flame. 100 days? Special gift!",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-gamification",ko:"매월 학습 챌린지에 참가, 아이패드 경품",en:"Monthly challenges, win iPad prizes.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-b2b",ko:"기업 맞춤형 영어 교육 'S4B'",en:"Enterprise English 'S4B'",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-b2b",ko:"S4B 도입 기업 300+, 10대 대기업 채택률 80%",en:"300+ companies, 80% top 10 conglomerates",s:"Press Kit",f:"Universal",k:false},
// RTB-Tech
{l:"6",sub:"RTB-Tech",g:null,ko:"세계 최고 수준의 AI 음성 인식 기술",en:"World-class AI speech recognition",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"한국인 영어 음성 데이터 100만 명+ 학습",en:"Trained on 1M+ Korean voice data",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"93% 이상 ASR 정확도",en:"93%+ ASR accuracy",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"실리콘 밸리 자체 개발 AI 기술",en:"AI developed in-house in Silicon Valley",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"한국인 영어 학습 데이터 2만 시간+ 분석",en:"20,000+ hours Korean English data analyzed",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"영어교육학 박사가 만든 커리큘럼",en:"Curriculum by PhD in English education",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"100% LA 자체 스튜디오 제작",en:"100% LA studio-produced",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"하루 평균 100문장, 주 1,000문장",en:"100 sentences/day, 1,000/week",s:"Press Kit",f:"TO-BE aligned",k:false},
// RTB-Awards
{l:"6",sub:"RTB-Awards",g:null,ko:"구글 '올해를 빛낸 자기계발 앱'",en:"Google 'Best Self-improvement App'",s:"Press Kit (2019-20)",f:"Universal",k:false},
{l:"6",sub:"RTB-Awards",g:null,ko:"구글플레이 '올해의 베스트앱'",en:"Google Play 'Best App' 2024",s:"Press Kit (2024)",f:"Universal",k:false},
{l:"6",sub:"RTB-Awards",g:null,ko:"美 포브스 'AI 50' 유일 선정",en:"Forbes 'AI 50' — only language co.",s:"Press Kit (2025)",f:"Universal",k:false},
{l:"6",sub:"RTB-Awards",g:null,ko:"유튜브 웍스 어워드 '베스트 AI 파이오니어'",en:"YouTube Works 'Best AI Pioneer'",s:"Press Kit (2025)",f:"Universal",k:false},
// RTB-Scale
{l:"6",sub:"RTB-Scale",g:null,ko:"글로벌 1,500만 다운로드",en:"15M global downloads",s:"Press Kit",f:"Universal",k:false},
{l:"6",sub:"RTB-Scale",g:null,ko:"평점 4.8 (17만개 평가)",en:"4.8 rating (170K reviews)",s:"App Store",f:"Universal",k:false},
{l:"6",sub:"RTB-Scale",g:null,ko:"15만 개의 유저 후기가 증명하는 1위 앱",en:"#1 app proven by 150K reviews",s:"LP/Ads",f:"Universal",k:false},
{l:"6",sub:"RTB-Scale",g:null,ko:"구독 30일 후 50%+ 활성 유지율",en:"50%+ retention 30 days after sub",s:"EO Korea 2025",f:"Universal",k:false},
// RTB-Reviews
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"영어 실력이 고급지게 레벨업한 느낌!\"",en:"English leveled up!",s:"User: 엘리",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"자연스럽게 영어 공부 습관을 만들어 주더라고요!\"",en:"Naturally built a study habit!",s:"User: 킴벌리",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"다 해봤는데 스픽만큼 갓성비가 없어요!\"",en:"Tried everything — nothing beats Speak's value!",s:"User: 양지",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"스픽은 진짜 말하게 만드는 앱\"",en:"Speak truly makes you speak",s:"User: 정은영",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"피드백이 자세해서 자신감이 생겼습니다\"",en:"Detailed feedback gave me confidence",s:"User: 정구철",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"영어 울렁증이라 망설이다 해보니 놀라울정도로 편안\"",en:"Had anxiety, surprisingly comfortable",s:"User (Anon)",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"이것저것 시도만 하다 끝내길 반복, 현재 너무 재밌게 하고 있습니다\"",en:"Kept trying/quitting, now really enjoying it",s:"User (Anon)",f:"TO-BE aligned",k:false},
// RTB-Team
{l:"6",sub:"RTB-Team",g:null,ko:"하버드, 스탠포드, 예일 출신 창업자들",en:"Founders from Harvard, Stanford, Yale",s:"Website",f:"Universal",k:false},
{l:"6",sub:"RTB-Team",g:null,ko:"OpenAI 기술 제휴 + 스타트업 펀드 투자",en:"OpenAI partnership + Startup Fund investment",s:"Press Kit",f:"Universal",k:false},
{l:"6",sub:"RTB-Team",g:null,ko:"누적 투자 2,274억원 · 유니콘 1.4조",en:"₩227.4B invested · ₩1.4T unicorn",s:"Press Kit / Website",f:"Universal",k:false},
// RTB-Price
{l:"6",sub:"RTB-Price",g:null,ko:"매일 수업해도 월 1만원대",en:"Daily lessons at ₩10K/month",s:"LP common",f:"Universal",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"월 1만원대 무제한 스피킹",en:"Unlimited speaking at ₩10K/month",s:"Campaign LP",f:"Universal",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"대방어 중사이즈 = 스픽 3달 무제한",en:"Yellowtail sashimi = 3 months Speak",s:"Instagram",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"프리미엄 연간 ₩129,000 (60% OFF) — 월 ₩10,750",en:"Premium: ₩129K (60% OFF)",s:"App Store/LP",f:"Universal",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"프리미엄 플러스 연간 ₩299,000 (68% OFF) — 월 ₩19,916",en:"Premium+: ₩299K (68% OFF)",s:"App Store/LP",f:"Universal",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"10명 중 8명은 프리미엄 플러스 선택",en:"8/10 choose Premium Plus",s:"Interview",f:"Universal",k:false},
// ===7 CTA===
{l:"7",sub:"CTA-General",g:null,ko:"지금 시작하기",en:"Start now",s:"Website",f:"Universal",k:false},
{l:"7",sub:"CTA-General",g:null,ko:"스피킹 시작",en:"Start speaking",s:"Website",f:"Universal",k:false},
{l:"7",sub:"CTA-General",g:null,ko:"구매하기",en:"Purchase",s:"LP common",f:"Universal",k:false},
{l:"7",sub:"CTA-Price",g:null,ko:"지금 할인가로 시작하기",en:"Start at discount now",s:"Campaign LP",f:"Universal",k:false},
{l:"7",sub:"CTA-Price",g:null,ko:"지금 최저가에 구매하기 →",en:"Buy at lowest price →",s:"Bloo Outcome LP",f:"Universal",k:false},
{l:"7",sub:"CTA-Price",g:null,ko:"올해 마지막 최저가, 구매하기",en:"Last lowest price — buy now",s:"SMS",f:"Universal",k:false},
{l:"7",sub:"CTA-Channel",g:null,ko:"월 1만원대 무제한 영어 공부 시작 →",en:"Start unlimited English ₩10K/mo →",s:"Instagram",f:"Universal",k:false},
{l:"7",sub:"CTA-Channel",g:null,ko:"지금 할인가에 스픽 시작하기→",en:"Start Speak at discount →",s:"Travel LP",f:"Universal",k:false},
];

const EVAL_PROMPT = `You are Speak's Brand Copy Evaluator. You evaluate Korean marketing copy against Speak's brand guidelines.

BRAND GUIDELINES:
- Vision: To reinvent the way people learn, starting with language.
- Philosophy: 틀려라, 트일 것이다 (Make mistakes — you'll break through)
- Definition: 나를 끌어주는 영어 앱 (The app that pulls me along) — Pacer concept
- Key Copy: 따라오면, 말이 된다 스픽
- Tone: Honest × Witty. Not Duolingo meme-humor, not lecture-platform authority.
- Positioning shift: Feature-led (AS-IS) → Method-led (TO-BE). Speak is the active agent pulling the user.

SPEAKNESS (brand attributes — at least one must be present):
- Confident: Plain claims, no hedging, let track record speak.
- Innovative: AI/tech only when it serves user outcome. Never lead with "AI" as buzzword.
- Authentic (CORE): No inflated claims. Acknowledge real effort. Straightforward.
- Witty: Smirk-worthy, never forced. True humor. Spider-Man quip, not Duolingo push.

NOT SPEAKNESS (must NOT be present):
- Frivolous: Too lightweight, childish, one-dimensional.
- Sensational: Exaggerated, clickbait, addictive framing, intensity for its own sake.
- Authoritative: Heavy, preachy, dogmatic, "teacher-knows-best."
- Gamification-first: Framing learning as a game, streak/score/competition.

COPY RULES:
DO: Outcomes > features. Short direct sentences. Acknowledge pain. Back with data. Peer tone.
DON'T: Celebrity language. Unrealistic timelines. "Fun and easy." Generic edtech. ALL CAPS. "Introducing..."

Evaluate the given copy and respond ONLY in valid JSON:
{
  "overall_score": number (1-10),
  "overall_verdict": "PASS" | "CAUTION" | "FAIL",
  "speakness": {
    "confident": number (0-10),
    "innovative": number (0-10),
    "authentic": number (0-10),
    "witty": number (0-10),
    "primary_attribute": "string"
  },
  "not_speakness": {
    "frivolous": boolean,
    "sensational": boolean,
    "authoritative": boolean,
    "gamification_first": boolean,
    "flags": ["string"] or []
  },
  "positioning_fit": {
    "score": number (1-10),
    "is_tobe": boolean,
    "note": "string"
  },
  "tone_check": {
    "honest": number (0-10),
    "witty": number (0-10),
    "note": "string"
  },
  "copy_rules": {
    "outcome_led": boolean,
    "concise": boolean,
    "no_exaggeration": boolean,
    "data_backed": boolean,
    "peer_tone": boolean,
    "violations": ["string"] or []
  },
  "suggestions": ["string"],
  "revised_copy": "string (improved version if score < 7, otherwise null)"
}`;

function Evaluator(){
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[result,setResult]=useState(null);
  const[error,setError]=useState(null);

  const evaluate=async()=>{
    if(!input.trim())return;
    setLoading(true);setError(null);setResult(null);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,system:EVAL_PROMPT,messages:[{role:"user",content:`Evaluate this Korean marketing copy for Speak:\n\n"${input}"`}]})
      });
      const data=await res.json();
      const text=data.content?.map(b=>b.type==="text"?b.text:"").join("")||"";
      const clean=text.replace(/```json|```/g,"").trim();
      setResult(JSON.parse(clean));
    }catch(e){setError("Evaluation failed: "+e.message)}
    setLoading(false);
  };

  const verdictColor={"PASS":"#10B981","CAUTION":"#F59E0B","FAIL":"#EF4444"};
  const ScoreBar=({label,score,max=10,color="#6366F1"})=>(<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
    <span style={{fontSize:11,color:"#7E7E96",width:90,flexShrink:0}}>{label}</span>
    <div style={{flex:1,height:6,background:"#1A1A24",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${(score/max)*100}%`,background:color,borderRadius:99,transition:"width 0.3s"}}/></div>
    <span style={{fontSize:11,fontWeight:600,color,fontFamily:"'Space Mono'",width:24,textAlign:"right"}}>{score}</span>
  </div>);

  return(<div style={{padding:"28px 32px",maxWidth:800}}>
    <h2 style={{fontSize:18,fontWeight:700,fontFamily:"'Space Mono',monospace",marginBottom:4}}>✅ Copy Evaluator</h2>
    <p style={{fontSize:12,color:"#7E7E96",marginBottom:24}}>Paste any copy → Get a brand compliance score + improvement suggestions</p>

    <div style={{marginBottom:20}}>
      <label style={{fontSize:10,fontWeight:700,color:"#4A4A60",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:6}}>Copy to evaluate</label>
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="카피를 여기에 붙여넣으세요... (e.g. 영어가 쉬워지니까, 선택지가 무한대!)" rows={4} style={{width:"100%",padding:"14px 16px",borderRadius:10,border:"1px solid #1A1A24",background:"#0D0D14",color:"#EDEDF3",fontSize:15,outline:"none",resize:"vertical",fontFamily:"'Noto Sans KR','DM Sans',sans-serif",lineHeight:1.6}}/>
    </div>

    <button onClick={evaluate} disabled={loading||!input.trim()} style={{padding:"12px 32px",borderRadius:8,border:"none",background:loading?"#2A2A38":!input.trim()?"#1A1A24":"#10B981",color:!input.trim()?"#4A4A60":"#fff",fontSize:14,fontWeight:700,cursor:loading?"wait":!input.trim()?"default":"pointer",fontFamily:"'Space Mono',monospace",opacity:loading?0.7:1}}>
      {loading?"Evaluating...":"✅ Evaluate Copy"}
    </button>

    {error&&<div style={{marginTop:16,padding:"12px 16px",background:"#EF444420",borderRadius:8,color:"#EF4444",fontSize:12}}>{error}</div>}

    {result&&<div style={{marginTop:28}}>
      {/* Overall verdict */}
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24,padding:"20px 24px",background:"#111118",borderRadius:12,border:`1px solid ${verdictColor[result.overall_verdict]}44`}}>
        <div style={{width:64,height:64,borderRadius:99,background:verdictColor[result.overall_verdict]+"20",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:28,fontWeight:700,color:verdictColor[result.overall_verdict],fontFamily:"'Space Mono'"}}>{result.overall_score}</span>
        </div>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:verdictColor[result.overall_verdict],fontFamily:"'Space Mono'"}}>{result.overall_verdict}</div>
          <div style={{fontSize:12,color:"#7E7E96",marginTop:2}}>Overall Brand Compliance Score</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {/* Speakness */}
        <div style={{background:"#111118",borderRadius:10,padding:"16px 18px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#EDEDF3",marginBottom:12}}>Speakness Attributes</div>
          <ScoreBar label="Confident" score={result.speakness.confident} color="#3B82F6"/>
          <ScoreBar label="Innovative" score={result.speakness.innovative} color="#8B5CF6"/>
          <ScoreBar label="Authentic" score={result.speakness.authentic} color="#10B981"/>
          <ScoreBar label="Witty" score={result.speakness.witty} color="#F59E0B"/>
          <div style={{marginTop:8,fontSize:11,color:"#7E7E96"}}>Primary: <strong style={{color:"#EDEDF3"}}>{result.speakness.primary_attribute}</strong></div>
        </div>

        {/* Tone */}
        <div style={{background:"#111118",borderRadius:10,padding:"16px 18px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#EDEDF3",marginBottom:12}}>Tone Check (Honest × Witty)</div>
          <ScoreBar label="Honest" score={result.tone_check.honest} color="#06B6D4"/>
          <ScoreBar label="Witty" score={result.tone_check.witty} color="#F59E0B"/>
          <div style={{marginTop:8,fontSize:11,color:"#7E7E96",lineHeight:1.5}}>{result.tone_check.note}</div>
        </div>

        {/* Not Speakness */}
        <div style={{background:"#111118",borderRadius:10,padding:"16px 18px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#EDEDF3",marginBottom:12}}>Not Speakness Check</div>
          {[["Frivolous",result.not_speakness.frivolous],["Sensational",result.not_speakness.sensational],["Authoritative",result.not_speakness.authoritative],["Gamification",result.not_speakness.gamification_first]].map(([label,flagged])=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{width:20,height:20,borderRadius:5,background:flagged?"#EF444420":"#10B98120",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>{flagged?"✗":"✓"}</span>
              <span style={{fontSize:12,color:flagged?"#EF4444":"#10B981"}}>{label}</span>
            </div>
          ))}
          {result.not_speakness.flags.length>0&&<div style={{marginTop:8,fontSize:11,color:"#EF4444",lineHeight:1.5}}>Flags: {result.not_speakness.flags.join(", ")}</div>}
        </div>

        {/* Positioning */}
        <div style={{background:"#111118",borderRadius:10,padding:"16px 18px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#EDEDF3",marginBottom:12}}>Positioning Fit</div>
          <ScoreBar label="TO-BE fit" score={result.positioning_fit.score} color={result.positioning_fit.is_tobe?"#10B981":"#EF4444"}/>
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4,marginBottom:8}}>
            <span style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:result.positioning_fit.is_tobe?"#10B98120":"#EF444420",color:result.positioning_fit.is_tobe?"#10B981":"#EF4444",fontWeight:600}}>{result.positioning_fit.is_tobe?"TO-BE aligned":"AS-IS / Off-brand"}</span>
          </div>
          <div style={{fontSize:11,color:"#7E7E96",lineHeight:1.5}}>{result.positioning_fit.note}</div>
        </div>
      </div>

      {/* Copy Rules */}
      <div style={{background:"#111118",borderRadius:10,padding:"16px 18px",marginTop:16}}>
        <div style={{fontSize:12,fontWeight:700,color:"#EDEDF3",marginBottom:12}}>Copy Rules Check</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {[["Outcome-led",result.copy_rules.outcome_led],["Concise",result.copy_rules.concise],["No exaggeration",result.copy_rules.no_exaggeration],["Data-backed",result.copy_rules.data_backed],["Peer tone",result.copy_rules.peer_tone]].map(([label,pass])=>(
            <span key={label} style={{fontSize:11,padding:"4px 12px",borderRadius:99,background:pass?"#10B98115":"#EF444415",color:pass?"#10B981":"#EF4444",fontWeight:600}}>{pass?"✓":"✗"} {label}</span>
          ))}
        </div>
        {result.copy_rules.violations.length>0&&<div style={{marginTop:10,fontSize:11,color:"#EF4444",lineHeight:1.6}}>Violations: {result.copy_rules.violations.join(" · ")}</div>}
      </div>

      {/* Suggestions */}
      {result.suggestions.length>0&&<div style={{background:"#111118",borderRadius:10,padding:"16px 18px",marginTop:16}}>
        <div style={{fontSize:12,fontWeight:700,color:"#EDEDF3",marginBottom:10}}>💡 Improvement Suggestions</div>
        {result.suggestions.map((s,i)=><div key={i} style={{fontSize:12,color:"#9CA3AF",lineHeight:1.6,marginBottom:4}}>• {s}</div>)}
      </div>}

      {/* Revised copy */}
      {result.revised_copy&&<div style={{background:"#10B98110",borderRadius:10,padding:"16px 18px",marginTop:16,border:"1px solid #10B98130"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#10B981",marginBottom:8}}>✨ Suggested Revision</div>
        <div style={{fontSize:16,fontWeight:600,color:"#EDEDF3",fontFamily:"'Noto Sans KR',sans-serif",lineHeight:1.6}}>{result.revised_copy}</div>
      </div>}
    </div>}
  </div>);
}

const FACTORY_CHANNELS = ["Paid Ad — Headline","Paid Ad — Sub-copy","Landing Page","App Store","CRM / Push","Social / Owned","Influencer","Brand Campaign"];
const FACTORY_TARGETS = ["General","Career / Business","Travel","Growth","Life Overseas","Test Prep (OPIc/TOEIC)","Parents"];
const FACTORY_FORMATS = ["Headline (5–15 words)","Sub-copy (1–2 sentences)","Body copy (paragraph)","CTA button text","Push notification (<50 chars)","Social post caption"];
const FACTORY_TONES = ["Safe — Most on-brand","Balanced","Bold — Experimental"];

const SYSTEM_PROMPT = `You are Speak's Copywriting Agent (CopyOS KR), an expert Korean marketing copywriter.

BRAND:
- Vision: To reinvent the way people learn, starting with language.
- Philosophy: 틀려라, 트일 것이다 (Make mistakes — you'll break through)
- Definition: 나를 끌어주는 영어 앱 (The app that pulls me along)
- Key Copy: 따라오면, 말이 된다 스픽 (Follow along — you'll speak. Speak.)
- Positioning concept: Pacer — not a teacher above you, but a guide slightly ahead pulling you forward.

TONE: Honest × Witty
- Honest = No inflated claims. Backed by data (Forbes AI 50, 93% ASR, 1M+ Korean voice data).
- Witty = Not meme-chasing. Spider-Man's cool quip — not Duolingo's aggressive push.

4 USPs:
1. Speak pulls speech out of you (Learn→Practice→Apply, 100+ sentences/day)
2. Catches you until you get it right (phoneme correction, spaced repetition)
3. Teaches language you can actually use (LA-produced, personalized)
4. Doesn't let you quit (streaks, challenges, adaptive nudges)

DO: Lead with outcomes not features. Short direct sentences. Acknowledge real pain. Back with data. Write as peer not instructor.
DON'T: Celebrity endorsement language. Unrealistic timelines. Gamification language. Generic edtech phrases. Trivialize difficulty. ALL CAPS.

NOT SPEAKNESS (avoid): Frivolous/lightweight, sensational/exaggerated, authoritative/preachy, gamification-first.

TARGET AUDIENCES:
- Career: 25-34, need English for work. Highest LTV ($23.46) and CVR (24.7%).
- Travel: 31.3% of signups, growing to 34%.
- Growth: Self-improvement, "would be nice to have".
- Life Overseas: Living/planning to live abroad.
- Test Prep: OPIc, TOEIC Speaking. Deadline-driven, high CVR (23.8%).
- Parents: Want to speak English to kids.

You must respond ONLY in valid JSON format with no markdown. Return an array of 3-5 copy options. Each option:
{"label":"string","headline":"string","supporting":"string (optional)","brand_note":"string","tone_level":"safe|balanced|bold"}`;

function Factory({copies}){
  const[channel,setChannel]=useState(FACTORY_CHANNELS[0]);
  const[target,setTarget]=useState(FACTORY_TARGETS[0]);
  const[format,setFormat]=useState(FACTORY_FORMATS[0]);
  const[tone,setTone]=useState(FACTORY_TONES[1]);
  const[context,setContext]=useState("");
  const[loading,setLoading]=useState(false);
  const[results,setResults]=useState(null);
  const[error,setError]=useState(null);
  const[copiedIdx,setCopiedIdx]=useState(null);

  const relevantCopies = useMemo(()=>{
    const targetMap={"Career / Business":"T-Career","Travel":"T-Travel","Growth":"T-Growth","Life Overseas":"T-Overseas","Test Prep (OPIc/TOEIC)":"T-Test","Parents":"T-Parents","General":"T-General"};
    const tSub=targetMap[target];
    const targetCopies=copies.filter(c=>c.sub===tSub).slice(0,5);
    const uspCopies=copies.filter(c=>c.l==="4"&&c.k).slice(0,4);
    const rtbCopies=copies.filter(c=>c.l==="6"&&c.sub==="RTB-Features").slice(0,5);
    const defCopies=copies.filter(c=>c.l==="3"&&c.k);
    return[...defCopies,...uspCopies,...targetCopies,...rtbCopies];
  },[target,copies]);

  const generate=async()=>{
    setLoading(true);setError(null);setResults(null);
    const refCopyText=relevantCopies.map(c=>`[${c.l}/${c.sub||""}] ${c.ko}${c.en?` (${c.en})`:""}`).join("\n");
    const userMsg=`Generate Korean marketing copy for Speak.

BRIEF:
- Channel: ${channel}
- Target: ${target}
- Format: ${format}
- Tone intensity: ${tone}
${context?`- Additional context: ${context}`:""}

REFERENCE COPIES FROM WAREHOUSE:
${refCopyText}

Generate 3-5 options in Korean. Each must be faithful to Speak's brand voice. Vary from safest to boldest. Return ONLY a JSON array.`;

    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,system:SYSTEM_PROMPT,messages:[{role:"user",content:userMsg}]})
      });
      const data=await res.json();
      const text=data.content?.map(b=>b.type==="text"?b.text:"").join("")||"";
      const clean=text.replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(clean);
      setResults(parsed);
    }catch(e){setError("Generation failed: "+e.message)}
    setLoading(false);
  };

  const toneColors={"safe":"#10B981","balanced":"#F59E0B","bold":"#EF4444"};

  return(<div style={{padding:"28px 32px",maxWidth:900}}>
    <h2 style={{fontSize:18,fontWeight:700,fontFamily:"'Space Mono',monospace",marginBottom:4}}>🏭 Copy Factory</h2>
    <p style={{fontSize:12,color:"#7E7E96",marginBottom:24}}>Input your brief → Generate on-brand copy options from the warehouse</p>

    {/* Brief form */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      {/* Channel */}
      <div>
        <label style={{fontSize:10,fontWeight:700,color:"#4A4A60",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:6}}>Channel</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {FACTORY_CHANNELS.map(c=><button key={c} onClick={()=>setChannel(c)} style={{padding:"6px 12px",borderRadius:7,border:`1px solid ${channel===c?"#6366F144":"#1A1A24"}`,background:channel===c?"#6366F115":"#0D0D14",color:channel===c?"#A5B4FC":"#7E7E96",fontSize:11,cursor:"pointer",fontWeight:channel===c?600:400}}>{c}</button>)}
        </div>
      </div>
      {/* Target */}
      <div>
        <label style={{fontSize:10,fontWeight:700,color:"#4A4A60",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:6}}>Target Audience</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {FACTORY_TARGETS.map(t=><button key={t} onClick={()=>setTarget(t)} style={{padding:"6px 12px",borderRadius:7,border:`1px solid ${target===t?"#EC489944":"#1A1A24"}`,background:target===t?"#EC489915":"#0D0D14",color:target===t?"#F9A8D4":"#7E7E96",fontSize:11,cursor:"pointer",fontWeight:target===t?600:400}}>{t}</button>)}
        </div>
      </div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      {/* Format */}
      <div>
        <label style={{fontSize:10,fontWeight:700,color:"#4A4A60",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:6}}>Format</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {FACTORY_FORMATS.map(f=><button key={f} onClick={()=>setFormat(f)} style={{padding:"6px 12px",borderRadius:7,border:`1px solid ${format===f?"#06B6D444":"#1A1A24"}`,background:format===f?"#06B6D415":"#0D0D14",color:format===f?"#67E8F9":"#7E7E96",fontSize:11,cursor:"pointer",fontWeight:format===f?600:400}}>{f}</button>)}
        </div>
      </div>
      {/* Tone */}
      <div>
        <label style={{fontSize:10,fontWeight:700,color:"#4A4A60",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:6}}>Tone Intensity</label>
        <div style={{display:"flex",gap:4}}>
          {FACTORY_TONES.map(t=><button key={t} onClick={()=>setTone(t)} style={{padding:"6px 16px",borderRadius:7,border:`1px solid ${tone===t?"#F59E0B44":"#1A1A24"}`,background:tone===t?"#F59E0B15":"#0D0D14",color:tone===t?"#FCD34D":"#7E7E96",fontSize:11,cursor:"pointer",fontWeight:tone===t?600:400}}>{t}</button>)}
        </div>
      </div>
    </div>

    {/* Additional context */}
    <div style={{marginBottom:20}}>
      <label style={{fontSize:10,fontWeight:700,color:"#4A4A60",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:6}}>Additional Context (optional)</label>
      <textarea value={context} onChange={e=>setContext(e.target.value)} placeholder="e.g. Summer promo, emphasize travel English, 50% discount..." rows={2} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #1A1A24",background:"#0D0D14",color:"#EDEDF3",fontSize:12,outline:"none",resize:"vertical",fontFamily:"'DM Sans','Noto Sans KR',sans-serif"}}/>
    </div>

    {/* Reference copies preview */}
    <div style={{marginBottom:20,padding:"12px 14px",background:"#0D0D14",borderRadius:8,border:"1px solid #1A1A24"}}>
      <div style={{fontSize:10,fontWeight:700,color:"#4A4A60",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Reference copies from warehouse ({relevantCopies.length})</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {relevantCopies.slice(0,8).map((c,i)=><span key={i} style={{fontSize:10,padding:"3px 8px",borderRadius:6,background:"#1A1A24",color:"#7E7E96",maxWidth:250,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.ko.slice(0,40)}...</span>)}
        {relevantCopies.length>8&&<span style={{fontSize:10,color:"#4A4A60"}}>+{relevantCopies.length-8} more</span>}
      </div>
    </div>

    {/* Generate button */}
    <button onClick={generate} disabled={loading} style={{padding:"12px 32px",borderRadius:8,border:"none",background:loading?"#2A2A38":"#6366F1",color:"#fff",fontSize:14,fontWeight:700,cursor:loading?"wait":"pointer",fontFamily:"'Space Mono',monospace",transition:"all 0.15s",opacity:loading?0.7:1}}>
      {loading?"Generating...":"⚡ Generate Copy Options"}
    </button>

    {error&&<div style={{marginTop:16,padding:"12px 16px",background:"#EF444420",borderRadius:8,color:"#EF4444",fontSize:12}}>{error}</div>}

    {/* Results */}
    {results&&<div style={{marginTop:24}}>
      <div style={{fontSize:14,fontWeight:700,color:"#EDEDF3",marginBottom:14,fontFamily:"'Space Mono',monospace"}}>Generated Options ({results.length})</div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {results.map((r,i)=>{const tc=toneColors[r.tone_level]||"#7E7E96";return(
          <div key={i} style={{background:"#111118",borderRadius:10,padding:"16px 20px",borderLeft:`4px solid ${tc}`,position:"relative"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontSize:11,fontWeight:700,color:tc,fontFamily:"'Space Mono',monospace"}}>Option {String.fromCharCode(65+i)}</span>
              <span style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:tc+"18",color:tc,fontWeight:600}}>{r.tone_level}</span>
              <span style={{fontSize:11,color:"#7E7E96",fontStyle:"italic"}}>{r.label}</span>
            </div>
            <div style={{fontSize:17,fontWeight:700,lineHeight:1.5,color:"#EDEDF3",fontFamily:"'Noto Sans KR',sans-serif",letterSpacing:"-0.015em"}}>{r.headline}</div>
            {r.supporting&&<div style={{fontSize:13,color:"#9CA3AF",marginTop:6,lineHeight:1.5}}>{r.supporting}</div>}
            <div style={{fontSize:11,color:"#5A5A72",marginTop:10,lineHeight:1.5,fontStyle:"italic"}}>Brand note: {r.brand_note}</div>
            <button onClick={()=>{navigator.clipboard.writeText(r.headline+(r.supporting?"\n"+r.supporting:""));setCopiedIdx(i);setTimeout(()=>setCopiedIdx(null),1200)}} style={{position:"absolute",top:14,right:14,border:"none",background:copiedIdx===i?"#10B981":"#1A1A24",color:copiedIdx===i?"#fff":"#7E7E96",borderRadius:6,padding:"4px 12px",fontSize:11,cursor:"pointer",fontWeight:600}}>{copiedIdx===i?"✓ Copied":"Copy"}</button>
          </div>
        )})}
      </div>

      {/* Brief summary */}
      <div style={{marginTop:16,padding:"12px 16px",background:"#0D0D14",borderRadius:8,border:"1px solid #1A1A24",fontSize:11,color:"#5A5A72"}}>
        Brief: {channel} · {target} · {format} · {tone}{context?` · "${context}"`:""} 
      </div>
    </div>}
  </div>);
}

function Card({item,lv}){const[cp,setCp]=useState(false);const fc=item.f==="TO-BE aligned"?"#10B981":item.f==="AS-IS legacy"?"#EF4444":"#6B7280";return(<div style={{background:"#111118",borderRadius:10,padding:"14px 18px",borderLeft:`4px solid ${lv.color}`,position:"relative",transition:"transform 0.12s,box-shadow 0.12s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.18)"}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>{item.k&&<span style={{position:"absolute",top:10,right:52,fontSize:9,padding:"2px 7px",borderRadius:99,background:"#F59E0B20",color:"#F59E0B",fontWeight:700}}>★ KEY</span>}<div style={{fontSize:16,fontWeight:item.k?700:500,lineHeight:1.55,color:"#EDEDF3",fontFamily:"'Noto Sans KR',sans-serif",letterSpacing:"-0.015em",paddingRight:60}}>{item.ko}</div>{item.en&&<div style={{fontSize:12.5,color:"#7E7E96",marginTop:5,fontStyle:"italic",lineHeight:1.4}}>{item.en}</div>}<div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:10,alignItems:"center"}}><span style={{fontSize:10,padding:"2px 7px",borderRadius:99,background:lv.color+"18",color:lv.color,fontWeight:600}}>{lv.id}. {lv.label}</span>{item.g&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:99,background:"#F3F4F612",color:"#9CA3AF"}}>{FEAT_TAGS.find(t=>t.tag===item.g)?.label}</span>}<span style={{fontSize:10,padding:"2px 7px",borderRadius:99,background:fc+"14",color:fc,fontWeight:600}}>{item.f}</span><span style={{fontSize:10,color:"#4A4A60",marginLeft:"auto"}}>{item.s}</span></div><button onClick={()=>{navigator.clipboard.writeText(item.ko);setCp(true);setTimeout(()=>setCp(false),1000)}} style={{position:"absolute",top:10,right:10,border:"none",background:cp?"#10B981":"#1A1A24",color:cp?"#fff":"#7E7E96",borderRadius:6,padding:"3px 9px",fontSize:10,cursor:"pointer",fontWeight:600}}>{cp?"✓":"Copy"}</button></div>)}

export default function App(){const[sel,setSel]=useState("All");const[subSel,setSubSel]=useState(null);const[featTag,setFeatTag]=useState(null);const[fit,setFit]=useState("All");const[q,setQ]=useState("");const[ch,setCh]=useState(null);const[view,setView]=useState("warehouse");const[keyOnly,setKeyOnly]=useState(false);
const data=useMemo(()=>{let r=D;if(ch){const c=CHANNELS.find(x=>x.name===ch);if(c)r=r.filter(d=>c.levels.includes(d.l))}if(sel!=="All")r=r.filter(d=>d.l===sel);if(subSel)r=r.filter(d=>d.sub===subSel);if(featTag)r=r.filter(d=>d.g===featTag);if(fit!=="All")r=r.filter(d=>d.f===fit);if(keyOnly)r=r.filter(d=>d.k);if(q.trim()){const s=q.toLowerCase();r=r.filter(d=>d.ko.toLowerCase().includes(s)||d.en.toLowerCase().includes(s)||d.s.toLowerCase().includes(s))}return r},[sel,subSel,featTag,fit,q,ch,keyOnly]);
const counts=useMemo(()=>{const c={};LEVELS.forEach(l=>c[l.id]=0);data.forEach(d=>c[d.l]++);return c},[data]);
const totalCounts=useMemo(()=>{const c={};LEVELS.forEach(l=>c[l.id]=0);D.forEach(d=>c[d.l]++);return c},[]);
const filteredSubCounts=useMemo(()=>{const c={};data.forEach(d=>{if(d.sub)c[d.sub]=(c[d.sub]||0)+1});return c},[data]);
const subCounts=useMemo(()=>{const c={};D.forEach(d=>{if(d.sub)c[d.sub]=(c[d.sub]||0)+1});return c},[]);
const featCounts=useMemo(()=>{const c={};D.filter(d=>d.sub==="RTB-Features").forEach(d=>{if(d.g)c[d.g]=(c[d.g]||0)+1});return c},[]);
const showFeatTags=subSel==="RTB-Features";
const handleLevelClick=(id)=>{if(sel===id){setSel("All");setSubSel(null);setFeatTag(null)}else{setSel(id);setSubSel(null);setFeatTag(null)}};

return(<div style={{minHeight:"100vh",background:"#08080D",color:"#EDEDF3",fontFamily:"'DM Sans','Noto Sans KR',sans-serif"}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,500;9..40,700&family=Noto+Sans+KR:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#252535;border-radius:99px}`}</style>

<div style={{padding:"24px 32px 18px",borderBottom:"1px solid #1A1A24"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:24}}>🏭</span><h1 style={{fontSize:20,fontWeight:700,letterSpacing:"-0.03em",fontFamily:"'Space Mono',monospace"}}>Speak KR Copy Warehouse</h1><span style={{fontSize:9,padding:"2px 8px",borderRadius:99,background:"#6366F1",color:"#fff",fontWeight:700}}>v8</span></div>
<p style={{color:"#7E7E96",fontSize:12,marginTop:5}}>7-level hierarchy · {D.length} copies · Brand: 나를 끌어주는 영어 앱</p>
<div style={{display:"flex",gap:3,marginTop:14,background:"#111118",borderRadius:8,padding:2,width:"fit-content"}}>
{[["warehouse","📦 Warehouse"],["factory","🏭 Factory"],["evaluate","✅ Evaluate"],["channels","📡 Channels"],["map","📐 Hierarchy"]].map(([v,lb])=>(<button key={v} onClick={()=>{setView(v);if(v!=="warehouse")setCh(null)}} style={{padding:"6px 16px",borderRadius:6,border:"none",background:view===v?"#6366F1":"transparent",color:view===v?"#fff":"#7E7E96",fontSize:11,fontWeight:600,cursor:"pointer"}}>{lb}</button>))}
</div></div>

{view==="map"&&<div style={{padding:"28px 32px",maxWidth:860}}>{LEVELS.map((l,i)=>{const keys=D.filter(d=>d.l===l.id&&d.k);return(<div key={l.id} style={{display:"flex",gap:14,marginBottom:4}}><div style={{width:36,display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:28,height:28,borderRadius:99,background:l.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"'Space Mono'"}}>{l.id}</div>{i<LEVELS.length-1&&<div style={{width:2,flex:1,background:"#1A1A24",marginTop:2}}/>}</div><div style={{flex:1,background:"#111118",borderRadius:10,padding:"14px 18px",marginBottom:8,borderLeft:`3px solid ${l.color}`}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}><span style={{fontSize:14,fontWeight:700,color:l.color}}>{l.label}</span><span style={{fontSize:10,color:"#4A4A60",marginLeft:"auto"}}>{totalCounts[l.id]}</span></div><div style={{fontSize:11,color:"#7E7E96"}}>{l.desc}</div>{l.subs&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>{l.subs.map(s=><span key={s.id} style={{fontSize:9,padding:"2px 7px",borderRadius:99,background:l.color+"15",color:l.color,fontWeight:500}}>{s.label} ({subCounts[s.tag]||0})</span>)}</div>}{keys.map((kc,ki)=>(<div key={ki} style={{display:"flex",alignItems:"center",gap:6,marginTop:6,paddingTop:ki===0?8:0,borderTop:ki===0?"1px solid #1A1A24":"none"}}><span style={{fontSize:8,padding:"1px 5px",borderRadius:99,background:"#F59E0B20",color:"#F59E0B",fontWeight:700}}>★</span><span style={{fontSize:13,fontWeight:600,fontFamily:"'Noto Sans KR'"}}>{kc.ko}</span></div>))}</div></div>)})}</div>}

{view==="factory"&&<Factory copies={D}/>}

{view==="evaluate"&&<Evaluator/>}

{view==="channels"&&<div style={{padding:"28px 32px"}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>{CHANNELS.map(c=>(<div key={c.name} onClick={()=>{setCh(c.name);setView("warehouse")}} style={{background:"#111118",borderRadius:10,padding:16,cursor:"pointer",border:"1px solid #1A1A24",transition:"border-color 0.12s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#6366F1"} onMouseLeave={e=>e.currentTarget.style.borderColor="#1A1A24"}><div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{c.name}</div><div style={{fontSize:11,color:"#7E7E96",marginBottom:10}}>{c.desc}</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{c.levels.map(lid=>{const lv=LEVELS.find(x=>x.id===lid);return<span key={lid} style={{fontSize:9,padding:"2px 7px",borderRadius:99,background:lv.color+"20",color:lv.color,fontWeight:600}}>{lid}. {lv.label}</span>})}</div></div>))}</div></div>}

{view==="warehouse"&&<div style={{display:"flex",minHeight:"calc(100vh - 120px)"}}>
<div style={{width:280,borderRight:"1px solid #1A1A24",padding:"16px 14px",flexShrink:0,overflowY:"auto"}}>
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{width:"100%",padding:"8px 11px",borderRadius:7,border:"1px solid #1A1A24",background:"#111118",color:"#EDEDF3",fontSize:12,outline:"none",marginBottom:10}}/>
<button onClick={()=>setKeyOnly(!keyOnly)} style={{width:"100%",padding:"7px 11px",borderRadius:7,border:`1px solid ${keyOnly?"#F59E0B55":"#1A1A24"}`,background:keyOnly?"#F59E0B12":"transparent",color:keyOnly?"#F59E0B":"#7E7E96",fontSize:11,fontWeight:600,cursor:"pointer",marginBottom:12}}>★ Key Copies Only</button>
{ch&&<div style={{marginBottom:12,padding:"7px 11px",background:"#6366F112",borderRadius:7,border:"1px solid #6366F133"}}><div style={{fontSize:10,color:"#6366F1",fontWeight:600}}>Channel: {ch}</div><button onClick={()=>setCh(null)} style={{fontSize:10,color:"#6366F1",background:"none",border:"none",cursor:"pointer",textDecoration:"underline",marginTop:2}}>Clear</button></div>}
<div style={{fontSize:9,fontWeight:700,color:"#4A4A60",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Message Hierarchy</div>
<button onClick={()=>{setSel("All");setSubSel(null);setFeatTag(null)}} style={{display:"flex",alignItems:"center",width:"100%",padding:"8px 11px",borderRadius:7,border:sel==="All"?"1px solid #6366F144":"1px solid transparent",background:sel==="All"?"#6366F112":"transparent",color:sel==="All"?"#A5B4FC":"#7E7E96",fontSize:12,fontWeight:600,cursor:"pointer",marginBottom:6}}>All Levels<span style={{marginLeft:"auto",fontSize:11,fontFamily:"'Space Mono'",color:"#4A4A60"}}>{data.length}</span></button>

{LEVELS.map(l=>{const active=sel===l.id;const expanded=active&&l.subs;return(<div key={l.id} style={{marginBottom:4}}>
<button onClick={()=>handleLevelClick(l.id)} style={{display:"flex",alignItems:"flex-start",gap:10,width:"100%",textAlign:"left",padding:"10px 11px",borderRadius:8,border:active?`1px solid ${l.color}44`:"1px solid transparent",background:active?l.color+"10":"#0D0D14",cursor:"pointer",transition:"all 0.12s"}} onMouseEnter={e=>{if(!active)e.currentTarget.style.background="#111118"}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background="#0D0D14"}}>
<div style={{width:24,height:24,borderRadius:6,background:active?l.color:l.color+"25",display:"flex",alignItems:"center",justifyContent:"center",color:active?"#fff":l.color,fontSize:11,fontWeight:700,fontFamily:"'Space Mono'",flexShrink:0,marginTop:1}}>{l.id}</div>
<div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:active?l.color:"#EDEDF3"}}>{l.label}</div><div style={{fontSize:10,color:"#5A5A72",marginTop:1}}>{l.desc}</div></div>
<span style={{fontSize:11,color:active?l.color:"#4A4A60",fontFamily:"'Space Mono'",fontWeight:600,flexShrink:0,marginTop:2}}>{counts[l.id]||0}</span></button>
{expanded&&<div style={{marginLeft:20,marginTop:4,marginBottom:4,paddingLeft:14,borderLeft:`2px solid ${l.color}30`}}>
<button onClick={()=>{setSubSel(null);setFeatTag(null)}} style={{display:"flex",alignItems:"center",width:"100%",padding:"5px 10px",borderRadius:5,border:"none",background:!subSel?l.color+"15":"transparent",color:!subSel?l.color:"#5A5A72",fontSize:11,fontWeight:!subSel?600:400,cursor:"pointer",marginBottom:2}}>All {l.label}<span style={{marginLeft:"auto",fontSize:10,fontFamily:"'Space Mono'"}}>{counts[l.id]||0}</span></button>
{l.subs.map(s=>{const sa=subSel===s.tag;return(<button key={s.id} onClick={()=>{setSubSel(sa?null:s.tag);setFeatTag(null)}} style={{display:"flex",alignItems:"center",width:"100%",padding:"5px 10px",borderRadius:5,border:"none",background:sa?l.color+"15":"transparent",color:sa?l.color:"#5A5A72",fontSize:11,fontWeight:sa?600:400,cursor:"pointer",marginBottom:2}}>{s.label}<span style={{marginLeft:"auto",fontSize:10,fontFamily:"'Space Mono'"}}>{filteredSubCounts[s.tag]||0}</span></button>)})}
</div>}</div>)})}

<div style={{marginTop:16,paddingTop:12,borderTop:"1px solid #1A1A24"}}>
<div style={{fontSize:9,fontWeight:700,color:"#4A4A60",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Positioning Fit</div>
{FIT_TAGS.map(f=>(<button key={f} onClick={()=>setFit(fit===f?"All":f)} style={{display:"block",width:"100%",textAlign:"left",padding:"4px 10px",borderRadius:5,border:"none",background:fit===f?"#6366F115":"transparent",color:fit===f?(f==="AS-IS legacy"?"#EF4444":"#A5B4FC"):"#5A5A72",fontSize:11,cursor:"pointer",marginBottom:1}}>{f==="AS-IS legacy"?"⚠️ ":""}{f}</button>))}
</div></div>

<div style={{flex:1,padding:"16px 24px",overflowY:"auto"}}>
<div style={{fontSize:12,color:"#7E7E96",marginBottom:showFeatTags?10:14}}>
{data.length} {data.length===1?"copy":"copies"}
{ch&&<> in <strong style={{color:"#A5B4FC"}}>{ch}</strong></>}
{keyOnly&&<> · <span style={{color:"#F59E0B"}}>★ Key only</span></>}
{sel!=="All"&&<> · <span style={{color:LEVELS.find(l=>l.id===sel)?.color}}>{LEVELS.find(l=>l.id===sel)?.label}</span></>}
{subSel&&<> → <span style={{color:"#9CA3AF"}}>{LEVELS.flatMap(l=>l.subs||[]).find(s=>s.tag===subSel)?.label}</span></>}
{featTag&&<> → <span style={{color:"#06B6D4"}}>{FEAT_TAGS.find(t=>t.tag===featTag)?.label}</span></>}
</div>

{showFeatTags&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16,padding:"12px 14px",background:"#0D0D14",borderRadius:10,border:"1px solid #1A1A24"}}>
<button onClick={()=>setFeatTag(null)} style={{padding:"5px 12px",borderRadius:99,border:"none",background:!featTag?"#06B6D4":"#1A1A24",color:!featTag?"#fff":"#7E7E96",fontSize:11,fontWeight:600,cursor:"pointer"}}>All</button>
{FEAT_TAGS.map(ft=>{const c=featCounts[ft.tag]||0;const a=featTag===ft.tag;return(<button key={ft.tag} onClick={()=>setFeatTag(a?null:ft.tag)} style={{padding:"5px 12px",borderRadius:99,border:"none",background:a?"#06B6D4":"#1A1A24",color:a?"#fff":"#7E7E96",fontSize:11,fontWeight:a?600:400,cursor:"pointer"}}>{ft.label} ({c})</button>)})}
</div>}

<div style={{display:"flex",flexDirection:"column",gap:8}}>
{data.length===0?<div style={{textAlign:"center",padding:50,color:"#4A4A60"}}><div style={{fontSize:32,marginBottom:8}}>🔍</div>No copies match</div>:data.map((item,i)=><Card key={i} item={item} lv={LEVELS.find(l=>l.id===item.l)}/>)}
</div></div></div>}
</div>)}

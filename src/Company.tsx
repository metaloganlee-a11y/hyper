import { useState } from 'react';
import { motion } from 'motion/react';
import { LogoSVG, LogoText } from './components/Logo';
import { Menu, X, ArrowLeft, MapPin, Building2, Trophy, Handshake, ShieldCheck, Flag, ArrowUpRight } from 'lucide-react';

const pressData = [
  {
    date: '2026.06.08',
    publisher: '라포르시안',
    title: 'AI의료헬스케어연구원, 고령자 돌봄 ‘능동형 생활 지원’ 표준화 논의',
    url: 'https://www.rapportian.com/news/articleView.html?idxno=236801'
  },
  {
    date: '2026.05.29',
    publisher: '전자신문',
    title: '하이퍼네트워크, AI 비접촉 헬스케어 모니터링으로 돌봄 혁신 나서',
    url: 'https://www.etnews.com/20260529000335'
  },
  {
    date: '2025.12.17',
    publisher: '환경일보',
    title: '과천시, ‘창업 네트워킹 데이’ 개최',
    url: 'https://www.hkbs.co.kr/news/articleView.html?idxno=813486'
  },
  {
    date: '2025.12.14',
    publisher: '한경매거진',
    title: '차세대 디지털 헬스케어 관제 시스템 ‘HYPER-Agent’ 개발하는 ‘하이퍼네트워크’',
    url: 'https://magazine.hankyung.com/job-joy/article/202512141831d'
  },
  {
    date: '2025.08.14',
    publisher: '서울신문',
    title: '하이퍼네트워크, 고령화 시대 비접촉 헬스케어로 돌봄 혁신 이끌어',
    url: 'https://www.seoul.co.kr/news/economy/2025/08/14/20250814500034'
  },
  {
    date: '2025.06.12',
    publisher: '플래텀',
    title: '한국여성벤처협회, 예비창업자 60명 대상 ‘MEET-UP’ 개최',
    url: 'https://platum.kr/archives/263105'
  }
];

const historyData = [
  {
    year: '2026',
    items: [
      { month: '07', text: '제27회 여성창업경진대회 "중소벤처기업부 장관상" 수상', icon: Trophy },
      { month: '04', text: "제18회 기보벤처캠프 '선정'", icon: Trophy },
      { month: '04', text: "2026 TIPS '선정'", icon: Trophy },
      { month: '04', text: "2026 E-LIFE Challenge 창업경진대회 '선정'", icon: Trophy },
      { month: '03', text: "2026년 초기창업패키지 (딥테크 특화형) '선정'", icon: ShieldCheck },
      { month: '03', text: "2026년 창업성공패키지 청년창업사관학교(딥테크 1기) '선정'", icon: ShieldCheck },
      { month: '02', text: "2025 GH청춘 빌드업 창업 공모전 '입상 수상'", icon: Trophy },
    ]
  },
  {
    year: '2025',
    items: [
      { month: '11', text: "전국 1,000병상 서비스 도입 돌파", icon: Flag },
      { month: '11', text: "과천시 오픈이노베이션 '우수기업 선정'", icon: Trophy },
      { month: '10', text: "2025 오픈 이노베이션 클럽 프로그램 '선정'", icon: Handshake },
      { month: '10', text: "과천시립요양원 공공형 PoC 업무협약 체결", icon: Handshake },
      { month: '09', text: "한양대학교 기술지주회사(주) Seed 투자 유치", icon: Building2 },
      { month: '08', text: "국토교통 중소기업 판로개척 지원 프로그램 '선정'", icon: ShieldCheck },
      { month: '06', text: "G-파트너사 프로그램 '우수기업 선정'", icon: Trophy },
      { month: '05', text: "경기교통공사 우수기업 '선정' 및 입주", icon: Building2 },
      { month: '05', text: "여성특화 엑셀러레이팅 프로그램 '선정'", icon: ShieldCheck },
      { month: '04', text: "2025 서울캠퍼스타운(창업형) '선정'", icon: Building2 },
      { month: '01', text: "2024년 여성특화W-스타트업 데모데이 '장려상 수상'", icon: Trophy },
    ]
  },
  {
    year: '2024',
    items: [
      { month: '11', text: "과천시창업지원센터 우수기업 '선정' 및 입주", icon: Building2 },
      { month: '10', text: "서울 스타트업 [W-스케일업 포럼] '우수기업 선정'", icon: Trophy },
      { month: '09', text: "핵심 기술 특허 출원", icon: ShieldCheck },
      { month: '09', text: "광기술원 글로벌 기술선도형 딥테크 창업 촉진 지원사업 '선정'", icon: ShieldCheck },
      { month: '08', text: "이리공업고등학교 산학협력협약 체결", icon: Handshake },
      { month: '08', text: "법인 설립", icon: Flag },
      { month: '08', text: "제6회 과천시 창업아이디어 경진대회 '시드상 수상'", icon: Trophy },
      { month: '04', text: "2024 예비창업패키지 여성특화부문 '선정'", icon: ShieldCheck },
      { month: '04', text: "이화여대 캠퍼스타운 라이프테크 창업경진대회 '입상'", icon: Trophy },
    ]
  }
];

export default function Company() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center gap-3">
              <LogoSVG className="w-8 h-8 md:w-10 md:h-10" />
              <LogoText className="text-xl md:text-2xl" />
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/#pipeline" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Technical Deep Dive</a>
              <a href="/#global" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Global Strategy</a>
              <a href="/#privacy" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Privacy & Security</a>
              <a href="/#p" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sovereign AI</a>
              <a href="/company" className="text-sm font-medium text-blue-600 transition-colors">Company</a>
              <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm shadow-blue-200">
                Contact Us
              </a>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-100 bg-white absolute w-full left-0 px-4 shadow-lg">
              <div className="flex flex-col space-y-4">
                <a href="/#pipeline" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-slate-600">Technical Deep Dive</a>
                <a href="/#global" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-slate-600">Global Strategy</a>
                <a href="/#privacy" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-slate-600">Privacy & Security</a>
                <a href="/#p" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-slate-600">Sovereign AI</a>
                <a href="/company" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-blue-600">Company</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium self-start inline-block text-center">
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white border-b border-slate-200 overflow-hidden w-full">
        {/* Typographic Edge Watermark Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-[0.06]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220vw] h-[220vh] rotate-[-5deg] flex flex-col justify-center items-center">
            {Array.from({ length: 300 }).map((_, i) => (
              <div key={i} className={`whitespace-nowrap flex w-full tracking-tighter mix-blend-multiply transition-transform ${i % 2 === 0 ? '-translate-x-20' : 'translate-x-20'}`} style={{ lineHeight: '0.85' }}>
                <span className={`flex-shrink-0 ${
                  i % 5 === 0 ? 'text-sm md:text-base font-serif italic tracking-wider font-bold text-slate-900 uppercase' : 
                  i % 4 === 0 ? 'text-xs md:text-sm font-black font-sans tracking-tight text-transparent uppercase' :
                  i % 3 === 0 ? 'text-[10px] md:text-xs font-serif font-medium tracking-normal text-slate-800' :
                  i % 2 === 0 ? 'text-sm md:text-base font-black font-sans tracking-tighter text-slate-900 uppercase' :
                  'text-xs md:text-sm font-serif italic font-semibold text-slate-700'
                }`} style={i % 4 === 0 ? { WebkitTextStroke: '0.5px #0f172a' } : {}}>
                  {Array.from({ length: 50 }).map((_, j) => (
                    i % 2 === 0 
                      ? "HYPER NETWORK • THE DAILY JOURNAL • ADVANCED SENSING • " 
                      : (i % 3 === 0 ? "The architecture of care requires zero compromise on privacy. " : "NEXT GEN CARE • VOL. I • HYPER NETWORK • ")
                  )).join("")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-4">
              ABOUT US
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.3]">
              Pioneering the Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 inline-block mt-2 md:mt-4">Care Infrastructure</span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            하이퍼네트워크는 차세대 비영상 Edge AI 레이더 기술로<br className="hidden sm:block" />
            대한민국 인프라를 혁신하는 딥테크 기업입니다.
          </motion.p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 space-y-4">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900">History</h2>
            <p className="text-lg text-slate-500 font-light">하이퍼네트워크가 걸어온 길입니다.</p>
          </div>

          <div>
            {historyData.map((yearBlock, idx) => (
              <motion.div 
                key={yearBlock.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 mb-16 md:mb-24"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 border-b-2 border-slate-900 pb-4 inline-block md:block md:border-b-0 md:pb-0">
                    {yearBlock.year}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {yearBlock.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx}
                      className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-4 items-start py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors -mx-4 px-4 rounded-xl"
                    >
                      <div className="text-slate-400 font-mono text-sm pt-0.5">
                        {item.month}
                      </div>
                      <div className="text-slate-700 font-medium leading-relaxed break-keep">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 mb-4">Press & Media</h2>
            <p className="text-lg text-slate-500 font-light">하이퍼네트워크가 만들어가는 혁신의 기록입니다.</p>
          </div>

          <div className="border-t border-slate-200">
            {pressData.map((article, idx) => (
              <motion.a 
                key={idx}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group flex flex-col md:flex-row py-8 border-b border-slate-100 hover:border-slate-200 transition-colors duration-300 relative"
              >
                {/* Subtle highlight background */}
                <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-6 px-6 rounded-2xl z-0 pointer-events-none"></div>
                
                <div className="relative z-10 md:w-1/4 flex flex-row md:flex-col gap-4 md:gap-1.5 mb-3 md:mb-0 shrink-0">
                  <span className="text-blue-600 font-bold text-sm tracking-wide">{article.publisher}</span>
                  <span className="text-slate-400 font-mono text-sm">{article.date}</span>
                </div>
                <div className="relative z-10 md:w-3/4 flex justify-between items-start gap-6">
                  <h3 className="text-lg md:text-xl font-medium text-slate-800 group-hover:text-blue-600 transition-colors leading-snug break-keep">
                    {article.title}
                  </h3>
                  <div className="flex-shrink-0 text-slate-300 group-hover:text-blue-500 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 mt-1">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Footer */}
      <footer id="contact" className="bg-slate-900 py-20 text-white">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Ready to transform your care infrastructure?</h2>
            <p className="text-slate-400 text-sm md:text-base mb-4">차세대 비영상 무선 레이더 센서 기반 대단위 돌봄 안전 보호 솔루션을 도입해보세요.</p>
            <p className="text-emerald-400 font-semibold text-base mb-10">하이퍼네트워크는 국가대표 AI와 국가차원 실버케어 정책과 함께 합니다.</p>
            <a href="mailto:hypernetwork.co.kr@gmail.com" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-900/50">
              E-mail : hypernetwork.co.kr@gmail.com
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-16 border-t border-slate-800/60 mb-16 px-4 text-center">
            <div>
              <span className="block text-slate-400 font-medium mb-3 text-xs uppercase tracking-widest">(본사) GWANGJU HQ</span>
              <p className="text-slate-300 text-sm leading-relaxed font-light">광주광역시 북구 서하로 463<br/>2층 비18호</p>
            </div>
            <div>
              <span className="block text-slate-400 font-medium mb-3 text-xs uppercase tracking-widest">(서울지사) SEOUL BRANCH</span>
              <p className="text-slate-300 text-sm leading-relaxed font-light">서울특별시 서대문구 성산로 512-42<br/>이화 스타트업 이룸센터 4층 403호</p>
            </div>
            <div>
              <span className="block text-slate-400 font-medium mb-3 text-xs uppercase tracking-widest">(기업연구소) R&D CENTER</span>
              <p className="text-slate-300 text-sm leading-relaxed font-light">경기도 과천시 과천대로7길 65<br/>과천상상자이타워 B동 126호</p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <LogoSVG className="w-6 h-6 grayscale opacity-80" />
              <LogoText className="text-lg opacity-80" light={true} />
            </div>
            <p>© {new Date().getFullYear()} HYPER Network Co., Ltd. All rights reserved.</p>
            <p className="text-slate-600">한양대학교 기술지주회사 투자 유치사</p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

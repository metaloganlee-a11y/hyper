import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export function GlobalStrategy() {
  return (
    <section id="global" className="py-24 bg-white border-b border-slate-200">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 aspect-[4/3] flex items-center justify-center flex-col relative overflow-hidden group shadow-2xl">
              {/* Dark global gradient background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,rgba(2,6,23,1)_100%)]"></div>
              
              {/* Stylized Grid Overlay representing radar / data map */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '24px 24px', backgroundPosition: 'center' }}></div>

              {/* Subtle Map Silhouette Context */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center" style={{ backgroundSize: '120%', filter: 'invert(1) grayscale(1) brightness(2)' }}></div>

              {/* Network connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* USA to Europe */}
                <path d="M 22 35 Q 36 15 52 26" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-blue-400" strokeDasharray="1 1" />
                {/* Europe to Middle East */}
                <path d="M 52 26 Q 60 30 64 42" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-blue-400" strokeDasharray="1 1" />
                {/* Middle East to KOREA */}
                <path d="M 64 42 Q 76 29 89 33" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-indigo-400" strokeDasharray="1 1" />
              </svg>

              {/* Pin: USA (North America) */}
              <div className="absolute top-[35%] left-[22%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s' }}></div>
                  <MapPin className="w-5 h-5 text-blue-400 relative z-10 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" fill="currentColor" />
                </div>
                <span className="text-[9px] font-bold text-blue-300 mt-1 uppercase tracking-widest bg-slate-900/80 px-1.5 py-0.5 rounded border border-blue-900/50 backdrop-blur-sm">USA</span>
              </div>

              {/* Pin: Europe */}
              <div className="absolute top-[26%] left-[52%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.7s' }}></div>
                  <MapPin className="w-5 h-5 text-blue-400 relative z-10 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" fill="currentColor" />
                </div>
                <span className="text-[9px] font-bold text-blue-300 mt-1 uppercase tracking-widest bg-slate-900/80 px-1.5 py-0.5 rounded border border-blue-900/50 backdrop-blur-sm">EU</span>
              </div>

              {/* Pin: Middle East (Dubai) */}
              <div className="absolute top-[42%] left-[64%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-2 bg-indigo-500 rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s', animationDelay: '1.4s' }}></div>
                  <MapPin className="w-5 h-5 text-indigo-400 relative z-10 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]" fill="currentColor" />
                </div>
                <span className="text-[9px] font-bold text-indigo-300 mt-1 uppercase tracking-widest bg-slate-900/80 px-1.5 py-0.5 rounded border border-indigo-900/50 backdrop-blur-sm">DUBAI</span>
              </div>

              {/* Pin: South Korea */}
              <div className="absolute top-[33%] left-[89%] flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-2 bg-emerald-500 rounded-full opacity-30 animate-ping" style={{ animationDuration: '3s', animationDelay: '2.1s' }}></div>
                  <MapPin className="w-6 h-6 text-emerald-400 relative z-10 drop-shadow-[0_0_12px_rgba(52,211,153,1)]" fill="currentColor" />
                </div>
                <span className="text-[10px] font-bold text-emerald-300 mt-1 uppercase tracking-widest bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80 backdrop-blur-sm shadow-[0_0_10px_rgba(52,211,153,0.2)]">KOREA</span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-6 inset-x-0 flex flex-col items-center pointer-events-none">
                <h3 className="text-xl font-bold text-white relative z-10 mb-1 drop-shadow-md">Global Data Network</h3>
                <p className="text-slate-400 relative z-10 text-xs font-medium">실시간 통합 관제망 및 엣지 노드 위치</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Global Expansion Strategy</h2>
            <p className="text-blue-600 font-semibold mb-8">국가별 대단위 헬스케어 AI 데이터 센터와 협업</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Europe (GDPR Core Boundaries)</h3>
                <p className="text-sm text-slate-600 mb-1 font-medium">An elegant solution built explicitly to surpass strictly monitored GDPR visual processing restrictions.</p>
                <p className="text-xs text-slate-500">가장 엄격한 데이터 보호법(GDPR)을 적용하는 유럽 연합 요양 시장에 카메라 촬영 원천 배제 기술로 최적의 대안을 제공합니다.</p>
              </div>
              <div className="w-12 h-px bg-slate-200"></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">North America</h3>
                <p className="text-sm text-slate-600 mb-1 font-medium">Resolving continuous care infrastructure costs driven by structural medical staff shortages.</p>
                <p className="text-xs text-slate-500">간호 및 의료 종사자 부족 사태가 장기화되는 북미 주요 의료 네트워크에 보조 스태프 인프라로서 기능합니다.</p>
              </div>
              <div className="w-12 h-px bg-slate-200"></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Middle East (GCC Innovation Hubs)</h3>
                <p className="text-sm text-slate-600 mb-1 font-medium">Providing high-end validation pilots starting from UAE/Dubai smart city care integration.</p>
                <p className="text-xs text-slate-500">두바이 및 사우디아라비아 첨단 메디컬 시티 스마트 병동 인프라로의 긴밀한 기술 파일럿 및 사업 확장을 추진합니다.</p>
              </div>
              <div className="w-12 h-px bg-slate-200"></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Korea</h3>
                <p className="text-sm text-slate-600 mb-1 font-medium">Combined with South Korea's Sovereign AI + Ministry of Health and Welfare projects, providing DR.HYPER services so anyone can predict and prevent personal health conditions. Actively participating in national safety net projects targeting vulnerable groups in various fields, including general hospitals, nursing homes, senior citizens living alone, and single-person households.</p>
                <p className="text-xs text-slate-500">대한민국의 소버린AI + 보건복지부 사업과 결합하여 누구나 개인건강정보를 예측하고 예방할수 있도록 DR.HYPER 서비스 제공</p>
                <p className="text-xs text-slate-500">종합병원, 요양병원, 독거노인, 1인가정등 다양한 분야의 취약계층을 대상으로 국가 안전망 사업에 적극적으로 참여 하고 있습니다.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

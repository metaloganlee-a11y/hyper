import { motion } from 'motion/react';
import { LogoSVG, LogoText } from './Logo';

export function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 py-20 text-white">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Ready to transform your care infrastructure?</h2>
          <p className="text-slate-400 text-sm md:text-base mb-4">차세대 비영상 무선 레이더 센서 기반 대단위 돌봄 안전 보호 솔루션을 도입해보세요.</p>
          <p className="text-emerald-400 font-semibold text-base mb-10">하이퍼네트워크는 국가대표 AI와 국가차원 실버케어 정책과 함께 합니다.</p>
          <a href="mailto:dr.hyper@hypernetwork.co.kr" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-900/50">
            E-mail : dr.hyper@hypernetwork.co.kr
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
  );
}

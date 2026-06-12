import { useState } from 'react';
import { motion } from 'motion/react';
import { Server, Workflow, CheckCircle2, Cpu, Shield } from 'lucide-react';

export function TechStackToggle() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'architecture'>('architecture');

  return (
    <div className="w-full mt-2 md:mt-4">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-100 p-1 rounded-xl inline-flex relative shadow-inner">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`relative z-10 px-5 py-2 text-[11px] md:text-[13px] font-bold rounded-lg transition-colors flex items-center ${
              activeTab === 'architecture' ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Server className="w-3.5 h-3.5 mr-1.5" />
            시스템 아키텍처
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`relative z-10 px-5 py-2 text-[11px] md:text-[13px] font-bold rounded-lg transition-colors flex items-center ${
              activeTab === 'pipeline' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Workflow className="w-3.5 h-3.5 mr-1.5" />
            AI 학습 시스템
          </button>
          
          {/* Animated Background Pill */}
          <div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-in-out border border-slate-200"
            style={{ 
              transform: `translateX(${activeTab === 'architecture' ? '4px' : '100%'})`,
            }}
          />
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="w-full">
        {activeTab === 'pipeline' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm"
          >
            <div className="md:col-span-7 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2 h-[250px] md:h-[400px]">
              <img 
                src="/pipeline.png" 
                alt="AI 학습 시스템 구조도" 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="md:col-span-5 px-2 md:px-4 py-2">
              <div className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold mb-3 uppercase tracking-widest">
                MLOps Pipeline
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">AI 학습 시스템 구조도</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                멀티소스(레이더, 음성, 웨어러블) 데이터를 수집하고 전처리하여 지속적인 학습 루프를 구축합니다. 엣지 디바이스와 클라우드의 연동으로 재학습을 통해 성능을 고도화합니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs md:text-[13px] font-medium text-slate-600 ml-2">Phase 1~5 자동화 파이프라인 데이터 흐름 구성</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs md:text-[13px] font-medium text-slate-600 ml-2">W&B 실험 모니터링 기반 오경보 케이스 지속 수집</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'architecture' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm"
          >
            <div className="md:col-span-7 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2 h-[250px] md:h-[400px]">
              <img 
                src="/architecture.png" 
                alt="전체 시스템 블록 아키텍처" 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="md:col-span-5 px-2 md:px-4 py-2">
              <div className="inline-flex items-center px-2 py-1 rounded bg-indigo-50 text-indigo-600 text-[10px] md:text-xs font-bold mb-3 uppercase tracking-widest">
                5-Layer Architecture
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">시스템 블록 아키텍처</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                멀티센서 디바이스 통합 관제를 위한 5계층 아키텍처입니다. 로컬 엣지 환경에서 최적화된 행동 분류 및 sLLM 추론 엔진을 동작시켜 3초 이내의 빠른 E2E 지연시간을 확보합니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Cpu className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs md:text-[13px] font-medium text-slate-600 ml-2">NVIDIA 엣지 통합 및 다중 어드민 기반 (RBAC) </span>
                </div>
                <div className="flex items-start">
                  <Shield className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs md:text-[13px] font-medium text-slate-600 ml-2">시각 정보 수집 없이 프라이버시가 보호되는 데이터 설계</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

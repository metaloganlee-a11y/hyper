import { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { GlobalStrategy } from './components/GlobalStrategy';
import { LogoSVG, LogoText } from './components/Logo';
import { PartnerCarousel } from './components/PartnerCarousel';
import { motion } from 'motion/react';
import { 
  Shield, 
  Activity, 
  Smartphone, 
  ChevronRight, 
  Menu, 
  X, 
  RadioReceiver, 
  BrainCircuit, 
  EyeOff,
  Clock,
  Globe2,
  Cpu,
  Tv,
  CheckCircle2,
  ListFilter,
  LineChart,
  BarChart3,
  Server,
  Workflow,
  Lock,
  MapPin,
  Navigation as NavigationIcon
} from 'lucide-react';

import { DeepTechShowcase } from './components/DeepTechShowcase';
import { TelemetryState } from './types';
import { RadarLiveSpectrum } from './components/RadarLiveSpectrum';
import { RadarCoveragePlanner } from './components/RadarCoveragePlanner';
import { EdgeAIModelSandbox } from './components/EdgeAIModelSandbox';
import { TechStackToggle } from './components/TechStackToggle';
import { MetricsChart } from './components/MetricsChart';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string>('normal');
  const [activeTab, setActiveTab] = useState<'pipeline' | 'resources' | 'planning'>('pipeline');

  const telemetryStates: Record<string, TelemetryState> = {
    normal: {
      name: "Normal Sleep (Stationary)",
      nameKr: "정상 수면 (활동 정지 상태)",
      adcChirps: "77GHz FMCW ADC Sampling: 4000 samples/chirp | PRF 1000Hz | 12 Virtual Aperture Active",
      rangeDoppler: "2D FFT: Velocity ≈ 0.02 m/s | Range ≈ 2.1m | Constant amplitude peak detected",
      cfarStatus: "OS-CFAR Triggered | Guard cells clear | SNR Margin: 18.4 dB (Pass)",
      pointCloud: "DBSCAN: 48 spatial points clustered | Human bounding cube resolved | Static bed region lock",
      respiratoryRate: "Micro-Doppler active: 16.2 breaths/min (Stabilized 0.27 Hz chest oscillation band)",
      eventLog: JSON.stringify({
        timestamp: "T+0.0s",
        event_type: "stationary_presence",
        location: "bed_area",
        velocity: 0.02,
        micro_doppler: "respiratory_rhythm",
        bpm: 16.2,
        confidence: 0.98
      }, null, 2),
      sllmReasoning: "Chain-of-Thought Analysis:\n1. Sequence history parses stationary micro-movements for 10 minutes.\n2. Measured respiratory pattern (16.2 bpm) lies perfectly within the normal physiological band for age 65+ (12-20 bpm).\n3. Spatial bounding coordinates align precisely with registered bedding coordinates.\n\nDiagnosis: [Normal State] Persistent stationary presence with normal breathing dynamics securely confirmed. No warnings required.",
      action: "Status is nominal. High resolution vitals logging active.",
      iconColor: "text-emerald-500",
      activeStatus: "NOMINAL",
      activeStatusKr: "정상 상태"
    },
    standing: {
      name: "In-Room Standing / Roaming",
      nameKr: "재실 중 기립 및 이동",
      adcChirps: "77GHz FMCW ADC Sampling: 4000 samples/chirp | Dynamic IQ Separation | SPI 115.2kbps Tx active",
      rangeDoppler: "2D FFT: Velocity ≈ 0.85 m/s | Range ≈ 1.4m to 3.2m moving | Multi-path reflections present",
      cfarStatus: "OS-CFAR dynamic threshold tracking | Clutter gate active | Static reflections suppressed",
      pointCloud: "DBSCAN: 112 points resolved | Skeleton keypoint estimation: Upright torso posture (Joint angle ≈ 172°)",
      respiratoryRate: "Micro-Doppler masked by spatial locomotion frequency components",
      eventLog: JSON.stringify({
        timestamp: "T+1.5s",
        event_type: "locomotion_detected",
        location: "ward_corridor",
        velocity: 0.85,
        micro_doppler: "motion_masked",
        bpm: null,
        confidence: 0.94
      }, null, 2),
      sllmReasoning: "Chain-of-Thought Analysis:\n1. Input sequence displays active spatial point velocity averaging 0.85 m/s.\n2. Posture classifier yields highly confident axial alignment vertical to horizontal ratios.\n3. Motion vectors indicate steady locomotion toward bathroom zone.\n\nDiagnosis: [Active Status] Patient is standing or walking safely in room environment. Tracking spatial coordinates accordingly.",
      action: "Continuous corridor tracking active. Adaptive night ward lighting synchronized.",
      iconColor: "text-blue-500",
      activeStatus: "ACTIVE",
      activeStatusKr: "활동 중"
    },
    fall: {
      name: "Sudden Fall Event (Critical)",
      nameKr: "급격한 낙상 사고 (임계 위험)",
      adcChirps: "77GHz FMCW ADC Sampling: Max PRF dynamic boost | Multi-channel IQ mismatch calibrated",
      rangeDoppler: "2D FFT: Velocity spike Peak ≈ -2.85 m/s | Radical point dispersion to ground level",
      cfarStatus: "OS-CFAR Noise floor exceeds threshold | Doppler gating triggered (Energy > 4500)",
      pointCloud: "DBSCAN: Horizontal point array collapse | Z-axis coordinate drop from 1.6m to 0.15m in under 380ms",
      respiratoryRate: "Chest micro-oscillation completely disrupted by impact vibration peaks",
      eventLog: JSON.stringify({
        timestamp: "T+0.3s",
        event_type: "critical_fall_detected",
        location: "bathroom_floor",
        velocity: -2.85,
        micro_doppler: "impact_disrupted",
        bpm: null,
        confidence: 0.99
      }, null, 2),
      sllmReasoning: "Chain-of-Thought Analysis:\n1. Point cloud telemetry records severe velocity drop along negative axial axis (-2.85 m/s).\n2. DBSCAN clustered centroids align horizontally at height = 0.15m within 380 milliseconds.\n3. Complete cessation of vertical movement. Patient remains motionless.\n\nDiagnosis: [Critical Fall Detected] Sudden floor impact + complete motion absence securely resolved. Urgently initializing E2E Alert Dispatch Protocol.",
      action: "EMERGENCY: Activating immediate audio confirmation & dispatching caregiver alerts.",
      iconColor: "text-red-500",
      activeStatus: "CRITICAL",
      activeStatusKr: "응급 상태"
    },
    apnea: {
      name: "Sleep Apnea Scenario",
      nameKr: "수면 무호흡 상황 (주의 위험)",
      adcChirps: "77GHz FMCW ADC Sampling: 4000 samples/chirp | Constant frequency phase lock",
      rangeDoppler: "2D FFT: Zero structural velocity detected. Steady location at baseline coordinates.",
      cfarStatus: "OS-CFAR static gate locking passive | Noise suppression filter optimized",
      pointCloud: "DBSCAN: Stable bounding box verified. Micro-vibration amplitude indicates zero respiration activity.",
      respiratoryRate: "Micro-Doppler chest ventilation band < 4 breaths/min for over 25 consecutive seconds",
      eventLog: JSON.stringify({
        timestamp: "T+5.0s",
        event_type: "respiratory_arrest_warning",
        location: "bed_area",
        velocity: 0.0,
        micro_doppler: "respiratory_suppressed",
        bpm: 3.5,
        confidence: 0.91
      }, null, 2),
      sllmReasoning: "Chain-of-Thought Analysis:\n1. 30-second sliding window shows patient bed position is fully locked.\n2. Chest micro-Doppler amplitude metrics dropped from 15.1 bpm normal cycle to < 4 bpm flatline over 25 seconds.\n3. Cross analysis filters out potential sleeping posture changes.\n\nDiagnosis: [Biometric Warning] Sustained non-respiratory interval during sleep state detected. Medical staff intervention advised.",
      action: "WARNING: Escalating warning logs. Initializing sLLM custom voice-care checkup.",
      iconColor: "text-amber-500",
      activeStatus: "WARNING",
      activeStatusKr: "주의 발생"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden w-full bg-white">
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

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 mb-8 text-sm font-medium border border-blue-200/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Clinical-Grade Edge Intelligence
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Privacy-First AI Safety Infrastructure <br className="hidden md:block" />for Continuous Care
            </h1>
            <p className="text-lg md:text-xl text-blue-600 font-semibold mb-8">
              프라이버시 최우선의 비영상 엣지 AI 인프라
            </p>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-2 max-w-3xl mx-auto font-normal">
              Camera-free, regulation-ready monitoring for healthcare and care environments. <br />
              Seamlessly merging 60GHz MIMO radar arrays <br />
              with on-device sLLM diagnostic reasoning.
            </p>
            <p className="text-sm md:text-base text-slate-500 mb-12">
              의료 및 요양 환경을 위한 카메라 없는 규제 준수 모니터링 시스템. <br className="hidden md:block" />
              60GHz MIMO 레이다 어레이와 온디바이스 소형언어모델(sLLM) 추론 엔진의 완벽한 융합.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#about" className="bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-full text-base font-bold border-2 border-blue-600 transition-all shadow-lg flex items-center justify-center gap-2">
                Explore Solution Overview
                <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#pipeline" className="bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-full text-base font-bold border-2 border-blue-600 transition-all shadow-lg flex items-center justify-center gap-2">
                Inquire Tech Pipeline
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      <PartnerCarousel />

      {/* Problem Section */}
      <section id="about" className="py-24 bg-white border-b border-slate-200">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">The Structural Gaps in Continuous Care</h2>
              <p className="text-blue-600 font-semibold mb-8">현 돌봄 시스템의 구조적 한계와 모니터링 공백</p>
              
              <div className="space-y-8">
                <div>
                  <p className="text-base text-slate-700 leading-relaxed mb-3">
                    Critical safety incidents inevitably emerge during unattended night periods or in high-privacy areas like bathrooms where human inspection and camera surveillance are prohibited. Standard procedures suffer from extreme bottlenecks:
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    구조적인 야간 공백 시간이나 욕실 등 최상의 개인정보 보호가 요구되는 장소에서는 카메라나 대면 점검의 한계로 인해 사고 발생 위험이 방치됩니다. 당사는 이를 데이터 센싱 기술로 안전하게 해결합니다.
                  </p>
                </div>
                
                <div className="flex gap-4 items-start border-l-2 border-red-500 pl-4 py-1">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">CCTV / Camera Invasion</h3>
                    <p className="text-sm text-slate-600 mb-1 font-medium">Violates privacy laws (GDPR compliance boundaries) and faces strict patient and regulatory rejection.</p>
                    <p className="text-xs text-slate-500">카메라 기반 감시는 프라이버시 침해, 조명 의존 및 보호 기관으로부터의 강한 수용성 거부 한계를 갖습니다.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-l-2 border-amber-500 pl-4 py-1">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Wearable Deterioration</h3>
                    <p className="text-sm text-slate-600 mb-1 font-medium">Extremely low continuous adherence rate (&lt;40% compliance) due to frequent battery drainage, discomfort, and skin damage.</p>
                    <p className="text-xs text-slate-500">노인 대상 웨어러블 기기 착용 순응률은 40% 미만으로 충전 미흡 및 수시 미착용 시 일체의 대응 불가 우려를 유발합니다.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-l-2 border-slate-500 pl-4 py-1">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Critical Reaction Delays</h3>
                    <p className="text-sm text-slate-600 mb-1 font-medium">Staffing shortages often expand response loops past critical brain ischemia triage timelines or golden golden hours.</p>
                    <p className="text-xs text-slate-500">단순 정기 순찰/방문형 구조는 사후 확인 프레임워크에 머무르며 신속한 인지 대처를 보장할 수 없습니다.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between border border-slate-800 shadow-2xl relative overflow-hidden h-full min-h-[480px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_250px)]"></div>
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full mb-6 uppercase tracking-wider">
                  System Architecture Paradigm
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight leading-snug">
                  Transitioning from Reaction <br/>to Real-time Prevention.
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  By executing multi-modal sensor aggregation entirely within localized hardware units, HYPER Network eliminates data transfer latency, guards the edge envelope, and enables immediate localized sLLM diagnostic decisions.
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  센서 수집 단계부터 원시 데이터의 무작위 전송을 배제하고, 로컬 하드웨어 엣지 단에서 지능적 신호 분석을 종결하여 프라이버시 오염 없는 예방적 자율 관제 인프라를 공급합니다.
                </p>
              </div>

              <div className="mt-8 border-t border-slate-800 pt-6 grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                <div>
                  <div className="text-2xl font-bold text-blue-400">Zero</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Camera Traps</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">완전 비영상 실시간 보호</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">Under 3s</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">E2E Latency</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">골든타임 이격 최소 제어 완료</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">99.9%</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Edge Uptime</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">로컬 기반 무중단 상시 관제</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">100%</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">On-Device</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">네트워크 단절 환경 안정성 확보</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-400">60GHz</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">MIMO Radar</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">초고가도 생체 모션인지 해상력</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">Sub-mm</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Precision</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">무자각 심박 및 미세 호흡 감지</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION: Clinical-Grade Technical Deep-Dive Showcase */}
      <section id="pipeline" className="py-24 bg-slate-100 border-b border-slate-200">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
              Clinical-Grade Technology & Radar-sLLM Pipeline
            </h2>
            <p className="text-blue-600 font-semibold mb-6">
              의료돌봄의 혁명 <br className="hidden md:block" />
              개인정보보호와 환자의 인권을 지켜주는 비영상 엣지 AI 센싱기술
            </p>
            <p className="text-base text-slate-700 leading-relaxed mb-1">
              Analyze the inner signal flow from physical antenna ADC capture to edge sLLM reasoning steps. Interact with the live telemetry controls to observe structural algorithm adaptation.
            </p>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              안테나 전파 수집부터 소형 언어 모델 추론에 이르는 전단 기술 프로세스를 분석해 보세요. <br className="hidden md:block" />하단의 장치 상태 컨트롤러를 클릭해 맞춤 적용되는 과학적 계산 단계를 실시간 검증할 수 있습니다.
            </p>
          </div>

          {/* Interactive Navigation inside Technical Panel */}
          <div className="flex flex-wrap justify-center mb-10 gap-2 border-b border-slate-200 pb-4">
            <button 
              type="button"
              onClick={() => setActiveTab('pipeline')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'pipeline' ? 'bg-blue-600 text-white shadow-md' : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'}`}
            >
              <Workflow className="w-4 h-4" />
              1. Signal-sLLM Pipeline (신호 처리 파이프라인)
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('resources')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'resources' ? 'bg-blue-600 text-white shadow-md' : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'}`}
            >
              <Cpu className="w-4 h-4" />
              2. Heterogeneous Computing (이기종 자원 배치)
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('planning')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'planning' ? 'bg-blue-600 text-white shadow-md' : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'}`}
            >
              <RadioReceiver className="w-4 h-4" />
              3. Electromagnetic Coverage Simulation (전파 커버리지 3D 시뮬레이터)
            </button>
          </div>

          {/* Content Tab 1: Interactive Signal Pipeline */}
          {activeTab === 'pipeline' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* Telemetry controls (col-4) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="font-extrabold text-slate-900 text-lg mb-2">Simulated Telemetry Source</h4>
                  <p className="text-xs text-slate-500">실시간 가상 원격 데이터 소스 변경</p>
                  <p className="text-xs text-slate-600 mt-2 mb-6 leading-relaxed">
                    Select a systemic state profile to force immediate coordinate shifting, noise floor adjustment, and observe automatic classifier response updates.
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    {Object.keys(telemetryStates).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedState(key)}
                        className={`p-4 rounded-xl text-left border transition-all flex flex-col gap-1 relative overflow-hidden ${selectedState === key ? 'border-blue-600 bg-blue-50/70 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                      >
                        {selectedState === key && (
                          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">
                            SIMULATING
                          </div>
                        )}
                        <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full bg-current ${telemetryStates[key].iconColor}`}></span>
                          {telemetryStates[key].name}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{telemetryStates[key].nameKr}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl text-white border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block mb-2">Embedded Sensor Model Reference</span>
                    <h5 className="font-bold text-sm">Target Hardware Configurations</h5>
                  </div>
                  <div className="mt-4 space-y-2 text-xs">
                    <p className="text-slate-400"><strong className="text-white">Transceiver:</strong> TI-AWR1843 (77GHz FMCW Radar platform) | Infineon BGT60TR13C (60GHz Core module)</p>
                    <p className="text-slate-400"><strong className="text-white">Channel Stack:</strong> 3 Transmit (TX) x 4 Receive (RX) MIMO Array creating 12 virtual point coordinate channels</p>
                    <p className="text-slate-400"><strong className="text-white">Calculated Resolution:</strong> Angle accuracy threshold at 15° with custom micro-range elevation sensitivity</p>
                  </div>
                </div>
              </div>

              {/* Pipeline details output (col-8) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <RadarLiveSpectrum selectedState={selectedState} />
                
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                    <div>
                      <h4 className="font-extrabold text-slate-950 text-xl">Digital Signal & sLLM Decision Matrix</h4>
                      <p className="text-xs text-slate-500">신호 분석 파이프라인 실시간 계산 단계 모니터</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block">CURRENT PIPELINE STATUS</span>
                      <span className={`text-xs font-black uppercase inline-block mt-0.5 px-3 py-1 rounded-full ${
                        selectedState === 'normal' ? 'bg-emerald-100 text-emerald-800' :
                        selectedState === 'standing' ? 'bg-blue-100 text-blue-800' :
                        selectedState === 'apnea' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {telemetryStates[selectedState].activeStatus}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal visual indicator dots representing flow */}
                  <div className="grid grid-cols-5 gap-1 mb-8">
                    {['ADC Capture', '2D FFT Map', 'OS-CFAR Trigger', 'DBSCAN Clusters', 'LLM Inference'].map((label, idx) => (
                      <div key={label} className="text-center">
                        <div className={`h-2 rounded-full mb-2 ${idx < 4 ? 'bg-blue-500' : 'bg-purple-600'}`}></div>
                        <span className="text-[10px] font-bold text-slate-600 block leading-tight">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {/* Step 1 data */}
                    <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/50">
                      <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>STEP 1: Antenna ADC Conversion</span>
                        <span className="text-[10px] text-slate-400 font-normal">Sensing Layer</span>
                      </div>
                      <p className="text-sm font-semibold text-blue-700 font-mono">{telemetryStates[selectedState].adcChirps}</p>
                    </div>

                    {/* Step 2 data */}
                    <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/50">
                      <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>STEP 2: GPU cuFFT 2D Range-Doppler Matrix</span>
                        <span className="text-[10px] text-slate-400 font-normal">Frequency Domain</span>
                      </div>
                      <p className="text-sm font-semibold text-blue-700 font-mono">{telemetryStates[selectedState].rangeDoppler}</p>
                    </div>

                    {/* Step 3 data */}
                    <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/50">
                      <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>STEP 3: Noise Threshold Suppression (OS-CFAR)</span>
                        <span className="text-[10px] text-slate-400 font-normal">Environment Calibration</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 font-mono">{telemetryStates[selectedState].cfarStatus}</p>
                    </div>

                    {/* Step 4 data */}
                    <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/50">
                      <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>STEP 4: DBSCAN Keypoint Localization & Physiology Extraction</span>
                        <span className="text-[10px] text-slate-400 font-normal">Spatial & Biometric Clustered Data</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 mb-1 font-mono">{telemetryStates[selectedState].pointCloud}</p>
                      <p className="text-xs text-slate-500 font-medium">Respiratory Waveform Analysis: <span className="font-mono text-blue-700 font-bold">{telemetryStates[selectedState].respiratoryRate}</span></p>
                    </div>
                  </div>
                </div>

                {/* Structured JSON Parsing and sLLM diagnostics output */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-white font-mono text-xs flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-slate-400 mb-3 text-[10px] font-bold tracking-wider">
                      <span>RADAR EVENT PARSER OUTPUT (JSON)</span>
                      <span>UTF-8 ENCODED</span>
                    </div>
                    <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-blue-400 leading-relaxed font-semibold max-h-[220px]">
                      <code>{telemetryStates[selectedState].eventLog}</code>
                    </pre>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-slate-400 mb-3 text-[10px] font-bold tracking-wider">
                        <span>ON-DEVICE SLLM THINKING PROCESS (CoT)</span>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 h-[220px] overflow-y-auto leading-relaxed text-[11px] select-text">
                        {telemetryStates[selectedState].sllmReasoning}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/10 border-l-4 border-blue-600 p-4 rounded-r-xl">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">AUTOMATED SYSTEM RESPONSE</span>
                  <p className="text-sm font-bold text-slate-800">{telemetryStates[selectedState].action}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Content Tab 2: Heterogeneous Computing & Hardward resource allocation */}
          {activeTab === 'resources' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
            >
              <div className="max-w-3xl mb-10">
                <h4 className="text-xl font-bold text-slate-950 mb-2">Heterogeneous Resource Mapping - NVIDIA Jetson Orin Nano Super</h4>
                <p className="text-slate-600 text-sm">
                  Our embedded software is architecturally segmented to execute on independent localized silicon domains, leaving zero resource gaps for system collision, maximizing memory safety on a constrained 8GB LPDDR5 envelope.
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  단일 8GB 램 환경에서도 시스템 불능이나 메모리 충돌 없이 완벽히 구동하도록 연산 자원을 하드웨어 도메인 단위로 철저히 물리 분리하였습니다.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Domain 1: GPU */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-lg uppercase">Ampere GPU Core</span>
                    <span className="text-xs text-emerald-600 font-bold">Duty: 58-72%</span>
                  </div>
                  <h5 className="font-extrabold text-slate-900 text-base mb-2">Antenna FFT & Spatial Tracking</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Assigned 1024 CUDA cores to execute FFT operations (cuFFT package). Handles Range-Doppler calculation, OS-CFAR calculations, and DBSCAN centroid clusters under 20ms of total processing latency.
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    1024개 쿠다 코어 기반 고속 FFT 및 공간 포인트 클라우드 좌표화 전담 (기존 MCU 200ms 속도를 20ms 이하 수준으로 단축).
                  </p>
                </div>

                {/* Domain 2: NPU/DLA */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-lg uppercase">2x DLA / NPU Core</span>
                    <span className="text-xs text-emerald-600 font-bold">Inference: 20+ t/s</span>
                  </div>
                  <h5 className="font-extrabold text-slate-900 text-base mb-2">sLLM (Llama 3.2 3B INT4)</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Reserved for sLLM and Nvidia Riva speech processes. INT4 quantized weights reduction decreases our RAM footprint overhead by over 70% while guaranteeing safe 1,500ms voice confirmation loops.
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    경량 Llama-3.2-3B 소형 언어 모델 및 Riva STT 음성 연동 전용. INT4 양자화로 메모리 사용률을 70% 절감하며 응답 지연을 완전 통제합니다.
                  </p>
                </div>

                {/* Domain 3: CPU ARM */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-slate-200 text-slate-800 text-[10px] font-bold rounded-lg uppercase">6-Core ARM A78</span>
                    <span className="text-xs text-slate-500 font-bold">Core Load: Nominal</span>
                  </div>
                  <h5 className="font-extrabold text-slate-900 text-base mb-2">System Control & Telemetry Gateway</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Manages core operating system components, local rule filters, alert sequencing logic, MQTT payload encryption (TLS 1.2+ parameters), and remote client dashboard query responses.
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    독점 운영 체제, 임계 규칙 필터링, 로컬 암호화 패키징(TLS 1.2) 및 외부 MQTT 전송 보안망 게이트웨이 완전 관리.
                  </p>
                </div>
              </div>

              {/* Edge AI Quantization Simulator */}
              <EdgeAIModelSandbox />
            </motion.div>
          )}

          {/* Content Tab 3: Electromagnetic Coverage Simulation */}
          {activeTab === 'planning' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <RadarCoveragePlanner />
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-white border-b border-slate-200">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Tech Stack</h2>
            <p className="text-blue-600 font-medium mb-6">시스템 아키텍처 및 AI 학습 파이프라인</p>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Introducing a scalable end-to-end infrastructure from edge devices to the cloud, and an automated MLOps pipeline architecture for continuous performance improvement.
            </p>
            <p className="text-slate-500 max-w-2xl mx-auto text-xs md:text-sm mt-2">
              엣지 디바이스부터 클라우드까지 이어지는 확장 가능한 엔드투엔드 인프라와,<br />
              지속적인 성능 향상을 위한 자동화된 MLOps 파이프라인 구조를 소개합니다.
            </p>
          </div>
          
          <TechStackToggle />

        </motion.div>
      </section>

      {/* Next Generation TI mmWave Radar Technology */}
      <section className="py-24 bg-white border-b border-slate-200">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="lg:w-5/12">
              <span className="text-blue-600 font-bold tracking-wider text-xs md:text-sm uppercase mb-3 block">Underlying Hardware Technology</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Powered by 60/77GHz mmWave</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
                Our sensors utilize bleeding-edge TI FMCW (Frequency-Modulated Continuous Wave) radar technology integrated with advanced MIMO (Multiple Input, Multiple Output) antenna arrays. 
                This enables sub-millimeter precision tracking of human positions, postures, and vitals entirely without optical cameras.
              </p>
              <p className="text-slate-500 text-xs md:text-sm font-medium mb-6">
                최첨단 60GHz 및 77GHz 고해상도 FMCW 레이더 칩을 채택하여, 광학 렌즈 없이도 밀리미터 단위의 정밀한 심박 및 호흡 측정이 가능합니다.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg flex-shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">On-Chip DSP & HWA</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Dedicated C674x DSPs and Hardware Accelerators natively process high-speed FFT operations to stream dense 3D Point Clouds instantly.</p>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-4">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg flex-shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Micro-Doppler Signatures</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Extracts phase shifts from micro-chest displacements, continuously analyzing respiration rate and heart rates through blankets and clothing.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-7/12 w-full grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-900 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
                  <RadioReceiver className="w-24 h-24 text-indigo-500" strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 inline-block border border-indigo-500/30">
                    TI AWR / IWR Architecture
                  </span>
                  <h3 className="text-white text-xl font-bold mb-2">High-Resolution FMCW Processing Pipeline</h3>
                  <div className="h-0.5 w-12 bg-indigo-500 mb-4"></div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span><strong>4RX / 3TX MIMO Arrays</strong> (Rich Point Cloud Generation)</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span><strong>Antenna-on-Package (AoP)</strong> Form Factors</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span><strong>60GHz / 77GHz</strong> Ultra-Wideband Sweep Synthesis</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl text-center">
                <div className="text-3xl font-black text-slate-900 mb-1">Sub-mm</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Accuracy</div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Capable of capturing minute heartbeats.</p>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl text-center">
                <div className="text-3xl font-black text-slate-900 mb-1">Zero</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Blind Spots</div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Unaffected by light, steam, or smoke.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* End-to-End Privacy Architecture */}
      <section id="privacy" className="py-24 bg-slate-50 border-b border-slate-200">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider text-xs md:text-sm uppercase mb-3 block">Data Pipeline & Security</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">End-to-End Privacy-Preserving Architecture</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Our infrastructure is engineered from the silicon up to guarantee zero data breaches. By keeping raw computation at the edge, we enforce absolute privacy in sensitive care environments.
            </p>
            <p className="text-slate-500 max-w-2xl mx-auto text-xs md:text-sm mt-2 font-medium">
              프라이버시 보호 아키텍처: 광학 렌즈 배제 및 엣지 단 컴퓨팅을 통한 제로 데이터 유출 보장
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Visual connecting line for desktop */}
            <div className="hidden md:block absolute top-[45%] left-[10%] right-[10%] h-0.5 bg-slate-200 z-0"></div>

            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative z-10 hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100 mx-auto md:mx-0">
                <RadioReceiver className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center md:text-left">1. Raw Signal Layer</h3>
              <p className="text-xs font-bold text-blue-600 mb-4 text-center md:text-left uppercase">60/77GHz mmWave Radar</p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <EyeOff className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span>No optical lenses or RGB cameras (Camera-Free)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span>Only measures point-cloud reflections & micro-doppler shifts</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium">원시 전파 스캐닝 (광학 데이터 원천 차단)</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl relative z-10 scale-100 md:scale-105 hover:-translate-y-1 transition-transform">
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[10px] uppercase font-black tracking-wider py-1 px-3 rounded-full shadow-lg">
                Core Compute
              </div>
              <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/30 mx-auto md:mx-0">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center md:text-left">2. Edge Inference Layer</h3>
              <p className="text-xs font-bold text-indigo-400 mb-4 text-center md:text-left uppercase">On-Device sLLM Processing</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <BrainCircuit className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Intracapsular matrix processing via INT4 Quantized custom engines</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>Raw data is instantly destroyed after semantic translation</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-400 font-medium">엣지 AI 디바이스 내 로컬 처리 (데이터 외부 전송 없음)</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative z-10 hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 border border-emerald-100 mx-auto md:mx-0">
                <Server className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center md:text-left">3. Cloud & Dispatch</h3>
              <p className="text-xs font-bold text-emerald-600 mb-4 text-center md:text-left uppercase">Anonymized Metadata Event Driven</p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span>Transmits only binary event states (e.g., {"{ fall: true }"}) via AES-256</span>
                </li>
                <li className="flex items-start gap-2">
                  <Workflow className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span>REST API/Webhooks for third-party hospital management systems</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium">암호화된 비식별 메타데이터 및 알림 전송</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enterprise Deployment Scenarios */}
      <section className="py-24 bg-white border-b border-slate-200">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <span className="text-blue-600 font-bold tracking-wider text-xs md:text-sm uppercase mb-3 block">Enterprise Integration</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Seamless Scaling for High-Density Fleets</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
                Whether deploying 50 units in an assisted living facility or scaling to 10,000 sensors across a nationwide smart hospital network, our deeply optimized architecture ensures effortless fleet management, low latency bandwidth, and out-of-the-box integration capabilities.
              </p>
              <p className="text-slate-500 text-xs md:text-sm font-medium mb-10">
                대규모 엔터프라이즈 환경 및 고밀도 병상을 위한 시스템 통합 및 중앙 관제 아키텍처
              </p>
              
              {/* Technical stat bento - moved here and made smaller */}
              <div className="flex flex-row gap-2 w-full lg:max-w-none items-stretch overflow-x-auto sm:overflow-visible no-scrollbar pb-2 sm:pb-0">
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200 shrink-0 basis-auto flex flex-col justify-center">
                  <div className="text-lg xl:text-xl font-black text-slate-900 mb-0.5 whitespace-nowrap">99.99%</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap">SLA Uptime</div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 mt-1 whitespace-nowrap hidden sm:block">Fault-tolerant Mesh</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200 shrink-0 basis-auto flex flex-col justify-center">
                  <div className="text-lg xl:text-xl font-black text-slate-900 mb-0.5 whitespace-nowrap">&lt; 15 KB</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap">Per-Event Payload</div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 mt-1 whitespace-nowrap hidden sm:block">Ultra-low Bandwidth</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200 flex-1 flex justify-between items-center min-w-[200px]">
                  <div className="min-w-0 shrink">
                    <div className="text-sm xl:text-base font-black text-slate-900 mb-0.5 truncate pr-2">Webhooks & REST APIs</div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase truncate">Legacy System Compatible</div>
                  </div>
                  <Workflow className="w-5 h-5 xl:w-6 xl:h-6 text-blue-500 opacity-50 shrink-0" />
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="mt-2 md:mt-0">
                <MetricsChart />
              </div>
            </div>
          </div>

          {/* Core verticals grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Smart Hospitals</h3>
              <p className="text-sm text-slate-600 mb-4">
                Continuous vital sign telemetry (respiration & motion) deployed in open ward density without interfering with existing clinical Wi-Fi networks.
              </p>
              <span className="text-xs font-bold text-slate-400 uppercase">스마트 병원 다인실 모니터링</span>
            </div>
            
            <div className="border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all relative overflow-hidden">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Assisted Living & Care</h3>
              <p className="text-sm text-slate-600 mb-4">
                24/7 autonomous monitoring for fall detection, bed-exit wander risks, and sleep apnea behaviors inside completely private resident rooms.
              </p>
              <span className="text-xs font-bold text-slate-400 uppercase">요양원 야간 집중 돌봄</span>
            </div>

            <div className="border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Single-Person Households</h3>
              <p className="text-sm text-slate-600 mb-4">
                Unobtrusive residential safety net monitoring daily life patterns (ADL) to detect prolonged immobility or solitary emergencies.
              </p>
              <span className="text-xs font-bold text-slate-400 uppercase">독거노인 자택 방문 관리망</span>
            </div>
          </div>
        </motion.div>
      </section>

      <GlobalStrategy />
      {/* Validation */}
      <section id="validation" className="py-24 bg-slate-50">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">Proven in Real-World Environments</h2>
            <p className="text-blue-600 font-semibold mb-6">실제 시니어 요양 기관 다수 적용 성공 사례</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
               whileHover={{ y: -5 }}
               className="text-center p-10 bg-white rounded-3xl border border-slate-200 shadow-sm"
            >
              <div className="text-5xl md:text-6xl font-black text-blue-600 mb-6 drop-shadow-sm">12</div>
              <h4 className="text-lg font-extrabold text-slate-900 mb-2">Live Facilities Deployed</h4>
              <p className="text-sm text-slate-500 font-semibold">12개 의료 서비스 및 시니어 센터 실 구축 도입</p>
            </motion.div>
            
            <motion.div 
               whileHover={{ y: -5 }}
               className="text-center p-10 bg-white rounded-3xl border border-slate-200 shadow-sm"
            >
              <div className="text-5xl md:text-6xl font-black text-emerald-600 mb-6 drop-shadow-sm">1000<span className="text-4xl">+</span></div>
              <h4 className="text-lg font-extrabold text-slate-900 mb-2">Active Beds Monitored</h4>
              <p className="text-sm text-slate-500 font-semibold">1000병상 이상 실시간 무접촉 센싱 연속 감시</p>
            </motion.div>

            <motion.div 
               whileHover={{ y: -5 }}
               className="text-center p-10 bg-white rounded-3xl border border-slate-200 shadow-sm"
            >
              <div className="text-5xl md:text-6xl font-black text-purple-600 mb-6 drop-shadow-sm">95<span className="text-4xl">%</span></div>
              <h4 className="text-lg font-extrabold text-slate-900 mb-2">Operator Satisfaction</h4>
              <p className="text-sm text-slate-500 font-semibold">95% 의료 전문가 및 간호 관계자 신뢰도 입증</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Regulatory Readiness */}
      <section className="py-24 bg-white border-b border-slate-200">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Regulatory & Compliance Readiness</h2>
            <p className="text-blue-600 font-medium mb-6">규제 및 컴플라이언스 완벽 대비</p>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Built with a privacy-by-design, camera-free architecture, structurally aligned with GDPR and European data protection principles.
            </p>
            <p className="text-slate-500 max-w-2xl mx-auto text-xs md:text-sm mt-2">
              GDPR 및 유럽 데이터 보호 원칙에 부합하는 프라이버시 최우선, Non 카메라 아키텍처로 구축되었습니다.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <EyeOff className="w-8 h-8 text-red-500" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">No Image Data</h4>
              <p className="text-xs text-slate-500">시각 정보 수집 없음</p>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <RadioReceiver className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Signal-Based</h4>
              <p className="text-xs text-slate-500">신호 기반 비영상 센싱</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-slate-700" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">GDPR-Aligned</h4>
              <p className="text-xs text-slate-500">GDPR 준수 시스템</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Healthcare Ready</h4>
              <p className="text-xs text-slate-500">의료 환경 적합성</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Competitive Landscape */}
      <section className="py-24 bg-slate-50">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Competitive Landscape</h2>
            <p className="text-blue-600 font-medium mb-6">경쟁 환경 및 차별성</p>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              HYPER-Agent removes the traditional trade-off between privacy protection and continuous monitoring.
            </p>
            <p className="text-slate-500 max-w-2xl mx-auto text-xs md:text-sm mt-2">
              하이퍼 에이전트는 프라이버시 보호와 지속적인 모니터링 사이의 전통적인 타협을 없앴습니다.
            </p>
          </div>

          <div className="overflow-x-auto pb-8">
            <div className="min-w-[800px] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-4 bg-slate-100 border-b border-slate-200 text-sm font-bold text-slate-700 p-6 text-center">
                <div className="text-left font-extrabold text-slate-800">Technical Category (평가 항목)</div>
                <div>CCTV / Camera System</div>
                <div>Standard Wearables</div>
                <div className="text-blue-600 font-black">HYPER Network (HYPER-Agent)</div>
              </div>
              
              <div className="grid grid-cols-4 border-b border-slate-100 p-6 text-center items-center">
                <div className="text-left font-semibold text-slate-900">Privacy Risk<br/><span className="text-xs text-slate-400 font-normal">개인정보침해 위반 여부</span></div>
                <div className="text-red-500 font-bold text-sm">CRITICAL (High)</div>
                <div className="text-orange-500 font-bold text-sm">MODERATE (Medium)</div>
                <div className="text-emerald-600 font-extrabold text-sm bg-emerald-50 py-2 rounded-lg">ZERO RISK (Low)</div>
              </div>

              <div className="grid grid-cols-4 border-b border-slate-100 p-6 text-center items-center bg-slate-50/50">
                <div className="text-left font-semibold text-slate-900">User Compliance Burden<br/><span className="text-xs text-slate-400 font-normal">노인 피험자 거부감 여부</span></div>
                <div className="text-slate-600 font-bold text-sm">None (Passive)</div>
                <div className="text-red-500 font-bold text-sm">SEVERE (High)</div>
                <div className="text-emerald-600 font-extrabold text-sm bg-emerald-50 py-2 rounded-lg">ZERO BURDEN (Contactless)</div>
              </div>

              <div className="grid grid-cols-4 border-b border-slate-100 p-6 text-center items-center">
                <div className="text-left font-semibold text-slate-900">Continuous 24/7 Service<br/><span className="text-xs text-slate-400 font-normal">중단 없는 상시 수집</span></div>
                <div className="text-slate-700 font-bold text-sm">Fully Available</div>
                <div className="text-orange-500 font-bold text-sm">LIMITED (Battery leakage)</div>
                <div className="text-emerald-600 font-extrabold text-sm bg-emerald-50 py-2 rounded-lg">UNINTERRUPTED (24/7)</div>
              </div>

              <div className="grid grid-cols-4 p-6 text-center items-center bg-slate-50/50">
                <div className="text-left font-semibold text-slate-900">Healthcare Suitability<br/><span className="text-xs text-slate-400 font-normal">임상 정밀 의료 적용식</span></div>
                <div className="text-orange-500 font-bold text-sm">RESTRICTED</div>
                <div className="text-orange-500 font-bold text-sm">RESTRICTED</div>
                <div className="text-emerald-600 font-extrabold text-sm bg-emerald-50 py-2 rounded-lg">OPTIMIZED (sLLM CoT)</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Deep Tech Showcase Section */}
      <DeepTechShowcase />

      <Footer />
    </div>
  );
}
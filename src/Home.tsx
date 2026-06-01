import { useState, useEffect, useRef } from 'react';
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
  Navigation
} from 'lucide-react';

import { DeepTechShowcase } from './components/DeepTechShowcase';

interface TelemetryState {
  name: string;
  nameKr: string;
  adcChirps: string;
  rangeDoppler: string;
  cfarStatus: string;
  pointCloud: string;
  respiratoryRate: string;
  eventLog: string;
  sllmReasoning: string;
  action: string;
  iconColor: string;
  activeStatus: string;
  activeStatusKr: string;
}

function RadarLiveSpectrum({ selectedState }: { selectedState: string }) {
  const [dataPoints, setDataPoints] = useState<number[]>(Array(60).fill(0));
  const tickRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current += 1;
      const t = tickRef.current * 0.15;
      
      setDataPoints((prev) => {
        let newVal = 0;
        if (selectedState === 'normal') {
          // Regular sinusoidal breathing with minute heart impulse noise
          newVal = Math.sin(t * 1.6) * 14 + Math.sin(t * 8.0) * 1.5;
        } else if (selectedState === 'standing') {
          // Coarse locomotor noise (high scale movement overlay)
          newVal = Math.sin(t * 4.2) * 18 + Math.cos(t * 9.5) * 14 + (Math.random() - 0.5) * 8;
        } else if (selectedState === 'fall') {
          // Fall profile: initial mild, massive plunge, then static bottom limit
          const cycle = tickRef.current % 100;
          if (cycle < 15) {
            newVal = Math.sin(t * 1.0) * 4 + (Math.random() - 0.5) * 2;
          } else if (cycle >= 15 && cycle < 20) {
            newVal = -38 - (cycle - 15) * 4 + (Math.random() - 0.5) * 12; // Massive acceleration plunge
          } else {
            newVal = (Math.random() - 0.5) * 0.8; // Dead posture static lines
          }
        } else if (selectedState === 'apnea') {
          // Intermittent normal wave then sudden 20s apnea event
          const cycle = tickRef.current % 100;
          if (cycle < 30) {
            newVal = Math.sin(t * 1.6) * 14;
          } else {
            newVal = (Math.random() - 0.5) * 1.0; // Flatlined respiration
          }
        }
        return [...prev.slice(1), newVal];
      });
    }, 55);

    return () => clearInterval(interval);
  }, [selectedState]);

  // Generate target centroid vector based on state
  const getRadarTargets = () => {
    const tick = tickRef.current;
    if (selectedState === 'normal') {
      return [{ x: 140, y: 70, size: 8, label: "Bed Zone Primary (Solid presence)", color: "fill-emerald-500 stroke-emerald-400" }];
    } else if (selectedState === 'standing') {
      // Dynamic moving target tracking bathroom corridor path
      const cycleOffset = (tick % 80) * 1.5;
      return [
        { x: 120 + cycleOffset, y: 100 - cycleOffset * 0.4, size: 6, label: "Corridor Locomotion Segment", color: "fill-blue-500 stroke-blue-400" },
        { x: 120 + cycleOffset - 15, y: 100 - cycleOffset * 0.4 + 5, size: 4, label: "Secondary reflection trail", color: "fill-blue-400/50 stroke-blue-400/30" }
      ];
    } else if (selectedState === 'fall') {
      const cycle = tick % 100;
      if (cycle < 18) {
        return [{ x: 220, y: 80, size: 8, label: "Corridor upright vector", color: "fill-blue-500 stroke-blue-400" }];
      } else {
        return [{ x: 240, y: 140, size: 10, label: "CRITICAL COLLAPSE CENTROID (0.15m level)", color: "fill-red-600 stroke-red-400 animate-pulse" }];
      }
    } else {
      // sleep apnea
      return [{ x: 140, y: 70, size: 8, label: "Bed Area (Apnea Suspended Chest Signal)", color: "fill-amber-500 stroke-amber-400 animate-ping" }];
    }
  };

  const targets = getRadarTargets();

  return (
    <div className="bg-slate-950 text-slate-100 p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-mono text-xs w-full mb-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:16px_16px]"></div>
      
      {/* Visualizer Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
            <span className="text-sm font-black text-slate-100 ml-1">HYPER Real-Time 60GHz Radar Signal Analyzer</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Direct hardware telemetry hook: 3TX x 4RX MIMO Virtual Phase Reconstruction</p>
        </div>
        
        <div className="flex flex-col text-right">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase">HW INTERFACE ENGAGED</span>
          <span className="text-[11px] text-blue-400 font-bold font-mono">SAMPLING RATE: 4000 samples/chirp</span>
        </div>
      </div>

      {/* Grid panels */}
      <div className="relative z-10 grid md:grid-cols-2 gap-6">
        {/* Panel 1: Spacial Scatter Coordinate (2D FFT) */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-200 font-bold uppercase text-[10px] tracking-wider">Angle-of-Arrival (AoA) 2D Spatial Scatter Map</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold">cuFFT Resolution</span>
            </div>
            
            {/* Visual Scatter Coordinate Plot */}
            <div className="relative h-44 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
              {/* Radar Sweep Arc Circles */}
              <div className="absolute bottom-0 w-80 h-80 border border-slate-800/60 rounded-full"></div>
              <div className="absolute bottom-0 w-60 h-60 border border-slate-800/40 rounded-full"></div>
              <div className="absolute bottom-0 w-40 h-40 border border-slate-800/30 rounded-full"></div>
              
              {/* Sector Lines */}
              <div className="absolute bottom-0 w-full h-px bg-slate-800/40"></div>
              <div className="absolute bottom-0 h-44 w-px bg-slate-800/30 left-1/2"></div>
              <div className="absolute bottom-0 h-44 w-px bg-slate-800/20 left-1/4 origin-bottom rotate-[-30deg]"></div>
              <div className="absolute bottom-0 h-44 w-px bg-slate-800/20 right-1/4 origin-bottom rotate-[30deg]"></div>

              {/* Bed zone reference outline */}
              <div className="absolute border border-blue-500/10 bg-blue-500/5 rounded p-1" style={{ left: '25%', top: '30%', width: '45%', height: '45%' }}>
                <span className="text-[8px] text-blue-500/40 absolute top-1 left-1">REGISTERED BED ZONE</span>
              </div>

              {/* Render dynamic targets */}
              {targets.map((tgt, idx) => (
                <div 
                  key={idx}
                  className="absolute transition-all duration-300 ease-out"
                  style={{ left: `${tgt.x}px`, top: `${tgt.y}px` }}
                >
                  <div className={`relative flex items-center justify-center`}>
                    {/* Ring aura */}
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-500/10 opacity-75"></span>
                    <span className={`w-3 h-3 rounded-full border border-white ${tgt.color}`}></span>
                  </div>
                  {/* Small tag */}
                  <div className="absolute top-4 -left-12 bg-slate-950/90 border border-slate-800 text-[8px] text-slate-300 px-1 py-0.5 rounded whitespace-nowrap opacity-80 shadow">
                    {tgt.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-3 flex justify-between text-[9px] text-slate-500">
            <span>Range: 0m to 5m maximum arc</span>
            <span>Elevation cutoff: ±45° aperture mask</span>
          </div>
        </div>

        {/* Panel 2: Micro-Doppler Waveform (Physiological oscillation) */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-200 font-bold uppercase text-[10px] tracking-wider">Sub-mm Phase Displacement (Micro-Doppler Oscillation)</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Chest Wall Expansion</span>
            </div>
            
            {/* Real-time Oscilloscope Grid */}
            <div className="relative h-44 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:10px_10px]"></div>
              
              {/* Center baseline */}
              <div className="absolute w-full h-px bg-slate-800/50 top-1/2"></div>
              
              {/* Draw path */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
                <path
                  d={`M ${dataPoints.map((val, idx) => {
                    const x = (idx / (dataPoints.length - 1)) * 300;
                    const y = 75 - val * 1.5;
                    return `${x} ${y}`;
                  }).join(' L ')}`}
                  fill="none"
                  stroke={
                    selectedState === 'normal' ? "#10b981" : // emerald
                    selectedState === 'standing' ? "#3b82f6" : // blue
                    selectedState === 'apnea' ? "#f59e0b" : // amber
                    "#ef4444" // red
                  }
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-75"
                />
              </svg>

              {/* Live telemetry state overlay alert inside the graph */}
              {selectedState === 'apnea' && tickRef.current % 100 >= 30 && (
                <div className="absolute top-2 left-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[8px] font-bold px-1.5 py-0.5 rounded-md animate-pulse">
                  APNEA ARREST PROTOCOL TIMEOUT ELAPSED (&gt; 20s flatline)
                </div>
              )}

              {selectedState === 'fall' && tickRef.current % 100 >= 20 && (
                <div className="absolute top-2 left-2 bg-red-500/10 border border-red-500/30 text-red-500 text-[8px] font-bold px-1.5 py-0.5 rounded-md animate-pulse">
                  CRITICAL IMPACT PEAK VELOCITY (-2.85 m/s) TRIGGERED
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex justify-between text-[9px] text-slate-500">
            <span>Scale Resolution: ±1.2mm phase depth</span>
            <span>Bandpass filter: 0.1Hz - 2.5Hz optimized</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadarCoveragePlanner() {
  const [ceilingHeight, setCeilingHeight] = useState<number>(2.7);
  const [tiltAngle, setTiltAngle] = useState<number>(35); // degrees from vertical
  const [targetDistance, setTargetDistance] = useState<number>(2.2); // meters on floor from line of sensor
  const [antennaBeamwidth, setAntennaBeamwidth] = useState<number>(80); // degrees total width (e.g. 80° or 120°)
  const [centerFreq, setCenterFreq] = useState<60 | 77>(60); // GHz

  // Physics Calculations
  const directPath = Math.sqrt(Math.pow(ceilingHeight, 2) + Math.pow(targetDistance, 2));
  const fsplBase = centerFreq === 60 ? 68.0 : 70.17;
  const pathLoss = 20 * Math.log10(directPath > 0.1 ? directPath : 0.1) + fsplBase;
  const snrMargin = Math.max(0, 92 - pathLoss); // nominal TX/RX gain assumption
  
  // Calculate Target angle from vertical
  const targetAngleRad = Math.atan(targetDistance / (ceilingHeight > 0.1 ? ceilingHeight : 0.1));
  const targetAngleDeg = targetAngleRad * (180 / Math.PI);

  // Check if target is illuminated
  const halfBeam = antennaBeamwidth / 2;
  const isIlluminated = targetAngleDeg >= (tiltAngle - halfBeam) && targetAngleDeg <= (tiltAngle + halfBeam);

  const rad = (deg: number) => deg * (Math.PI / 180);
  const xStart = ceilingHeight * Math.tan(rad(Math.max(-85, tiltAngle - halfBeam)));
  const xEnd = ceilingHeight * Math.tan(rad(Math.min(85, tiltAngle + halfBeam)));
  const footprintLength = Math.abs(xEnd - xStart);

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm font-sans">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <h4 className="font-extrabold text-slate-900 text-lg">Dynamic Electromagnetic Coverage & FoV Link Simulator</h4>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Calculate electromagnetic field projection, free-space attenuation, and target alignment confidence variables.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Physics Parameters (시뮬레이터 입력값)</div>
          
          {/* Target frequency Toggle */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">Target Frequency Band (주파수 대역)</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button"
                onClick={() => setCenterFreq(60)}
                className={`py-1.5 px-3 rounded-lg text-xs font-black transition-all ${centerFreq === 60 ? 'bg-blue-600 text-white shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'}`}
              >
                60 GHz (V-Band)
              </button>
              <button 
                type="button"
                onClick={() => setCenterFreq(77)}
                className={`py-1.5 px-3 rounded-lg text-xs font-black transition-all ${centerFreq === 77 ? 'bg-blue-600 text-white shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'}`}
              >
                77 GHz (E-Band)
              </button>
            </div>
          </div>

          {/* Ceiling Height */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-700 font-bold mb-1">
              <span>Ceiling Height (천장 높이 H)</span>
              <span className="text-blue-600 font-mono">{ceilingHeight.toFixed(1)}m</span>
            </div>
            <input 
              type="range" 
              min="1.8" 
              max="4.0" 
              step="0.1"
              value={ceilingHeight} 
              onChange={(e) => setCeilingHeight(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Device Tilt Angle */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-700 font-bold mb-1">
              <span>Device Tilt Angle (센서 조준각 α)</span>
              <span className="text-blue-600 font-mono">{tiltAngle}°</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="75" 
              step="5"
              value={tiltAngle} 
              onChange={(e) => setTiltAngle(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Target Distance */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-700 font-bold mb-1">
              <span>Subject Horizontal Distance (피험체 이격 거리 D)</span>
              <span className="text-blue-600 font-mono">{targetDistance.toFixed(1)}m</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="4.5" 
              step="0.1"
              value={targetDistance} 
              onChange={(e) => setTargetDistance(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Antenna Apertures */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">Antenna Aperture Beamwidth (안테나 지향각)</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[40, 80, 120].map((deg) => (
                <button 
                  type="button"
                  key={deg}
                  onClick={() => setAntennaBeamwidth(deg)}
                  className={`py-1 px-2 rounded-lg text-[10px] font-black transition-all ${antennaBeamwidth === deg ? 'bg-slate-800 text-white' : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'}`}
                >
                  {deg}° {deg === 40 ? 'Narrow' : deg === 80 ? 'Mid' : 'Wide'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Spatial Visualization */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 relative">
            <div className="absolute top-3 left-3 bg-slate-900/80 border border-slate-800 text-[9px] text-slate-300 px-2 py-0.5 rounded-md font-mono z-15">
              2D RADIAL projection envelope (사이드 뷰 시뮬레이션)
            </div>

            {/* Dynamic Status Tag inside simulation */}
            <div className={`absolute top-3 right-3 text-[10px] font-bold border px-2 py-0.5 rounded-md z-15 ${
              isIlluminated 
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                : 'border-rose-500/30 bg-rose-500/10 text-rose-400'
            }`}>
              {isIlluminated ? "● ILLUMINATED (조준 범위 포함)" : "▲ OUT OF FIELD-OF-VIEW (벗어남)"}
            </div>

            {/* Cross Section SVG */}
            <div className="relative h-48 flex items-center justify-center overflow-hidden bg-slate-950/90 rounded-xl mt-4">
              <svg className="w-full h-full" viewBox="0 0 500 200">
                {/* Reference Grid lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="180" x2="500" y2="180" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="20" x2="60" y2="180" stroke="#334155" strokeWidth="0.5" />

                {/* Ceiling & Floor Labels */}
                <text x="5" y="16" fill="#475569" className="text-[8px] font-mono">CEILING (천정라인)</text>
                <text x="5" y="192" fill="#475569" className="text-[8px] font-mono">FLOOR LEVEL (바닥면)</text>

                {/* Radar Sensor Mount Unit */}
                <circle cx="60" cy="20" r="7" className="fill-blue-500 stroke-blue-400" />
                <line x1="60" y1="20" x2={60 + Math.sin(rad(tiltAngle)) * 20} y2={20 + Math.cos(rad(tiltAngle)) * 20} stroke="#ffffff" strokeWidth="2.5" />

                {/* Antenna Cone Projection */}
                {(() => {
                  const leftAng = tiltAngle - halfBeam;
                  const rightAng = tiltAngle + halfBeam;
                  const len = 220;
                  const cx1 = 60 + Math.sin(rad(leftAng)) * len;
                  const cy1 = 20 + Math.cos(rad(leftAng)) * len;
                  const cx2 = 60 + Math.sin(rad(rightAng)) * len;
                  const cy2 = 20 + Math.cos(rad(rightAng)) * len;

                  return (
                    <polygon 
                      points={`60,20 ${cx1},${cy1} ${cx2},${cy2}`}
                      className={isIlluminated ? "fill-blue-500/10 stroke-blue-500/20" : "fill-rose-500/5 stroke-rose-500/10"}
                    />
                  );
                })()}

                {/* Target Position */}
                {(() => {
                  const targetX = 60 + targetDistance * 75;
                  const bedY = 180 - 15;

                  return (
                    <g>
                      {/* Bed Base Box */}
                      <rect x={targetX - 22} y={bedY} width="44" height="15" className="fill-slate-800 stroke-slate-700 rounded" />
                      <circle cx={targetX} cy={bedY - 6} r="5" fill={isIlluminated ? "#10b981" : "#475569"} className="transition-all" />
                      <text x={targetX - 16} y={bedY + 11} fill="#94a3b8" className="text-[7px] font-mono font-bold">SUBJECT</text>

                      {/* Connection Dot indicator with Target Line */}
                      <line x1="60" y1="20" x2={targetX} y2={bedY - 6} stroke={isIlluminated ? "#10b981" : "#ef4444"} strokeWidth="1" strokeDasharray="2 2" />
                      <text x={(60 + targetX)/2 - 15} y={(20 + bedY)/2 - 10} fill="#64748b" className="text-[7px] font-mono bg-slate-950">
                        {directPath.toFixed(2)}m
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-center">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[9px] text-slate-500 font-bold block uppercase">Direct Path (R)</span>
              <span className="text-sm font-extrabold text-slate-800 font-mono">{directPath.toFixed(2)} m</span>
              <span className="text-[8px] text-slate-400 block mt-1">직격 전파 거리</span>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[9px] text-slate-500 font-bold block uppercase">Path Loss (FSPL)</span>
              <span className="text-sm font-extrabold text-slate-800 font-mono text-amber-600">{pathLoss.toFixed(1)} dB</span>
              <span className="text-[8px] text-slate-400 block mt-1">자유공간 전파 감쇄</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[9px] text-slate-500 font-bold block uppercase">Signal SNR (Est)</span>
              <span className={`text-sm font-extrabold font-mono ${snrMargin > 15 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {snrMargin.toFixed(1)} dB
              </span>
              <span className="text-[8px] text-slate-400 block mt-1">추정 수신 SNR 마진</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[9px] text-slate-500 font-bold block uppercase">Footprint (W)</span>
              <span className="text-sm font-extrabold text-slate-800 font-mono">{footprintLength.toFixed(1)} m</span>
              <span className="text-[8px] text-slate-400 block mt-1">바닥면 가시 폭</span>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-200/50 rounded-xl p-3 text-[11px] text-slate-700 leading-relaxed">
            <div className="flex gap-2 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1"></div>
              <div>
                <strong>과학적 전파 거동 분석:</strong> 천정 고도 <span className="text-blue-700 font-mono font-extrabold">{ceilingHeight}m</span>의 60GHz 및 77GHz 파장은 
                각각 대기 산소 흡수(Oxygen Absorption) 상 극도 감쇄에 직면합니다. 직격 거리가 <span className="text-blue-700 font-mono font-extrabold">{directPath.toFixed(1)}m</span>일 때, 
                자유공간전파감쇄(FSPL) 수치는 약 <span className="text-blue-700 font-mono font-extrabold">{pathLoss.toFixed(1)} dB</span>로 계산되며, 
                성공적으로 안테나 빔폭 내부(<span className="text-blue-700 font-mono font-extrabold">{antennaBeamwidth}°</span>)에 위치함에 따라 호흡 진폭 센싱 SNR이 최적으로 정렬됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EdgeAIModelSandbox() {
  const [selectedDevice, setSelectedDevice] = useState<string>('orin');
  const [selectedQuant, setSelectedQuant] = useState<string>('int4');
  const [sequenceLength, setSequenceLength] = useState<number>(1024);

  // Configuration sets
  const devices: Record<string, { name: string; nameKr: string; ram: number; tops: number; baseSpeed: number; color: string }> = {
    orin: { 
      name: "NVIDIA Jetson Orin Nano Super", 
      nameKr: "엔비디아 젯슨 오린 나노 (최적 하드웨어)", 
      ram: 8192, // MB
      tops: 40,
      baseSpeed: 45, // tokens/sec at INT4
      color: "bg-emerald-600 border-emerald-500 text-emerald-100"
    },
    rpi: { 
      name: "Raspberry Pi 5 + Hailo HAT", 
      nameKr: "라즈베리 파이 5 엣지 (경량화 하위 호환)", 
      ram: 8192, 
      tops: 13,
      baseSpeed: 9, 
      color: "bg-blue-600 border-blue-500 text-blue-100"
    },
    npu: { 
      name: "Cortex-A78 Dynamic NPU SoC", 
      nameKr: "전용 하이브리드 NPU 스마트 칩셋", 
      ram: 4096, 
      tops: 16,
      baseSpeed: 24, 
      color: "bg-purple-600 border-purple-500 text-purple-100"
    },
    mcu: { 
      name: "ARM Cortex-M7 (Smart MCU Core)", 
      nameKr: "저전력 MCU 단일 코어 (한계 환경)", 
      ram: 1, // 1MB 
      tops: 0.1,
      baseSpeed: 0.5, 
      color: "bg-slate-700 border-slate-600 text-slate-100"
    }
  };

  const quantizations: Record<string, { name: string; desc: string; bits: number; accuracy: number; color: string }> = {
    fp16: { 
      name: "FP16 (Half Precision)", 
      desc: "Pure float16 standard layout weight model", 
      bits: 16, 
      accuracy: 100.0, 
      color: "text-red-600 bg-red-50 border-red-200"
    },
    int8: { 
      name: "INT8 (Quantized)", 
      desc: "Standard 8-bit integer symmetric model", 
      bits: 8, 
      accuracy: 98.6, 
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    int4: { 
      name: "INT4 (AWQ Layer Bound)", 
      desc: "Highly optimized 4-bit activation-aware grouping", 
      bits: 4, 
      accuracy: 97.1, 
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    int2: { 
      name: "INT2 (Binary Experimental)", 
      desc: "Extreme weight-only sub-quantized binary structure", 
      bits: 2, 
      accuracy: 72.5, 
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    }
  };

  const dev = devices[selectedDevice];
  const q = quantizations[selectedQuant];

  // Mathematical Model Simulation
  const modelParameters = 3.0; // 3.0 Billion parameters (Phi-3 / Llama 3.2 scale)
  
  // Weight Size (MB) = Parameters * bits_per_weight / 8 bits_per_byte * 1024 to convert GB scale to MB
  const modelWeightSizeMB = (modelParameters * q.bits / 8) * 1024;
  
  // KV Cache (MB) = Length * layer * heads * block size multiplier
  const kvCacheSizeMB = (sequenceLength * 32 * 32 * 2 * 2) / (1024 * 1024) * (q.bits / 8); 
  const totalRequiredMemory = Math.round(modelWeightSizeMB + kvCacheSizeMB);

  // Constraints Trigger
  const isOutOfMemory = totalRequiredMemory > dev.ram;

  // Latency calculation: Speed proportional to hardware TOPS & bits efficiency
  const quantEfficiency = selectedQuant === 'fp16' ? 0.2 : selectedQuant === 'int8' ? 0.6 : selectedQuant === 'int4' ? 1.0 : 1.6;
  const speedRatio = dev.baseSpeed * quantEfficiency;
  const tokensPerSec = isOutOfMemory ? 0 : Math.round(speedRatio * 10) / 10;
  
  // Total prediction response trigger time (prefill + generate 128 tokens)
  const prefillTimeSec = isOutOfMemory ? 0 : (sequenceLength / (dev.tops * 50 + 20));
  const generateTimeSec = isOutOfMemory ? 0 : (128 / tokensPerSec);
  const totalLatencySec = isOutOfMemory ? 0 : Math.round((prefillTimeSec + generateTimeSec) * 100) / 100;

  // Estimated Power Draw
  const powerWatts = isOutOfMemory ? 0 : Math.round((dev.tops * 0.25 + 5) * 10) / 10;

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm mt-8 font-sans">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
          <h4 className="font-extrabold text-slate-900 text-lg">On-Device Edge AI sLLM Compiler & Quantization Sandbox</h4>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          컴파일러 단의 INT4 AWQ 양자화에 따른 하드웨어 VRAM 최적화 및 토큰 수동 배치 시뮬레이션을 실시간 테스트해 보세요.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Selection side */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Target Host selector */}
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">1. Target Edge Hardware Platform (대상 엣지 단말)</span>
            <div className="flex flex-col gap-2">
              {Object.keys(devices).map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setSelectedDevice(key)}
                  className={`p-3 rounded-xl border text-left transition-all ${selectedDevice === key ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900 text-xs">{devices[key].name}</span>
                    <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {devices[key].ram >= 1024 ? `${devices[key].ram / 1024}GB` : `${devices[key].ram}MB`} RAM
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{devices[key].nameKr}</span>
                    <span className="font-mono text-indigo-600 font-bold">{devices[key].tops} TOPS</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantization precision */}
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">2. LLM Kernel Quantization Precision (양자화 방식 및 비트 크기)</span>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(quantizations).map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setSelectedQuant(key)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${selectedQuant === key ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                >
                  <div className="font-bold text-slate-950 text-xs mb-1">{quantizations[key].name}</div>
                  <div className="text-[9px] text-slate-500 leading-tight mb-2">
                    {quantizations[key].desc}
                  </div>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded inline-block self-start font-mono uppercase ${quantizations[key].color}`}>
                    {quantizations[key].bits}-Bit Core / Acc: {quantizations[key].accuracy}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sliding limit context Window */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-700 font-bold mb-1.5">
              <span>3. Prompt Context Window (입력 컨텍스트 길이)</span>
              <span className="text-indigo-600 font-mono font-bold">{sequenceLength} Tokens</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[512, 1024, 2048].map((v) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setSequenceLength(v)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${sequenceLength === v ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-600'}`}
                >
                  {v} Tokens
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Dynamic Analytics visualization column */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-6 rounded-3xl border border-slate-900 relative overflow-hidden font-mono text-xs">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:14px_14px]"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5">
              <span className="text-slate-300 font-bold text-[10px] tracking-wider uppercase">Edge Dynamic Compiler Metrics</span>
              <span className="text-[9px] text-indigo-400 font-bold uppercase">TRT-LLM ENGINE</span>
            </div>

            {/* Simulated Live CRT terminal line or warn dialog */}
            {isOutOfMemory ? (
              <div className="bg-red-950/80 border border-red-500/30 rounded-2xl p-5 text-red-400 flex flex-col gap-2 my-4 relative animate-pulse">
                <span className="text-sm font-black text-red-500 flex items-center gap-2">
                  ⚠️ [PANIC] SYSTEM MEMORY EXHAUSTED (OOM CRASH)
                </span>
                <p className="text-[11px] leading-relaxed text-red-300">
                  Total required VRAM allocations <span className="font-extrabold text-white">({totalRequiredMemory} MB)</span> exceeds the physical RAM configuration <span className="font-extrabold text-white">({dev.ram} MB)</span> associated with this hardware platform. Quantization fallback recommended.
                </p>
              </div>
            ) : (
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 mb-5 text-slate-300 space-y-3.5">
                <div className="flex justify-between text-[11px] border-b border-slate-800 pb-2">
                  <span>Hardware Core Unit:</span>
                  <span className="text-emerald-400 font-bold">{dev.name}</span>
                </div>

                {/* VRAM allocation progress visual */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>VRAM Memory Saturation Rate:</span>
                    <span>{totalRequiredMemory} MB / {dev.ram} MB ({Math.round((totalRequiredMemory / dev.ram) * 100)}%)</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        (totalRequiredMemory / dev.ram) > 0.85 ? 'bg-red-500' : (totalRequiredMemory / dev.ram) > 0.6 ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (totalRequiredMemory / dev.ram) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                    <span>Weight parameters: {Math.round(modelWeightSizeMB)} MB</span>
                    <span>Sequence KV cache: {Math.round(kvCacheSizeMB)} MB</span>
                  </div>
                </div>

                {/* Accuracy retain score slider */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Compiler Semantic Accuracy Retained:</span>
                    <span className="text-indigo-400 font-bold">{q.accuracy}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-500 rounded-full"
                      style={{ width: `${q.accuracy}%` }}
                    ></div>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-1">
                    Semantic structural divergence from unquantized FP16 baseline model output.
                  </div>
                </div>
              </div>
            )}

            {/* Performance Outcomes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-6">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[9px] text-slate-500 block">Prefill Latency</span>
                <span className="text-sm font-black text-slate-100 font-mono mt-0.5 block">
                  {isOutOfMemory ? "INF Sec" : `${Math.round(prefillTimeSec * 100) / 100}s`}
                </span>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[9px] text-slate-500 block">Gen. Throughput</span>
                <span className="text-sm font-black text-indigo-400 font-mono mt-0.5 block animate-pulse">
                  {isOutOfMemory ? "0 t/s" : `${tokensPerSec} t/s`}
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[9px] text-slate-500 block">Total E2E Latency</span>
                <span className="text-sm font-black text-emerald-400 font-mono mt-0.5 block">
                  {isOutOfMemory ? "FAIL" : `${totalLatencySec}s`}
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[9px] text-slate-500 block">Thermal / Power</span>
                <span className="text-sm font-black text-slate-100 font-mono mt-0.5 block">
                  {isOutOfMemory ? "0.0W" : `${powerWatts} Watt`}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-indigo-900/10 border-l-2 border-indigo-500 p-3 text-[10px] text-slate-400 leading-relaxed rounded-r-lg">
            <strong>엣지 컴파일러 수학적 유도 공식:</strong> sLLM 추론은 파이프라인에서 메모리 대역폭 한계(Memory Bandwidth Bound)에 밀접한 영향을 받습니다. 
            FP16 가중치(6,144 MB) 사용 시 젯슨의 최대 속도는 8 t/s 내외에 국한되나, 자사의 커스텀 <strong className="text-indigo-400">INT4 AWQ 양자화 커널</strong> 컴파일 시 
            VRAM 소요량을 <span className="text-indigo-400 font-bold">{Math.round(modelWeightSizeMB)} MB</span> 수준으로 감축하여 캐시 정렬 및 추론 속도를 <span className="text-emerald-400 font-bold">45 t/s 이상</span>까지 극대화하면서도, 
            97.1%의 수치 정확도 보존력을 달성합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

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
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="flex items-center gap-3">
              <LogoSVG className="w-8 h-8 md:w-10 md:h-10" />
              <LogoText className="text-xl md:text-2xl" />
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#pipeline" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Technical Deep Dive</a>
              <a href="#global" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Global Strategy</a>
              <a href="#privacy" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Privacy & Security</a>
              <a href="#p" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sovereign AI</a>
              <a href="/company" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Company</a>
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
                <a href="#pipeline" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-slate-600">Technical Deep Dive</a>
                <a href="#global" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-slate-600">Global Strategy</a>
                <a href="#privacy" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-slate-600">Privacy & Security</a>
                <a href="#p" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-slate-600">Sovereign AI</a>
                <a href="/company" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-slate-600">Company</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium self-start inline-block text-center">
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

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

      {/* Global Strategy */}
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
              <p className="text-slate-500 text-xs md:text-sm font-medium">
                대규모 엔터프라이즈 환경 및 고밀도 병상을 위한 시스템 통합 및 중앙 관제 아키텍처
              </p>
            </div>
            
            <div className="lg:w-1/2 w-full">
              {/* Technical stat bento */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <div className="text-2xl font-black text-slate-900 mb-1">99.99%</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">SLA Uptime</div>
                  <div className="text-[10px] text-slate-400 mt-1">Fault-tolerant Mesh (고가용성)</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <div className="text-2xl font-black text-slate-900 mb-1">&lt; 15 KB</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Per-Event Payload</div>
                  <div className="text-[10px] text-slate-400 mt-1">Ultra-low Bandwidth (초저대역폭)</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 col-span-2 flex justify-between items-center">
                  <div>
                    <div className="text-lg font-black text-slate-900 mb-1">Webhooks & REST APIs</div>
                    <div className="text-xs font-bold text-slate-500 uppercase">Legacy System Compatible</div>
                  </div>
                  <Workflow className="w-8 h-8 text-blue-500 opacity-50" />
                </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-16 border-t border-slate-800/60 mb-16 px-4">
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

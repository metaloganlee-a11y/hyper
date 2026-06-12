import { useState } from 'react';

export function RadarCoveragePlanner() {
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

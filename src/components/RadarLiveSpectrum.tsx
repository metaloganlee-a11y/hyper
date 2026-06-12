import { useState, useEffect, useRef } from 'react';

export function RadarLiveSpectrum({ selectedState }: { selectedState: string }) {
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

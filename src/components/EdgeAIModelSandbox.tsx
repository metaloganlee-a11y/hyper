import { useState } from 'react';

export function EdgeAIModelSandbox() {
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

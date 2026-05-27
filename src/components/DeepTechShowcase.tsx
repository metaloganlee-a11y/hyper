import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldCheck, Database, Activity, Cpu, Network, Lock, Server } from 'lucide-react';

export function DeepTechShowcase() {
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING SOVEREIGN AI SECURE BOOT...",
    "VERIFYING TPM 2.0 HARDWARE ROOT OF TRUST [OK]",
    "MOUNTING ENCRYPTED NEURAL WEIGHT VOLUME...",
    "LOADING INT4 QUANTIZED LLM KERNEL [3.2B PARAMS]",
    "ESTABLISHING SECURE MQTT TUNNEL TO NATIONAL HEALTH DATACENTER...",
  ]);

  useEffect(() => {
    const newLogs = [
      "INGESTING RADAR POINT CLOUD [48CH]...",
      "RUNNING OS-CFAR THRESHOLD FILTER...",
      "DB-SCAN CLUSTERS DETECTED: 1 SUBJECT",
      "[AI ANALYZING] CONTINUOUS RESPIRATION [15BPM]",
      "[AI ANALYZING] ABSENCE OF MACRO-MOTION: STANDING/FALL EVAL",
      "DIAGNOSTIC: BED-LEVEL PRESENCE CONFIRMED. ZERO RISK.",
      "ENCRYPTING PAYLOAD (AES-256-GCM) -> KOREA SECURE ZONE",
      "TRANSMIT SUCCESS. LATENCY: 12ms",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, `[${new Date().toISOString().split('T')[1].replace('Z', '')}] ${newLogs[i]}`];
        if (next.length > 8) return next.slice(next.length - 8);
        return next;
      });
      i = (i + 1) % newLogs.length;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="p" className="py-32 bg-slate-950 text-white overflow-hidden relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-800/50 mb-6">
              <ShieldCheck className="w-4 h-4" /> Military-Grade Security Architecture
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
              Sovereign AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Data Fabric</span>
            </h2>
            <p className="text-blue-300 font-semibold mb-6 text-lg">국가 데이터 주권과 개인정보를 완벽히 보호하는 독립형 엣지 보안망</p>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Our infrastructure guarantees zero external data leakage. All biometric inferences are strictly processed on-device.
              Only heavily encrypted, non-identifiable meta-diagnostics are federated to Sovereign Government Cloud sectors like the Korean Ministry of Health's closed networks.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Architecture Diagram */}
          <div className="lg:col-span-7 bg-slate-900/60 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-8">
              <Network className="w-5 h-5 text-blue-400" /> Dynamic Telemetry & Secure Federation
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
               {/* Edge Device Node */}
               <div className="w-full md:w-1/3 flex flex-col items-center z-10">
                 <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.3)] flex items-center justify-center relative mb-4">
                    <Activity className="w-10 h-10 text-emerald-400 absolute animate-pulse" />
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">EDGE</div>
                 </div>
                 <h4 className="font-bold text-sm text-slate-200">DR.HYPER Node</h4>
                 <p className="text-[10px] text-slate-500 mt-1 text-center">NVIDIA Orin Nano<br/>Local Llama-3.2 INT4</p>
               </div>

               {/* Pipeline Flow */}
               <div className="w-full md:w-1/3 h-24 md:h-auto flex md:flex-col justify-center items-center relative gap-2">
                 {/* Animated dots line */}
                 <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 hidden md:block z-0"></div>
                 <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-800 -translate-x-1/2 md:hidden z-0"></div>
                 
                 <div className="relative z-10 px-3 py-1.5 bg-slate-950 border border-blue-800 rounded-lg shadow-lg flex items-center gap-1.5">
                   <Lock className="w-3 h-3 text-blue-400" />
                   <span className="text-[9px] font-bold text-blue-400 uppercase">AES-256 Tunnel</span>
                 </div>
                 <div className="flex gap-1 mt-2 hidden md:flex">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                 </div>
               </div>

               {/* Cloud / Sovereign Node */}
               <div className="w-full md:w-1/3 flex flex-col items-center z-10">
                 <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.3)] flex items-center justify-center relative mb-4">
                    <Database className="w-10 h-10 text-blue-400" />
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">Gov / Hospital</div>
                 </div>
                 <h4 className="font-bold text-sm text-slate-200">Sovereign Data Center</h4>
                 <p className="text-[10px] text-slate-500 mt-1 text-center">K-Hospital network / <br/>Ministry of Health</p>
               </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: "Data Retention", val: "0.0 B", desc: "Local user data" },
                 { label: "Uptime", val: "99.99%", desc: "Failover active" },
                 { label: "Crypto", val: "TLS 1.3", desc: "Forward Secrecy" },
                 { label: "Audit", val: "HIPAA/GDPR", desc: "Compliant" },
               ].map((stat, i) => (
                 <div key={i} className="text-center">
                   <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">{stat.label}</span>
                   <span className="block text-lg font-black text-slate-200 mb-0.5">{stat.val}</span>
                   <span className="block text-[9px] text-slate-600">{stat.desc}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="lg:col-span-5 h-[420px] bg-[#0a0a0c] rounded-3xl border border-slate-800/80 shadow-2xl p-6 flex flex-col font-mono relative overflow-hidden group">
            {/* Glossy top reflection */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 tracking-wider">DR.HYPER // EDGE KERNEL</span>
              <div className="ml-auto flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 text-[10px] sm:text-xs text-emerald-400/80 pr-2 custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span className={log.includes("SECURE") || log.includes("ENCRYPTING") ? "text-blue-400 font-semibold" : log.includes("ZERO RISK") ? "text-emerald-300 font-bold" : ""}>
                    {log}
                  </span>
                </div>
              ))}
              <div className="flex gap-2 animate-pulse mt-2">
                <span className="text-slate-600 select-none">&gt;</span>
                <span className="text-slate-400 w-2 h-4 bg-slate-400 block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

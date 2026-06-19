import { motion } from 'motion/react';

export function PageSkeleton() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-white font-sans w-full fixed top-0 left-0 z-[100] pointer-events-none overflow-hidden"
    >
      {/* Skeleton Nav */}
      <div className="h-20 border-b border-slate-200/50 flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-full animate-pulse"></div>
          <div className="w-24 md:w-32 h-6 bg-slate-100 rounded animate-pulse"></div>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="w-20 h-4 bg-slate-100 rounded animate-pulse"></div>
          ))}
          <div className="w-28 h-10 bg-slate-100 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Skeleton Hero */}
      <div className="pt-32 pb-20 md:pt-44 md:pb-32 px-4 max-w-7xl mx-auto bg-white flex flex-col items-center">
        <div className="w-40 h-8 bg-blue-50/50 rounded-full mb-8 animate-pulse"></div>
        <div className="w-full max-w-3xl h-12 md:h-16 bg-slate-100 rounded-lg mb-4 animate-pulse"></div>
        <div className="w-4/5 max-w-2xl h-12 md:h-16 bg-slate-100 rounded-lg mb-8 animate-pulse"></div>
        
        <div className="w-3/5 max-w-xl h-4 bg-slate-50 rounded mb-3 animate-pulse"></div>
        <div className="w-1/2 max-w-lg h-4 bg-slate-50 rounded mb-10 animate-pulse"></div>
        
        <div className="flex gap-4 justify-center">
          <div className="w-40 h-14 bg-slate-100 rounded-full animate-pulse"></div>
          <div className="w-40 h-14 bg-slate-100 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Grid section below */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
         <div className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
         <div className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
      </div>
    </motion.div>
  );
}

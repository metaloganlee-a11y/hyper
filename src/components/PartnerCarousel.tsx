import React from 'react';
import { Building2, Landmark, ShieldCheck, Activity, Cpu, Network, Database, Lock, Hospital, Users, Briefcase, Stethoscope } from 'lucide-react';

const row1Partners = [
  { name: 'HYU Holdings', src: '/logos/logo1.png' },
  { name: 'TIPS Korea', src: '/logos/logo2.png' },
  { name: 'Incheon Center', src: '/logos/logo3.png' },
  { name: 'KIBO', src: '/logos/logo4.png' },
  { name: 'Y&ARCHER', src: '/logos/logo5.png' },
  { name: 'Gwangju Tech Holdings', src: '/logos/logo6.png' },
  { name: 'KOPTI', src: '/logos/logo7.png' },
];

const row2Partners = [
  { name: 'Gyeonggi Transport', src: '/logos/logo8.png' },
  { name: 'Gyeonggi Housing', src: '/logos/logo9.png' },
  { name: 'Yangju City', src: '/logos/logo10.png' },
  { name: 'KOVWA', src: '/logos/logo11.png' },
  { name: 'Korea Business Angels', src: '/logos/logo12.png' },
  { name: 'Ewha Womans Univ.', src: '/logos/logo13.png' },
  { name: 'Gwacheon City', src: '/logos/logo14.png' },
  { name: 'OpenKnowl', src: '/logos/logo15.png' },
  { name: 'KOSME', src: '/logos/logo16.png' },
  { name: 'NIPA', src: '/logos/logo17.png' },
  { name: 'Ministry of Health', src: '/logos/logo18.png' },
  { name: 'KRA', src: '/logos/logo19.png' },
];

export function PartnerCarousel() {
  return (
    <section className="h-[250px] w-full bg-slate-50 border-y border-slate-200 overflow-hidden flex flex-col justify-center gap-6 relative">
      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
      
      {/* Row 1 */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {/* We duplicate the array to visually loop indefinitely */}
        <div className="flex px-3 gap-6">
          {row1Partners.map((partner, i) => (
            <div key={`r1-a-${i}`} className="flex-none">
              <div className="flex items-center justify-center gap-3 bg-white px-6 py-4 w-48 h-20 rounded-2xl shadow-sm border border-slate-100 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:-translate-y-1">
                <img src={partner.src} alt={partner.name} className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex px-3 gap-6" aria-hidden="true">
          {row1Partners.map((partner, i) => (
            <div key={`r1-b-${i}`} className="flex-none">
              <div className="flex items-center justify-center gap-3 bg-white px-6 py-4 w-48 h-20 rounded-2xl shadow-sm border border-slate-100 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:-translate-y-1">
                <img src={partner.src} alt={partner.name} className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      {/* By using animate-marquee reverse, we make it flow backwards or we can use animate-marquee-reverse */}
      <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] items-center">
        <div className="flex px-3 gap-6">
          {row2Partners.map((partner, i) => (
            <div key={`r2-a-${i}`} className="flex-none">
              <div className="flex items-center justify-center gap-3 bg-white px-6 py-4 w-48 h-20 rounded-2xl shadow-sm border border-slate-100 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:-translate-y-1">
                <img src={partner.src} alt={partner.name} className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex px-3 gap-6" aria-hidden="true">
          {row2Partners.map((partner, i) => (
            <div key={`r2-b-${i}`} className="flex-none">
              <div className="flex items-center justify-center gap-3 bg-white px-6 py-4 w-48 h-20 rounded-2xl shadow-sm border border-slate-100 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:-translate-y-1">
                <img src={partner.src} alt={partner.name} className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
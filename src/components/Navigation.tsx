import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoSVG, LogoText } from './Logo';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
  );
}

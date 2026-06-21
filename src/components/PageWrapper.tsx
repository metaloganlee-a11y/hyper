import { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { PageSkeleton } from './PageSkeleton';

export function PageWrapper({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Whenever location changes, trigger a subtle loading state
    setIsLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms skeleton time for polished perceived performance
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <PageSkeleton key="skeleton" />}
      </AnimatePresence>
      <div style={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.4s ease-out' }}>
        {children}
      </div>
    </>
  );
}

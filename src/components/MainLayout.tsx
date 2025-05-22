'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Skip navbar and footer for admin routes
  if (pathname?.startsWith('/admin')) {
    return <div className="w-full overflow-x-hidden">{children}</div>;
  }
  
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
} 
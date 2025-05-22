import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/providers/AuthProvider';
import ToastProvider from '@/components/ToastProvider';
import MainLayout from '@/components/MainLayout';

// Load Inter with more weights for better typography
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'GetMedInfo - Medical Information Resource',
  description: 'Detailed information about medicines, including composition, dosage, uses, side effects, and precautions.',
  keywords: 'medicine, medical information, drugs, healthcare, medicine database',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-gray-800 bg-white overflow-x-hidden w-full`}>
        <AuthProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen max-w-full">
              <MainLayout>
                {children}
              </MainLayout>
            </div>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

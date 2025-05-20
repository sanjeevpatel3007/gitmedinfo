import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/providers/AuthProvider';
import ToastProvider from '@/components/ToastProvider';
import MainLayout from '@/components/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GetMedInfo - Medical Information Resource',
  description: 'Detailed information about medicines, including composition, dosage, uses, side effects, and precautions.',
  keywords: 'medicine, medical information, drugs, healthcare, medicine database',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <AuthProvider>
          <ToastProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

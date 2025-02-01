import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mohamed Saber',
  description:
    'Mohamed Saber | Saber - Software Engineer specialized in Frontend and Mobile Development',
  keywords: [
    'Mohamed Saber',
    'Frontend Engineer',
    'Software Engineer',
    'UI/UX',
    'Web Development',
    'Mobile Development',
    'Embedded AI',
  ],
  authors: [{ name: 'Mohamed Saber' }],
  icons: {
    icon: '/images/icon.png',
    apple: '/images/icon.png',
  },
  openGraph: {
    title: 'Mohamed Saber - Software Engineer',
    description:
      'Mohamed Saber | Saber - Software Engineer specialized in Frontend and Mobile Development',
    url: 'https://msaber.tech',
    siteName: 'Mohamed Saber',
    images: [
      {
        url: '/images/icon.png',
        width: 1200,
        height: 630,
        alt: 'Mohamed Saber - Frontend Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistMono.className}>
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

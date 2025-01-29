import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

// Load Geist Mono font
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mohamed Saber',
  description:
    'Mohamed Saber | Saber - Frontend Engineer crafting beautiful UIs for web & mobile',
  icons: {
    icon: '/images/icon.png',
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
        <main>{children}</main>
      </body>
    </html>
  );
}

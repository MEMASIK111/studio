import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppProviders from '@/components/AppProviders';
import { APP_NAME } from '@/lib/constants';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'], 
  display: 'swap', 
  variable: '--font-inter' 
});

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin', 'cyrillic'], 
  display: 'swap', 
  variable: '--font-cormorant-garamond',
  weight: ['400', '500', '600', '700']
});


export const metadata: Metadata = {
  title: `${APP_NAME} - Доставка еды в Каспийске`,
  description: `Онлайн-заказ еды из ${APP_NAME}. Пицца, роллы, основные блюда и многое другое с доставкой по Каспийску.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${cormorantGaramond.variable} font-body antialiased bg-background`}>
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppProviders from '@/components/AppProviders';
import { APP_NAME } from '@/lib/constants';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'], 
  display: 'swap', 
  variable: '--font-inter' 
});

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin', 'cyrillic'], 
  display: 'swap', 
  variable: '--font-playfair-display',
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
      <body className={`${inter.variable} ${playfairDisplay.variable} font-body antialiased bg-background`}>
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}

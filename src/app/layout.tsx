import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppProviders from '@/components/AppProviders';
import { APP_NAME } from '@/lib/constants';
import BottomNavBar from '@/components/layout/BottomNavBar';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background pb-16 md:pb-0">
        <AppProviders>
          {children}
          <Toaster />
          <BottomNavBar />
        </AppProviders>
      </body>
    </html>
  );
}

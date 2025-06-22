import type { Metadata } from 'next';
import { Roboto_Flex, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppProviders from '@/components/AppProviders';
import { APP_NAME } from '@/lib/constants';

const robotoFlex = Roboto_Flex({ subsets: ['latin'], display: 'swap', variable: '--font-roboto-flex' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair-display' });


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
      <body className={`${robotoFlex.variable} ${playfairDisplay.variable} font-body antialiased bg-background`}>
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}

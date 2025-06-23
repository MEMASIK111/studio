// src/components/layout/CallFab.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, X } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '@/lib/constants';
import WhatsappIcon from '../icons/WhatsappIcon';
import Link from 'next/link';

export default function CallFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Pop-up window for contact options */}
        <div
          className={`
            absolute bottom-full right-0 mb-4 flex w-64 origin-bottom-right flex-col gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-2xl transition-all duration-300 ease-out
            ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0 pointer-events-none'}
          `}
        >
          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md p-3 text-sm font-medium transition-colors hover:bg-muted"
            onClick={() => setIsOpen(false)}
          >
            <WhatsappIcon className="h-6 w-6 text-green-500" />
            <span>Написать в WhatsApp</span>
          </Link>
          <Link
             href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
            className="flex items-center gap-3 rounded-md p-3 text-sm font-medium transition-colors hover:bg-muted"
            onClick={() => setIsOpen(false)}
          >
            <Phone className="h-6 w-6 text-primary" />
            <span>{PHONE_NUMBER}</span>
          </Link>
        </div>

        {/* Main Floating Action Button */}
        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-lg transition-transform duration-300 ease-out hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Открыть контакты"
        >
          {/* Animate between Phone and X icons */}
          <Phone className={`h-8 w-8 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
          <X className={`h-8 w-8 absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`} />
        </Button>
      </div>
    </div>
  );
}

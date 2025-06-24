'use client';

import { cn } from '@/lib/utils';

export default function AnimatedHamburgerIcon({ open }: { open: boolean }) {
  const line = `h-0.5 w-5 bg-current transition-all duration-300`;
  return (
    <div className="relative w-6 h-6">
      <span
        className={cn(
          `absolute top-[6px]`,
          line,
          open && `translate-y-2 rotate-45`
        )}
      />
      <span
        className={cn(
          `absolute top-1/2 -translate-y-1/2`,
          line,
          open && `opacity-0`
        )}
      />
      <span
        className={cn(
          `absolute bottom-[6px]`,
          line,
          open && `-translate-y-2 -rotate-45`
        )}
      />
    </div>
  );
}

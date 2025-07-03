// src/app/admin/layout.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, LayoutDashboard, Utensils } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    logout();
    router.push('/admin/login');
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Дашборд', icon: LayoutDashboard },
    { href: '/admin', label: 'Управление меню', icon: Utensils },
  ];

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard">
                <h1 className="text-xl font-bold text-primary">{APP_NAME} Admin</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                 <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center gap-2 text-sm font-medium transition-colors",
                        pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">Выйти</Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

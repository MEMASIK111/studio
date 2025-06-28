'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, User, Mail, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <Card className="w-full max-w-lg shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-primary">Ваш профиль</CardTitle>
            <CardDescription>Здесь вы можете посмотреть информацию о вашем аккаунте.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="flex-grow">
                <p className="text-sm text-muted-foreground">Имя</p>
                <p className="font-medium text-foreground">{user.displayName || 'Не указано'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="flex-grow">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            <Button onClick={handleLogout} className="w-full mt-4">
              <LogOut className="mr-2 h-4 w-4" />
              Выйти из аккаунта
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

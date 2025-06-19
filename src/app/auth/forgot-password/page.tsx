
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline text-primary">Восстановление пароля</CardTitle>
            <CardDescription>Введите ваш email, чтобы получить ссылку для сброса пароля.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <Button type="submit" className="w-full" disabled>Отправить ссылку (в разработке)</Button>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-base text-muted-foreground">
              Вспомнили пароль?{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Войти
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

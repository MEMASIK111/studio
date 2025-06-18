
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline text-primary">Вход в аккаунт</CardTitle>
            <CardDescription>Введите ваши данные для входа</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
             <div className="flex items-center justify-between text-sm">
              {/* <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me">Запомнить меня</Label>
              </div> */}
              <Link href="/auth/forgot-password" className="text-primary hover:underline">
                Забыли пароль?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled>Войти (в разработке)</Button>
          </CardContent>
          <CardFooter className="text-center flex-col">
            <p className="text-sm text-muted-foreground">
              Нет аккаунта?{' '}
              <Link href="/auth/register" className="text-primary hover:underline font-medium">
                Зарегистрироваться
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

'use client';
import { Button } from '@/components/ui/button';
import { UbicatitoIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/use-user';

export default function LoginPage() {
  const { user, login, isLoading } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  if (isLoading || user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen bg-background">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="flex items-center gap-4">
          <UbicatitoIcon className="w-16 h-16" />
          <h1 className="text-3xl font-bold font-headline text-primary">Ubicatito</h1>
        </div>
        <p className="text-muted-foreground max-w-sm">
          Ingresa con tu correo electrónico para continuar. Si eres administrador, tendrás acceso a funciones especiales.
        </p>
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-left">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu.correo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Ingresar
          </Button>
        </form>
      </div>
    </main>
  );
}

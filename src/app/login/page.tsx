'use client';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { FcfmIcon } from '@/components/icons';
import { GoogleIcon } from '@/components/google-icon';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { isAdmin } from '@/lib/admin';

export default function LoginPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleSignIn = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (user && firestore) {
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          role: isAdmin(user.email) ? 'administrator' : 'student'
        }, { merge: true });
      }

    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  if (isUserLoading || user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen bg-background">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center gap-4">
            <FcfmIcon className="w-12 h-12 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-primary">FCFM Assist</h1>
        </div>
        <p className="text-muted-foreground">
          Inicia sesión para comenzar a chatear.
        </p>
        <Button onClick={handleSignIn} variant="outline" className="gap-2">
          <GoogleIcon className="w-5 h-5" />
          Iniciar sesión con Google
        </Button>
      </div>
    </main>
  );
}

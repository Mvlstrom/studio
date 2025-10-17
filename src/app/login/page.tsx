'use client';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { FcfmIcon } from '@/components/icons';
import { GoogleIcon } from '@/components/google-icon';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
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
    } else if (!isUserLoading && !user && auth) {
      // If not loading, no user, and auth is available, sign in anonymously
      signInAnonymously(auth).catch((error) => {
        console.error('Error signing in anonymously:', error);
      });
    }
  }, [user, isUserLoading, router, auth]);

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      
      if (googleUser && firestore) {
        const userRef = doc(firestore, "users", googleUser.uid);
        await setDoc(userRef, {
          id: googleUser.uid,
          email: googleUser.email,
          name: googleUser.displayName,
          role: isAdmin(googleUser.email) ? 'administrator' : 'student'
        }, { merge: true });
      }

    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  // Show a loading indicator while checking auth state or if a user session exists
  if (isUserLoading || user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Render the login page content
  return (
    <main className="flex items-center justify-center h-screen bg-background">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="flex items-center gap-4">
            <FcfmIcon className="w-12 h-12 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-primary">FCFM Assist</h1>
        </div>
        <p className="text-muted-foreground max-w-sm">
          Has iniciado sesión como invitado. Para acceder a funciones de administrador, inicia sesión con Google.
        </p>
        <Button onClick={handleGoogleSignIn} variant="outline" className="gap-2">
          <GoogleIcon className="w-5 h-5" />
          Iniciar sesión con Google para Administradores
        </Button>
      </div>
    </main>
  );
}

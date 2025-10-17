'use client';
import { Chat } from '@/components/chat';
import { Header } from '@/components/header';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If there's no user object even after loading, it might be an anonymous user
  // We can let them access the chat. The header will adapt based on user state.
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col flex-1">
        <Chat />
      </main>
    </div>
  );
}

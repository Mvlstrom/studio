import { Chat } from '@/components/chat';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col flex-1">
        <Chat />
      </main>
    </div>
  );
}

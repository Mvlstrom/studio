'use client';
import { Button } from '@/components/ui/button';
import { FcfmIcon } from '@/components/icons';
import { useAuth, useUser } from '@/firebase';
import { DataEditor } from './data-editor';
import { isAdmin } from '@/lib/admin';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();
  // An admin is a non-anonymous user whose email is in the admin list
  const userIsAdmin = user && !user.isAnonymous && isAdmin(user?.email);

  const handleSignOut = () => {
    if (auth) {
      auth.signOut();
      router.push('/login');
    }
  };

  const handleSignIn = () => {
    router.push('/login');
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-primary text-primary-foreground md:px-6">
      <div className="flex items-center gap-3">
        <FcfmIcon className="w-8 h-8" />
        <h1 className="text-xl font-semibold font-headline tracking-tight">FCFM Assist</h1>
      </div>
      <div className="flex items-center gap-4">
        {userIsAdmin && <DataEditor />}
        {user && !user.isAnonymous ? (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? 'Usuario'} />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" size="sm" onClick={handleSignIn} className="gap-2 text-primary bg-primary-foreground hover:bg-primary-foreground/90">
            <LogIn className="w-4 h-4" />
            Admin Login
          </Button>
        )}
      </div>
    </header>
  );
}

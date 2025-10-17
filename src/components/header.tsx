'use client';
import { Button } from '@/components/ui/button';
import { FcfmIcon } from '@/components/icons';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function Header() {
  const { toast } = useToast();
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-primary text-primary-foreground md:px-6">
      <div className="flex items-center gap-3">
        <FcfmIcon className="w-8 h-8" />
        <h1 className="text-xl font-semibold font-headline tracking-tight">FCFM Assist</h1>
      </div>
      <Button
        variant="outline"
        size="sm"
        className={cn(
            'text-primary bg-primary-foreground hover:bg-primary-foreground/90',
            'dark:text-primary-foreground dark:bg-primary dark:hover:bg-primary/90'
        )}
        onClick={() => {
          toast({
            title: 'Función de Administrador',
            description: 'La carga de archivos solo está disponible para administradores.',
          });
        }}
      >
        <Upload className="w-4 h-4 mr-2" />
        Cargar Datos
      </Button>
    </header>
  );
}

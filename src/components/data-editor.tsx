'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { fcfmData } from '@/lib/fcfm-data';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


export function DataEditor() {
  const [data, setData] = useState(fcfmData);
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, you'd call an action to save this to a database or file.
    // For this demo, we'll just show a toast.
    toast({
        title: 'Datos Guardados',
        description: 'La información del chatbot ha sido actualizada (simulado).',
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'text-primary bg-primary-foreground hover:bg-primary-foreground/90',
            'dark:text-primary-foreground dark:bg-primary dark:hover:bg-primary/90'
          )}
        >
          <Upload className="w-4 h-4 mr-2" />
          Cargar Datos
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-1/2 lg:w-1/3">
        <SheetHeader>
          <SheetTitle>Editar Datos del Chatbot</SheetTitle>
          <SheetDescription>
            Aquí puedes editar la información base que utiliza el chatbot para responder.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 h-full flex flex-col">
            <Textarea 
                className="h-full resize-none"
                value={data}
                onChange={(e) => setData(e.target.value)}
            />
        </div>
        <SheetFooter>
            <SheetClose asChild>
                <Button type="submit" onClick={handleSave}>Guardar Cambios</Button>
            </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

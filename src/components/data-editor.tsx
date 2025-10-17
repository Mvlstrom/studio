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
import { Textarea } from '@/components/ui/textarea';
import { FileUp, Upload } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function DataEditor() {
  const [instructions, setInstructions] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    if (!file) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Por favor, selecciona un archivo para subir.',
        })
        return;
    }

    // In a real app, you'd call an action to upload the file and save the instructions.
    console.log({
        file: file.name,
        instructions,
    })

    toast({
        title: 'Datos Guardados',
        description: `El archivo ${file.name} ha sido subido con tus instrucciones (simulado).`,
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
      <SheetContent className="w-full md:w-1/2 lg:w-1/3 flex flex-col">
        <SheetHeader>
          <SheetTitle>Subir y Describir Datos</SheetTitle>
          <SheetDescription>
            Sube un archivo (ej. Excel, CSV, TXT) y proporciona instrucciones sobre cómo el chatbot debe utilizar su contenido.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 flex-1 flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="file">Archivo</Label>
                <Input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
            <div className="grid w-full gap-1.5 h-full">
                <Label htmlFor="instructions">Instrucciones de uso</Label>
                <Textarea 
                    id="instructions"
                    placeholder="Ej: 'Usa la columna 'Nombre' para identificar al estudiante y la columna 'Sección' para saber su curso.'"
                    className="h-full resize-none"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />
            </div>
        </div>
        <SheetFooter>
            <SheetClose asChild>
                <Button variant="outline">Cancelar</Button>
            </SheetClose>
            <Button type="submit" onClick={handleSave}>
                <FileUp className="w-4 h-4 mr-2" />
                Guardar y Subir
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

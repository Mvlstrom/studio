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
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeFirebase } from '@/firebase';


export function DataEditor() {
  const [instructions, setInstructions] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Por favor, selecciona un archivo para subir.',
      });
      return;
    }

    setIsUploading(true);
    toast({
      title: 'Subiendo archivo...',
      description: `Por favor, espera mientras se sube ${file.name}.`,
    });

    try {
      const { storage } = initializeFirebase();
      const storageRef = ref(storage, `uploads/${file.name}`);
      
      await uploadBytes(storageRef, file, {
        customMetadata: {
          instructions: instructions,
        }
      });

      toast({
        title: '¡Archivo subido con éxito!',
        description: `El archivo ${file.name} ha sido guardado.`,
      });
      setFile(null);
      setInstructions('');
      // Consider closing the sheet upon success
    } catch (error) {
      console.error("File upload error:", error);
      toast({
        variant: 'destructive',
        title: 'Error al subir el archivo',
        description: 'Hubo un problema al subir el archivo. Revisa la consola para más detalles.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
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
                <Input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} disabled={isUploading} />
            </div>
            <div className="grid w-full gap-1.5 h-full">
                <Label htmlFor="instructions">Instrucciones de uso</Label>
                <Textarea 
                    id="instructions"
                    placeholder="Ej: 'Usa la columna 'Nombre' para identificar al estudiante y la columna 'Sección' para saber su curso.'"
                    className="h-full resize-none"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    disabled={isUploading}
                />
            </div>
        </div>
        <SheetFooter>
            <SheetClose asChild>
                <Button variant="outline" disabled={isUploading}>Cancelar</Button>
            </SheetClose>
            <Button type="submit" onClick={handleSave} disabled={isUploading}>
                <FileUp className="w-4 h-4 mr-2" />
                {isUploading ? 'Subiendo...' : 'Guardar y Subir'}
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

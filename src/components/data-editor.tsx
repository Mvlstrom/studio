'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';
import { updateData } from '@/app/actions';
import { Input } from './ui/input';

export function DataEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [instructions, setInstructions] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSave = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No se ha seleccionado ningún archivo',
        description: 'Por favor, selecciona un archivo para subir.',
      });
      return;
    }

    setIsSaving(true);
    toast({
      title: 'Procesando archivo...',
      description: 'Por favor, espera mientras se leen los datos.',
    });

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target?.result as string;
      
      // We can combine instructions and file content if needed
      const fullData = `Instrucciones: ${instructions}\n\n--- Contenido del archivo ---\n${fileContent}`;

      try {
        await updateData(fullData);
        toast({
          title: '¡Datos actualizados con éxito!',
          description: 'El chatbot ahora usará la nueva información.',
        });
      } catch (error) {
        console.error('Data saving error:', error);
        toast({
          variant: 'destructive',
          title: 'Error al guardar los datos',
          description: 'Hubo un problema al actualizar los datos.',
        });
      } finally {
        setIsSaving(false);
        // Reset state after saving
        setFile(null);
        setInstructions('');
        if(fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'Error al leer el archivo',
        description: 'No se pudo leer el contenido del archivo seleccionado.',
      });
      setIsSaving(false);
    };

    reader.readAsText(file); // Reads the file as plain text
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Cargar Datos
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-2/3 lg:w-1/2 flex flex-col">
        <SheetHeader>
          <SheetTitle>Cargar Nuevos Datos para el Chatbot</SheetTitle>
          <SheetDescription>
            Sube un archivo con la información y proporciona instrucciones. Los datos se cargarán en la memoria de la aplicación.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 flex-1 flex flex-col gap-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">1. Selecciona el archivo</Label>
            <Input id="file" type="file" ref={fileInputRef} onChange={handleFileChange} />
            {file && <p className="text-sm text-muted-foreground mt-2">Archivo seleccionado: {file.name}</p>}
          </div>
          <div className="grid w-full gap-1.5 h-full">
            <Label htmlFor="instructions">2. Instrucciones de uso</Label>
            <Textarea
              id="instructions"
              placeholder="Ej: Este archivo contiene los horarios del día Martes 15 de Agosto. Responde únicamente con esta información."
              className="h-full resize-none"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              disabled={isSaving}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" disabled={isSaving}>
              Cancelar
            </Button>
          </SheetClose>
          <Button type="submit" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Guardando...' : 'Guardar y Subir'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

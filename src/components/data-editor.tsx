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
import { Edit, Save } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';
import { fcfmData as initialData } from '@/lib/fcfm-data';
import { updateData } from '@/app/actions';

export function DataEditor() {
  const [data, setData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    toast({
      title: 'Guardando datos...',
      description: 'Por favor, espera mientras se actualizan los datos.',
    });

    try {
      // This is a client-side simulation.
      // For a real backend, you would make an API call here.
      await updateData(data);
      
      toast({
        title: '¡Datos guardados con éxito!',
        description: 'El chatbot ahora usará la nueva información.',
      });
    } catch (error) {
      console.error("Data saving error:", error);
      toast({
        variant: 'destructive',
        title: 'Error al guardar los datos',
        description:
          'Hubo un problema al guardar. Revisa la consola para más detalles.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Editar Datos
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-2/3 lg:w-1/2 flex flex-col">
        <SheetHeader>
          <SheetTitle>Editar Datos del Chatbot</SheetTitle>
          <SheetDescription>
            Modifica directamente los datos que utiliza el chatbot para responder. Los cambios se aplicarán inmediatamente pero se perderán al recargar la página.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 flex-1 flex flex-col gap-4">
          <div className="grid w-full gap-1.5 h-full">
            <Label htmlFor="data">Contenido de Datos</Label>
            <Textarea
              id="data"
              placeholder="Pega aquí los datos del horario o eventos..."
              className="h-full resize-none font-mono text-xs"
              value={data}
              onChange={(e) => setData(e.target.value)}
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
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

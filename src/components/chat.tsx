'use client';

import { getAiResponse } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { UbicatitoIcon } from '@/components/icons';
import { SendHorizonal, User as UserIcon } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Skeleton } from './ui/skeleton';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const ChatSchema = z.object({
  query: z.string().min(1, 'La consulta no puede estar vacía.'),
});

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hola, soy Ubicatito. ¿Cómo puedo ayudarte hoy con tus consultas sobre la facultad?',
    },
  ]);
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof ChatSchema>>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      query: '',
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const onSubmit = (data: z.infer<typeof ChatSchema>) => {
    const userMessage: Message = { role: 'user', content: data.query };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    startTransition(async () => {
      const formData = new FormData();
      formData.append('query', data.query);
      const res = await getAiResponse(null, formData);

      if (res && res.success && res.message) {
        const assistantMessage: Message = { role: 'assistant', content: res.message };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = { 
          role: 'assistant', 
          content: res?.message || 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' 
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4 md:p-6">
        <div className="space-y-6 max-w-3xl mx-auto w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <Avatar className="w-8 h-8 border">
                {message.role === 'assistant' ? (
                  <>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <UbicatitoIcon className="w-6 h-6" />
                    </AvatarFallback>
                  </>
                ) : (
                  <>
                     <AvatarImage src="/placeholder-user.jpg" asChild>
                      <UserIcon className="bg-muted text-muted-foreground p-1.5" />
                    </AvatarImage>
                    <AvatarFallback>TÚ</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={cn(
                  'rounded-lg p-3 text-sm max-w-[80%]',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-card-foreground shadow-sm'
                )}
              >
                {message.role === 'assistant' ? (
                  <div className="flex flex-col gap-2">
                    {message.content.split('<br>').map((line, i) => (
                      <p key={i} className="whitespace-pre-wrap">{line}</p>
                    ))}
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          ))}
          {isPending && (
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <UbicatitoIcon className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-3 bg-card text-card-foreground shadow-sm w-full max-w-[80%] space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="p-4 md:p-6 bg-background/80 backdrop-blur-sm border-t">
        <div className="max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Textarea
                        placeholder="Escribe tu pregunta sobre la FCFM..."
                        className="min-h-0 resize-none"
                        rows={1}
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon" disabled={isPending}>
                <SendHorizonal className="w-5 h-5" />
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

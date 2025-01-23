'use client'

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { DadosCompra } from "./BuyForm";

const formSchema = z.object({
  file: z.instanceof(FileList).refine((fileList) => fileList.length > 0, {
    message: "Você precisa enviar um comprovante.",
  }),
});

interface PayFormProps {
  setStep: (value: SetStateAction<number>) => void;
  setFinalData: (value: SetStateAction<DadosCompra>) => void;
  finalize: () => void;
}

export default function PayForm({
  setStep,
  finalize,
  setFinalData,
}: PayFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const file = data.file[0];
   
    setFinalData((prev) => ({
      ...prev,
      comprovante: file,
    }));

    setStep(2);

    finalize();
  };
  if (!isClient) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Anexe o comprovante abaixo</FormLabel>
                <br/>
                <FormControl>
                  <Controller
                    name="file"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        type="file"
                        name={field.name}
                        onChange={(e) => field.onChange(e.target.files)}
                        ref={field.ref}
                        disabled={field.disabled}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="grid grid-cols-2 space-x-4">
          <Button variant="outline" onClick={() => setStep(0)}>
            Voltar
          </Button>
          <Button type="submit">Finalizar</Button>
        </div>
      </form>
    </Form>
  );
}

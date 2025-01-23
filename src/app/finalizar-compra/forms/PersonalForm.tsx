"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SetStateAction } from "react"
import { DadosCompra } from "./BuyForm"

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Por favor, insira um nome válido",
  }),
  mail: z.string().email({
    message: "Por favor, insira um e-mail válido",
  }),
  phone: z.string().min(11, { message: 'Insira um número válido com DDD' }).max(16, { message: 'Insira um número válido com DDD' })
})

interface PersonalFormProps{
  setStep: (value: SetStateAction<number>) => void
  setFinalData: (value: SetStateAction<DadosCompra>) => void
  finalData: DadosCompra
}

export default function PersonalForm({setStep, setFinalData, finalData}:PersonalFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: finalData.name,
      mail: finalData.mail,
      phone: finalData.phone
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setFinalData((prev) => ({
      ...prev,
      name: values.fullname,
      mail: values.mail,
      phone: values.phone,
    }));
    setStep(1)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="nome@provedor.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de telefone</FormLabel>
              <FormControl>
                <Input placeholder="11999999999" {...field} />
              </FormControl>
              <FormDescription>
                Não esqueça do DDD. Entraremos em contato por WhatsApp.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Ir para o pagamento</Button>
      </form>
    </Form>
  )
}

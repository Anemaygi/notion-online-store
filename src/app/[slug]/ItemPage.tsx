'use client'

import { useRouter } from 'next/navigation'

import * as React from "react"
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button"
import {
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCart } from '@/context/Carrinho'
import { ItemPage as ItemPageprops, Item } from '../../../@types/schema'



export function ItemPage({ item, markdown }: ItemPageprops) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = React.useState(1);
    const [selectedSize, setSelectedSize] = React.useState("");
    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSize && quantity > 0) {
            addToCart(item, quantity, selectedSize);
        } else {
            alert("Selecionar tamanho e quantidade");
        }
    };

    return (
        <div className="p-8">
            <main className="w-full grid grid-cols-1 md:grid-cols-2 items-center">
                <section className="flex items-center justify-center">

                    <div className="size-96 relative overflow-hidden items-center flex rounded-lg ">
                        <img
                            className="object-scale-down w-full h-full"
                            src={item.imagem}
                            alt={item.descricao}
                        />


                    </div>
                </section>

                <section className="space-y-8">
                    <header className="space-y-2">
                        <CardTitle className="text-3xl"> {item.nome} </CardTitle>
                        <CardTitle className="text-gray-500 text-xl"> R$ {item.preco.toFixed(2).replace(".", ",")} </CardTitle>
                    </header>
                    <CardDescription> {item.descricao} </CardDescription>



                    <form>
                        <div className="grid grid-cols-3 w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Quantidade</Label>
                                <Input className="text-xs" id="quantity" value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value))} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-xs text-gray-500 italic" htmlFor="framework"> {item.variacaoNome} </Label>
                                <Select onValueChange={setSelectedSize}>
                                    <SelectTrigger className="text-xs" id="framework">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {
                                            item.variacoes.map((variacao, idx) => (
                                                <SelectItem className="text-xs" value={variacao} key={idx}>
                                                    {variacao}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>


                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-xs text-gray-500 italic" htmlFor="framework">Carrinho</Label>
                                <Button onClick={handleAddToCart}>Adicionar</Button>
                            </div>
                        </div>
                    </form>
                </section>


            </main>
            {
                markdown && (
                    <section className="space-y-4 w-full mt-8 p-2 md:p-8">
                        <CardTitle className="text-3xl">Detalhes</CardTitle>
                        <Markdown className="text-ellipsis overflow-hidden w-full">{markdown}</Markdown>
                    </section>
                )
            }


        </div>
    )
}

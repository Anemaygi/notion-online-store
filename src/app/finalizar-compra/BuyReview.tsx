'use client'
import { useCart } from "@/context/Carrinho";
import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "../../components/Image"
import { Item } from "../../../@types/schema";
import { StringValidation } from "zod";
import { Label } from "@/components/ui/label";

export default function BuyReview() {
    const { carrinho } = useCart();

    const totalValue = () => {
        let total = 0;
        for (const item of carrinho) {
            total += (item.item.preco * item.quantidade);
        }
        return total;
    }
    return (
        <div className="flex-col flex gap-2 overflow-y-scroll h-96">
            {
                carrinho.map((item, idx) => (

                    <ReviewItem item={item.item} quantidade={item.quantidade} variacao={item.variacao} key={idx} />
                ))
            }

            <h1 className="bg-white p-4 sticky bottom-0"><strong>Total</strong> R$ {totalValue().toFixed(2).replace(".", ",")} </h1>

        </div>
    )


}

interface ReviewItemProps {
    item: Item,
    quantidade: number,
    variacao: string,
}

function ReviewItem({ item, quantidade, variacao }: ReviewItemProps) {
    return (
        <div className="w-full p-2 gap-x-3 h-fit flex items-center justify-center rounded-md border shadow-sm">
            <div className="w-20 h-20 relative ">
                <Image className="object-scale-down rounded-lg" src={item.imagem} alt={"item.descricao"} fill={true} />
            </div>

            <div className="flex flex-col flex-grow">
                <h1 className="text-sm">{item.nome}</h1>

                <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Quantidade</Label>
                        <p>{quantidade}</p>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Variação</Label>
                        <p> {variacao} </p>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Preço/uni</Label>
                        <p> R$ {item.preco.toFixed(2).replace(".", ",")} </p>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Preço/total</Label>
                        <p> R$ {(item.preco * quantidade).toFixed(2).replace(".", ",")} </p>
                    </div>
                </div>

            </div>

        </div>
    );
}
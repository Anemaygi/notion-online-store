'use client'
import { useCart } from "@/context/Carrinho";
import React from 'react';
import Image from "../../components/Image"
import { Item } from "../../../@types/schema";
import { Label } from "@/components/ui/label";

export default function BuyReview() {
    const { carrinho} = useCart();

    return (
        <div className="block max-h-full">
            
            <div className="w-full  gap-2  overflow-y-scroll h-full flex flex-col flex-grow px-4 py-2 md:px-8">
            {
                carrinho.map((item, idx) => (

                    <ReviewItem item={item.item} quantidade={item.quantidade} variacao={item.variacao} key={idx} />
                ))
            }
            </div>

            

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
                        <p className="text-xs">{quantidade}</p>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Variação</Label>
                        <p className="text-xs"> {variacao} </p>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Preço/uni</Label>
                        <p className="text-xs"> R$ {item.preco.toFixed(2).replace(".", ",")} </p>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Preço/total</Label>
                        <p className="text-xs"> R$ {(item.preco * quantidade).toFixed(2).replace(".", ",")} </p>
                    </div>
                </div>

            </div>

        </div>
    );
}
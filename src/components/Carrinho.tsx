'use client'

import * as React from "react"
import { BsFillTrash3Fill, BsXCircleFill, BsCartFill } from "react-icons/bs";
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Item } from "../../@types/schema"
import Image from "./Image"

interface ItemCarrinhoProps {
    item: Item,
    quantidade: number,
    variacao: string,
}

interface CarrinhoProps {
    items: ItemCarrinhoProps[]
}

export function Carrinho({items}:CarrinhoProps) {
    const [isCarrinhoOpen, setIsCarrinhoOpen] = React.useState(false)

    return (
        <>
            <i className="cursor-pointer" onClick={() => setIsCarrinhoOpen(true)}><BsCartFill /></i>
            <main className={`flex flex-col ${isCarrinhoOpen ? '' : 'hidden'} pt-8 overflow-x-auto z-40 p-4 gap-4 shadow-md border fixed top-0 left-0 bottom-0 h-screen bg-white w-full sm:w-80`}>
                <div onClick={() => setIsCarrinhoOpen(false)} className="absolute cursor-pointer top-2 right-2"><BsXCircleFill /></div>

               {items.map((item: ItemCarrinhoProps, idx) => (
                           <ItemCarrinho item={item.item} quantidade={item.quantidade} variacao={item.variacao}  />
                         ))}
                
                <div className="flex flex-col">
                    <Button>Finalizar compra</Button>
                </div>
            </main>
        </>
    )
}



export function ItemCarrinho({ item, quantidade, variacao }: ItemCarrinhoProps) {

    return (
        <div className="w-full p-2 gap-x-3 h-fit flex items-center justify-center  rounded-md border shadow-sm">

            <div className="w-20 h-20 relative ">
                <Image className="object-scale-down rounded-lg" src={"https://i.imgur.com/kps7wFw.png"} alt={"item.descricao"} fill={true} />
            </div>

            <div className="w-36">
                <h1 className="text-sm">{item.nome}</h1>
                <form>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Input className="text-xs" id="quantity" value={quantidade} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Select >
                                <SelectTrigger className="text-xs " id="framework">
                                    <SelectValue placeholder={variacao} />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem className="text-xs" value={variacao}>{variacao}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </div>

            <div>

                <div className="flex flex-col">
                    <Button><BsFillTrash3Fill size={2} /></Button>
                </div>
            </div>



        </div>
    )
}

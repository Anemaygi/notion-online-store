'use client'

import React, { createContext, useContext, useState } from 'react';
import { BsFillTrash3Fill, BsXCircleFill, BsCartFill } from "react-icons/bs";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Item } from "../../@types/schema"
import { useCart } from '@/context/Carrinho';

export interface ItemCarrinhoProps {
    item: Item;
    quantidade: number;
    variacao: string;
    removeFromCart: (itemId: string, variacao: string) => void;
    updateItem: (itemId: string, variacao: string, newValue: number | string, type: "quantidade" | "variacao", newVariacao?: string) => void;  // Add updateItem here
}

export interface CarrinhoProps {
    items: ItemCarrinhoProps[]
    setItems: React.Dispatch<React.SetStateAction<ItemCarrinhoProps[]>>;
}

export function Carrinho() {


    const { carrinho, removeFromCart, updateItem, formattedTotalPrice } = useCart();
    const [isCarrinhoOpen, setIsCarrinhoOpen] = React.useState(false);



    const handleRedirect = () => {
        window.location.href = '/finalizar-compra';
    };


    return (
        <>
            <i className="cursor-pointer" onClick={() => setIsCarrinhoOpen((prevValue) => !prevValue)}>
                <BsCartFill />
            </i>
            <main className={`flex flex-col ${isCarrinhoOpen ? '' : 'hidden'} pt-8 overflow-x-auto z-40 p-4 gap-4 shadow-md border fixed top-0 right-0 bottom-0 h-screen min-h-screen max-h-screen bg-white w-full sm:w-80`}>

                <div onClick={() => setIsCarrinhoOpen(false)} className="absolute cursor-pointer top-2 right-2">
                    <BsXCircleFill />
                </div>


                <div className="flex flex-col gap-2 flex-grow overflow-y-scroll">
                    {carrinho.map((item: ItemCarrinhoProps, idx) => (
                        <ItemCarrinho
                            key={idx}
                            item={item.item}
                            quantidade={item.quantidade}
                            variacao={item.variacao}
                            removeFromCart={removeFromCart}
                            updateItem={updateItem}
                        />
                    ))}
                </div>


                <div className="flex flex-col gap-4">
                    <h1><strong>Total</strong> R$ {formattedTotalPrice()} </h1>

                    <Button onClick={handleRedirect}>Finalizar compra</Button>
                </div>
            </main>
        </>
    );
}



export function ItemCarrinho({ item, quantidade, variacao, removeFromCart, updateItem }: ItemCarrinhoProps) {
    const [selectedSize, setSelectedSize] = React.useState(variacao);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value);
        if (newQuantity > 0) {
            updateItem(item.id, variacao, newQuantity, "quantidade");
        }
    };

    const handleVariacaoChange = (newVariacao: string) => {
        setSelectedSize(newVariacao);
        updateItem(item.id, variacao, quantidade, "variacao", newVariacao);
    };

    return (
        <div className="w-full p-2 gap-x-3 h-fit flex items-center justify-center rounded-md border shadow-sm">
            <div className="size-20 relative overflow-hidden items-center flex rounded-lg ">
                <img
                    className="object-scale-down  w-full h-full"
                    src={item.imagem}
                    alt={item.descricao}
                />


            </div>

            <div className="w-36">
                <h1 className="text-sm">{item.nome}</h1>
                <form>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Input
                                className="text-xs"
                                id="quantity"
                                type="number"
                                min="1"
                                value={quantidade}
                                onChange={handleQuantityChange}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Select value={selectedSize} onValueChange={handleVariacaoChange}>
                                <SelectTrigger className="text-xs" id="framework">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {item.variacoes.map((variacao, idx) => (
                                        <SelectItem className="text-xs" value={variacao} key={idx}>
                                            {variacao}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </div>

            <div>
                <div className="flex flex-col">

                    <Button onClick={() => removeFromCart(item.id, variacao)}>
                        <BsFillTrash3Fill size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

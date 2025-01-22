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

export function Carrinho({ items, setItems }: CarrinhoProps) {
    const [isCarrinhoOpen, setIsCarrinhoOpen] = React.useState(false);

    const removeFromCart = (itemId: string, variacao: string) => {
        setItems((prevItems) => prevItems.filter(item => item.item.id !== itemId || item.variacao !== variacao));
    };

    const updateItem = (itemId: string, variacao: string, newValue: number | string, type: "quantidade" | "variacao", newVariacao?: string) => {
        setItems((prevItems) => {
            return prevItems.map((cartItem) => {
                if (cartItem.item.id === itemId && cartItem.variacao === variacao) {
                    if (type === "quantidade") {
                        return { ...cartItem, quantidade: newValue as number };
                    } else if (type === "variacao") {
                        return { ...cartItem, variacao: newVariacao || variacao };
                    }
                }
                return cartItem;
            });
        });
    };

    const totalValue = () => {
        let total = 0;
        for (const item of items) { 
            total += (item.item.preco * item.quantidade); 
        }
        return total;
    }
    

    return (
        <>
            <i className="cursor-pointer" onClick={() => setIsCarrinhoOpen(true)}>
                <BsCartFill />
            </i>
            <main className={`flex flex-col ${isCarrinhoOpen ? '' : 'hidden'} pt-8 overflow-x-auto z-40 p-4 gap-4 shadow-md border fixed top-0 left-0 bottom-0 h-screen bg-white w-full sm:w-80`}>
                <div onClick={() => setIsCarrinhoOpen(false)} className="absolute cursor-pointer top-2 right-2">
                    <BsXCircleFill />
                </div>

                {items.map((item: ItemCarrinhoProps, idx) => (
                    <ItemCarrinho
                        key={idx}
                        item={item.item}
                        quantidade={item.quantidade}
                        variacao={item.variacao}
                        removeFromCart={removeFromCart}
                        updateItem={updateItem} 
                    />
                ))}



                <div className="flex flex-col gap-4">
                    <h1><strong>Total</strong> R$ {totalValue().toFixed(2).replace(".", ",")} </h1>
                    
                    <Button>Finalizar compra</Button>
                </div>
            </main>
        </>
    );
}



export function ItemCarrinho({ item, quantidade, variacao, removeFromCart, updateItem }: ItemCarrinhoProps) {
    const [selectedSize, setSelectedSize] = React.useState(variacao); // State for managing selected size

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value);
        if (newQuantity > 0) {
            updateItem(item.id, variacao, newQuantity, "quantidade");
        }
    };

    const handleVariacaoChange = (newVariacao: string) => {
        setSelectedSize(newVariacao); // Update selected size state
        updateItem(item.id, variacao, quantidade, "variacao", newVariacao); // Update item with new size
    };

    return (
        <div className="w-full p-2 gap-x-3 h-fit flex items-center justify-center rounded-md border shadow-sm">
            <div className="w-20 h-20 relative ">
                <Image className="object-scale-down rounded-lg" src={item.imagem} alt={"item.descricao"} fill={true} />
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

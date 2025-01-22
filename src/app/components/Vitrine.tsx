'use client'

import { ItemCard } from "@/components/ItemCard";
import { Item } from "../../../@types/schema";
import { Carrinho, ItemCarrinhoProps } from "@/components/Carrinho";
import { useState } from "react";

interface VitrineProps {
  items: Item[];
}

export default function Vitrine({ items }: VitrineProps) {
  const [carrinho, setCarrinho] = useState<ItemCarrinhoProps[]>([]);

  const addToCart = (item: Item, quantity: number, size: string) => {
    setCarrinho((prevCarrinho) => {
      const itemIndex = prevCarrinho.findIndex(
        (cartItem) => cartItem.item.id === item.id && cartItem.variacao === size
      );

      if (itemIndex > -1) {
        const updatedItems = [...prevCarrinho];
        updatedItems[itemIndex].quantidade += quantity;
        return updatedItems;
      } else {
        return [
          ...prevCarrinho,
          {
            item,
            quantidade: quantity,
            variacao: size,
            removeFromCart: (id: string, variacao: string) => {
              setCarrinho(prevItems => prevItems.filter(item => item.item.id !== id || item.variacao !== variacao));
            },
            updateItem: (id: string, variacao: string, newValue: number | string, type: "quantidade" | "variacao", newVariacao?: string) => {
              setCarrinho(prevItems => {
                return prevItems.map(cartItem => {
                  if (cartItem.item.id === id && cartItem.variacao === variacao) {
                    if (type === "quantidade") {
                      return { ...cartItem, quantidade: newValue as number };
                    } else if (type === "variacao") {
                      return { ...cartItem, variacao: newVariacao || variacao };
                    }
                  }
                  return cartItem;
                });
              });
            },
          },
        ];
      }
    });
  };

  return (
    <main className="w-full h-full">
      <Carrinho items={carrinho} setItems={setCarrinho} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 m-8">
        {items.map((item, idx) => (
          <ItemCard key={idx} item={item} addToCart={addToCart} />
        ))}
      </div>
    </main>
  );
}

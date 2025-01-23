'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ItemCarrinhoProps } from '@/components/Carrinho'; 
import { Item } from '../../@types/schema';

interface CartContextType {
    carrinho: ItemCarrinhoProps[];
    addToCart: (item: Item, quantity: number, size: string) => void;
    updateItem: (itemId: string, variacao: string, newValue: number | string, type: "quantidade" | "variacao", newVariacao?: string) => void;
    removeFromCart: (itemId: string, variacao: string) => void;
    totalPrice: () => number;
    formattedTotalPrice: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('Precisa do CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carrinho, setCarrinho] = useState<ItemCarrinhoProps[]>([]);

    useEffect(() => {
        const carrinhoSalvo = localStorage.getItem("carrinho");
        if (carrinhoSalvo) {
          setCarrinho(JSON.parse(carrinhoSalvo));
        }
      }, []);
    
      useEffect(() => {
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
      }, [carrinho]);
    

    const totalPrice = () => {
        let total = 0;
        for (const item of carrinho) { 
            total += (item.item.preco * item.quantidade); 
        }
        return total;
    }

    const formattedTotalPrice = () => {
        return totalPrice().toFixed(2).replace(".", ",")
    }

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
                            setCarrinho((prevItems) => prevItems.filter((item) => item.item.id !== id || item.variacao !== variacao));
                        },
                        updateItem: (id: string, variacao: string, newValue: number | string, type: "quantidade" | "variacao", newVariacao?: string) => {
                            setCarrinho((prevItems) => {
                                return prevItems.map((cartItem) => {
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

    const updateItem = (itemId: string, variacao: string, newValue: number | string, type: "quantidade" | "variacao", newVariacao?: string) => {
        setCarrinho((prevItems) => {
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

    const removeFromCart = (itemId: string, variacao: string) => {
        setCarrinho((prevItems) => prevItems.filter((item) => item.item.id !== itemId || item.variacao !== variacao));
    };

    return (
        <CartContext.Provider value={{ carrinho, addToCart, updateItem, removeFromCart, totalPrice, formattedTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

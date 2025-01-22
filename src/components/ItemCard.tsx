'use client'

import { useRouter } from 'next/navigation'

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
import { Item } from "../../@types/schema"
import Image from "./Image"

interface ItemCardProps {
    item: Item;
    addToCart: (item: Item, quantity: number, size: string) => void;  
  }

export function ItemCard( {item, addToCart}: ItemCardProps ) {
    const router = useRouter()
    const sendToPage = () => router.push(`/${item.slug}`)

    const [quantity, setQuantity] = React.useState(1); 
    const [selectedSize, setSelectedSize] = React.useState("");
    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission reload
        if (selectedSize && quantity > 0) {
          addToCart(item, quantity, selectedSize); // Add item to cart
        } else {
          alert("Selecionar tamanho e quantidade");
        }
      };
    return (
    <Card className="w-full">
      <CardHeader onClick={sendToPage} className="cursor-pointer">
        <div className="mb-2 w-full h-64 relative">
            <Image className="object-scale-down" src={item.imagem} alt={item.descricao} fill={true}/>
        </div>
        <CardTitle> {item.nome} </CardTitle>
        <CardDescription> {item.descricao} </CardDescription>

      </CardHeader>
      <CardContent>
            <form>
            <div className="grid grid-cols-3 w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Quantidade</Label>
              <Input className="text-xs" id="quantity" value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-xs text-gray-500 italic" htmlFor="framework">Tamanho</Label>
              <Select onValueChange={setSelectedSize}>
                <SelectTrigger className="text-xs " id="framework">
                  <SelectValue  placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem className="text-xs" value="next">Next.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label className="text-xs text-gray-500 italic" htmlFor="framework">Carrinho</Label>
            <Button onClick={handleAddToCart}>Adicionar</Button>
            </div>
          </div>
            </form>
        </CardContent>
    </Card>
  )
}

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
import { Item } from "../../../@types/schema"
import Image from "../../components/Image"

interface ItemPageProps {
    item: Item;
    // addToCart: (item: Item, quantity: number, size: string) => void;  
  }

export function ItemPage( {item}: ItemPageProps ) {

    const [quantity, setQuantity] = React.useState(1); 
    const [selectedSize, setSelectedSize] = React.useState("");
    // const handleAddToCart = (e: React.FormEvent) => {
    //     e.preventDefault(); 
    //     if (selectedSize && quantity > 0) {
    //       addToCart(item, quantity, selectedSize); 
    //     } else {
    //       alert("Selecionar tamanho e quantidade");
    //     }
    //   };

    return (
    <Card className="w-full">
      <CardHeader className="cursor-pointer">
        <div className="mb-2 w-full h-64 relative">
            <Image className="object-scale-down" src={item.imagem} alt={item.descricao} fill={true}/>
        </div>
        <CardTitle> {item.nome} </CardTitle>
        <CardTitle className="text-gray-500"> R$ {item.preco.toFixed(2).replace(".", ",")} </CardTitle>
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
            {/* <Button onClick={handleAddToCart}>Adicionar</Button> */}
            </div>
          </div>
            </form>
        </CardContent>
    </Card>
  )
}

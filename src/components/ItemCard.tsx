import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  }

export function ItemCard( {item}: ItemCardProps ) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="mb-2 w-full h-64 relative">
            <Image className="object-scale-down" src={item.imagem} alt={item.descricao} fill={true}/>
        </div>
        <CardTitle> {item.nome} </CardTitle>
        <CardDescription> {item.descricao} </CardDescription>
        {/* <Image src={item.imagem} alt={item.descricao} fill={true}/> */}
      </CardHeader>
      
      <CardFooter className="flex justify-between">
        <Button>Adicionar ao carrinho</Button>
      </CardFooter>
    </Card>
  )
}

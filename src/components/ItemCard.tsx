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

      </CardHeader>
      <CardContent>
            <form>
            <div className="grid grid-cols-3 w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-xs text-gray-500 italic" htmlFor="quantity">Quantidade</Label>
              <Input className="text-xs" id="quantity" value="1" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-xs text-gray-500 italic" htmlFor="framework">Tamanho</Label>
              <Select >
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
            <Button>Adicionar</Button>
            </div>
          </div>
            </form>
        </CardContent>
    </Card>
  )
}

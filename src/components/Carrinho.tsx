'use client'

import { useRouter } from 'next/navigation'
import * as React from "react"
import { BsFillTrash3Fill, BsXCircleFill } from "react-icons/bs";
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



export function Carrinho() {
    return (
        <main className="flex flex-col pt-8 overflow-x-auto z-40 p-4 gap-4 shadow-md border fixed top-0 left-0 bottom-0 h-screen bg-white w-full sm:w-80">
            <div className="absolute top-2 right-2"><BsXCircleFill /></div>
            
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
            <ItemCarrinho />
        </main>
    )
}

export function ItemCarrinho() {

    return (
        <div className="w-full p-2 gap-x-3 h-fit flex items-center justify-center  rounded-md border shadow-sm">
            
            <div className="w-20 h-20 relative ">
                <Image className="object-scale-down rounded-lg" src={"https://i.imgur.com/kps7wFw.png"} alt={"item.descricao"} fill={true}/>
            </div>
            
            <div className="w-36">
                <h1 className="text-sm">Item</h1>
                <form>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Input className="text-xs" id="quantity" value="1" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Select >
                                <SelectTrigger className="text-xs " id="framework">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem className="text-xs" value="next">Next.js</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </div>
            
            <div>

            <div className="flex flex-col">
                    <Button><BsFillTrash3Fill size={2}/></Button>
                </div>
            </div>
            
         

        </div>
    )
}

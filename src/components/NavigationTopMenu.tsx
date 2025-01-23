"use client"

import * as React from "react"
import Link from "next/link"
import { BsHouseDoorFill, BsFlower2 } from "react-icons/bs";
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Carrinho } from "./Carrinho"

export function NavigationTopMenu() {
  return (
    <div className="w-full flex items-center justify-between">
      
      
      <NavigationMenu className="w-full">
      <NavigationMenuList className="w-full flex items-center justify-between">
        <NavigationMenuItem className="flex-grow text-center">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Quem somos?
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>


    <i className="flex">
      <BsFlower2 />
      <p>Logo</p>
      </i>


      <NavigationMenu className="w-full">
      <NavigationMenuList className="w-full flex items-center justify-between">
        
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <BsHouseDoorFill />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle() + " z-40"}>
            <Carrinho />
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}


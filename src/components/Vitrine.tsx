'use client'

import { ItemCard } from "@/components/ItemCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Item } from "../../@types/schema";
import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

interface VitrineProps {
  items: Item[];
  categorias: string[];
}

export default function Vitrine({ items, categorias }: VitrineProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  const filterItemsByCategory = (category: string) => {
    if (category === "all") {
      setFilteredItems(items); 
    } else {
      const filtered = items.filter(item =>
        item.categorias.some(categoria => categoria.name === category)
      );
      setFilteredItems(filtered);
    }
  };

  useEffect(() => {
    filterItemsByCategory(selectedCategory);
  }, [selectedCategory, items]);

  return (
    <main className="w-full h-full">

      <div className="w-full flex justify-center items-center p-4 gap-2 m-2 md:m-4 lg:m-8 flex flex-wrap">
      <Label>Filtrar por</Label>
      <Badge 
          onClick={() => setSelectedCategory("all")} variant={selectedCategory === "all" ? "default" : "outline"} className="cursor-pointer">
          Todos
        </Badge>
        
        {categorias.map((categoria, idx) => (
          <Badge 
            key={idx} 
            onClick={() => setSelectedCategory(categoria)} variant={selectedCategory === categoria ? "default" : "outline"} className="cursor-pointer">
            {categoria}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mx-8">
        {filteredItems.map((item, idx) => (
          <ItemCard key={idx} item={item} />
        ))}
      </div>
    </main>
  );
}

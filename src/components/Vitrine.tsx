'use client'

import { ItemCard } from "@/components/ItemCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Item } from "../../@types/schema";
import { useState, useEffect } from "react";

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

      <div className="w-full bg-red-500 flex justify-center p-4">
        <Tabs
          defaultValue="all"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-[400px]"
        >
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            {categorias.map((categoria, idx) => (
              <TabsTrigger key={idx} value={categoria}>
                {categoria}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 m-8">
        {filteredItems.map((item, idx) => (
          <ItemCard key={idx} item={item} />
        ))}
      </div>
    </main>
  );
}

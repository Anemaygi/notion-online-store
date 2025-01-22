import { ItemCard } from "@/components/ItemCard";
import NotionService from "../../services/notion-service";
import { Item } from "../../@types/schema";


export default async function Home() {
  
  const notionService = new NotionService();
  const items = await notionService.getPublishedItems(); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-8">
       {items.map((item: Item, idx) => (
          <ItemCard key={idx} item={item} />
        ))}

    </div>
  );
}

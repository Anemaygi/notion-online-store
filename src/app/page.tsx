import { ItemCard } from "@/components/ItemCard";
import NotionService from "../../services/notion-service";

export default async function Home() {

  const notionService = new NotionService();
  const items = await notionService.getPublishedItems();

  return (

    <main className="w-full h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 m-8">
        {items.map((item, idx) => (
          <ItemCard key={idx} item={item} />
        ))}
      </div>
    </main>

  );
}

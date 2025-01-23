import { ItemCard } from "@/components/ItemCard";
import NotionService from "../../services/notion-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Vitrine from "@/components/Vitrine";

export default async function Home() {

  const notionService = new NotionService();
  const items = await notionService.getPublishedItems();
  const categorias = await notionService.getAllCategorias();

  return (

    <main className="w-full h-full">

      <Vitrine items={items} categorias={categorias} />

    </main>

  );
}

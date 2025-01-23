import { ItemCard } from "@/components/ItemCard";
import NotionService from "../../services/notion-service";
import Vitrine from "@/components/Vitrine";
import { BsFlower2 } from "react-icons/bs";

export default async function Home() {

  const notionService = new NotionService();
  const items = await notionService.getPublishedItems();
  const categorias = await notionService.getAllCategorias();

  return (

    <main className="w-full h-full">
      
      <div className="bg-black text-white w-full space-x-4 h-96 overflow-hidden text-7xl flex items-center justify-center">
        <BsFlower2 /> <BsFlower2 /> <BsFlower2 />
      </div>

      <Vitrine items={items} categorias={categorias} />

    </main>

  );
}

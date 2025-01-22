import { ItemCard } from "@/components/ItemCard";
import NotionService from "../../services/notion-service";
import { Tipo } from "../../@types/schema";
;

import Vitrine from "./components/Vitrine";


export default async function Home() {
  
  const notionService = new NotionService();
  const items = await notionService.getPublishedItems(); 

  return (
    <Vitrine items={items} />
  );
}

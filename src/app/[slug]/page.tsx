import { ItemCard } from "@/components/ItemCard";
import NotionService from "../../../services/notion-service";
import { Item } from "../../../@types/schema";

interface ItemCardProps {
    item: Item; 
  }

export default async function Page({ params, }: { params: { slug: string } }) {
  
  const { slug } = params
  const notionService = new NotionService();
  const itemPage = await notionService.getSingleItem(slug)
  const item = itemPage.item; 

  return (
    <ItemCard item={item} />
  )
}

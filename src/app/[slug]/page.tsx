import NotionService from "../../../services/notion-service";
import { Item } from "../../../@types/schema";
import { ItemPage } from "./ItemPage";

interface ItemCardProps {
  item: Item;
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const notionService = new NotionService();
  const itemPage = await notionService.getSingleItem(slug);
  const item = itemPage.item;

  return <ItemPage item={item} />;
}

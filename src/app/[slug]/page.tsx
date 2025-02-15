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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = (await params);
  const notionService = new NotionService();
  const itemPage = await notionService.getSingleItem(slug);

  return <ItemPage item={itemPage.item} markdown={itemPage.markdown} />;
}

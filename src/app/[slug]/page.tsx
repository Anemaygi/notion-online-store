import { GetStaticProps } from 'next';
import NotionService from "../../../services/notion-service";
import { Item } from "../../../@types/schema";
import { ItemPage } from "./ItemPage";

interface ItemCardProps {
  item: Item;
}

interface PageProps {
  item: Item;
}

export const getStaticProps: GetStaticProps<PageProps, { slug: string }> = async ({ params }) => {
  const notionService = new NotionService();
  const itemPage = await notionService.getSingleItem(params?.slug ?? '');
  const item = itemPage.item;

  return {
    props: {
      item,
    },
  };
};

export default function Page({ item }: PageProps) {
  return <ItemPage item={item} />;
}

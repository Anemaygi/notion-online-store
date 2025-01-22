import { ItemCard } from "@/components/ItemCard";
import NotionService from "../../services/notion-service";
import { Item, Tipo } from "../../@types/schema";
import { Carrinho } from "@/components/Carrinho";


export default async function Home() {
  
  const notionService = new NotionService();
  const items = await notionService.getPublishedItems(); 


    const item = {
      id: '0',
      slug: "cfbgg-18339a774f7380a0bc53eb3dd60b663e",
      imagem: "https://i.imgur.com/kps7wFw.png",
      nome: "cfbgg",
      categorias: [],
      descricao: "sdfdsfd",
      pedidos: 0,
      estoque: 20,
      variacoes: [],
      tipo: Tipo.Encomenda,
      date: ""
  }

  const carrinhoItem = {
    item: item,
    quantidade: 4,
    variacao: 'P'
  }


  return (
    <main className="w-full h-full">
      <Carrinho items={[carrinhoItem]} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-8">
        {items.map((item: Item, idx) => (
            <ItemCard key={idx} item={item} />
          ))}
      </div>
    </main>
  );
}

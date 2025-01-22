import NotionService from "../../services/notion-service";


export default async function Home() {
  
  const notionService = new NotionService();
  const items = await notionService.getPublishedItems(); // Fetch the items from Notion
  const item = await notionService.getSingleItem("cfbgg-18339a774f7380a0bc53eb3dd60b663e")
  console.log(item)
  return (
    <div>
       {items.map((item: any) => (
          <li className="border m-4 list-none" key={item.id}>
            <h2><strong>Nome:</strong> {item.nome}</h2>
            <p> <strong>Imagem:</strong> {item.imagem} </p>
            <p> <strong>Descrição:</strong> {item.descricao}</p>
            <p> <strong>Estoque:</strong> {item.estoque}</p>
            <p> <strong>Pedidos:</strong> {item.pedidos}</p>
            <p> <strong>Categorias:</strong> {item.categorias}</p>
            <p> <strong>Variações:</strong> {item.variacoes}</p>
            <p> <strong>Data:</strong> {item.date}</p>
            <p> <strong>Tipo:</strong> {item.tipo}</p> 
          </li>
        ))}

        <li className="border m-4 list-none" key={item.item.id}>
            <h2><strong>Nome:</strong>.item {item.item.nome}</h2>
            <p> <strong>Imagem:</strong> {item.item.imagem} </p>
            <p> <strong>Descrição:</strong> {item.item.descricao}</p>
            <p> <strong>Estoque:</strong> {item.item.estoque}</p>
            <p> <strong>Pedidos:</strong> {item.item.pedidos}</p>
            <p> <strong>Categorias:</strong> {item.item.categorias}</p>
            {/* <p> <strong>Variações:</strong> {item.item.variacoes}</p> */}
            <p> <strong>Data:</strong> {item.item.date}</p>
            <p> <strong>Tipo:</strong> {item.item.tipo}</p> 
          </li>
    </div>
  );
}

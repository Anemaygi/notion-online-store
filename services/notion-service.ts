import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { Item, Tipo } from "../@types/schema";

export default class NotionService {
    client: Client
    n2m: NotionToMarkdown

    constructor() {
        this.client = new Client({auth:process.env.NOTION_ACCESS_TOKEN})
        this.n2m = new NotionToMarkdown({notionClient: this.client})
    }

    async getPublishedItems(): Promise<Item[]>{
        const database = process.env.NOTION_STORE_DB_ID ?? '';
        const response = await this.client.databases.query(
            {
                database_id: database,
                filter: {
                    property: 'Publicado',
                    checkbox: {
                        equals: true
                    }
                },
                sorts: [
                    {
                        property: 'Criado',
                        direction: 'descending'
                    }
                ]
            }
        );

        // console.log(response)
        const formatRes =  response.results.map(res=>{
            return NotionService.pageToItemTransformer(res)
        })
        // console.log(formatRes)
        return formatRes

    }

    private static pageToItemTransformer(page:any): Item{
        return{
            id: page.id,
            slug: page.properties.Slug.formula.string,
            imagem: page.properties.Imagens.rich_text[0].plain_tex,
            nome: page.properties.Nome.rich_text[0].plain_text,
            categorias: [],
            descricao: page.properties.Descricao.rich_text[0].plain_text,
            pedidos: page.properties.Pedidos.number,
            estoque: page.properties.Estoque.number,
            variacoes: [],
            tipo: Tipo.Encomenda,
            date: ""
        }
    }
    
}
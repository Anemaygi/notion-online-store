import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { Item, ItemPage, Tipo } from "../@types/schema";

export default class NotionService {
    client: Client
    n2m: NotionToMarkdown
    database: string

    constructor() {
        this.client = new Client({auth:process.env.NOTION_ACCESS_TOKEN})
        this.n2m = new NotionToMarkdown({notionClient: this.client})
        this.database = process.env.NOTION_STORE_DB_ID ?? '';
    }

    async getPublishedItems(): Promise<Item[]>{
        // const database = process.env.NOTION_STORE_DB_ID ?? '';
        const response = await this.client.databases.query(
            {
                database_id: this.database,
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

    async getSingleItem(slug: string): Promise<ItemPage> {
        const response = await this.client.databases.query(
            {
                database_id: this.database,
                filter: {
                    property: 'Slug',
                    formula: {
                        string: {
                            equals: slug
                        }
                    }
                }
            }
        )

        if(!response.results[0]){
            throw new Error('No results available');
        }

        const itemToPage = response.results[0];
        return {item: NotionService.pageToItemTransformer(itemToPage)}
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
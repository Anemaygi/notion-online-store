import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { Categoria, Item, ItemPage, Tipo } from "../@types/schema";

export default class NotionService {
    client: Client
    n2m: NotionToMarkdown
    database: string

    constructor() {
        this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })
        this.n2m = new NotionToMarkdown({ notionClient: this.client })
        this.database = process.env.NOTION_STORE_DB_ID ?? '';
    }

    async getPublishedItems(): Promise<Item[]> {
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
        
        const formatRes = response.results.map(res => {
            return NotionService.pageToItemTransformer(res)
        })
        return formatRes

    }

    async getSingleItem(slug: string): Promise<ItemPage> {

        let item, markdown

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

        if (!response.results[0]) {
            throw new Error('No results available');
        }

        const page = response.results[0];

        const mdBlocks = await this.n2m.pageToMarkdown(page.id)
        markdown = this.n2m.toMarkdownString(mdBlocks).parent;
        item = NotionService.pageToItemTransformer(page);

        return {
            item,
            markdown
        }

    }

    async getAllCategorias(): Promise<string[]> {
        const response = await this.client.databases.query({
            database_id: this.database,
        });
        const categoriasSet = new Set<string>();
        response.results.forEach((page: any) => {
            const categorias = page.properties.Categorias.multi_select;
            if (categorias) {
                categorias.forEach((categoria: any) => {
                    categoriasSet.add(categoria.name);
                });
            }
        });
        return Array.from(categoriasSet);
    }

    private static pageToItemTransformer(page: any): Item {

        let cover = page.cover;
        switch (cover.type) {
            case 'file':
                cover = cover.file.url
                break;
            case 'external':
                cover = page.cover.external.url;
                break;
            default:
                cover = ''
        }
        return {
            id: page.id,
            slug: page.properties.Slug.formula.string,
            imagem: cover,
            nome: page.properties.Name.title[0].plain_text,
            categorias: page.properties.Categorias.multi_select,
            descricao: page.properties.Descricao.rich_text[0].plain_text,
            pedidos: page.properties.Pedidos.number,
            estoque: page.properties.Estoque.number,
            variacaoNome: page.properties.VariacaoNome.rich_text[0].plain_text,
            variacoes: page.properties.Variacoes.rich_text[0].plain_text.split(',').map((item: string) => item.trim()),
            tipo: Tipo.Encomenda,
            date: "",
            preco: page.properties.Preco.number,
        }
    }

}


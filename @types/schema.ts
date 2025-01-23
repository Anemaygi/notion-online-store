import { MdStringObject } from "notion-to-md/build/types";

export enum Tipo {
    Encomenda = 'Encomenda',
    ProntaEntrega = 'ProntaEntrega'
}

export type Categoria = {
    color: string
    id: string
    name: string
}

export type Item = {
    id: string,
    slug: string,
    imagem: string,
    nome: string,
    categorias: Categoria[],
    descricao: string,
    pedidos: number,
    estoque: number,
    variacaoNome: string
    variacoes: string[],
    tipo: Tipo,
    date: string
    preco: number,
}

export type ItemPage = {
    item: Item, 
    markdown: string
}

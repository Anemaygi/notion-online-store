export enum Tipo {
    Encomenda = 'Encomenda',
    ProntaEntrega = 'ProntaEntrega'
}

export enum Categorias {
    Roupas = 'Roupas',
    Broches = 'Broches',
    Papelaria = 'Papelaria',
    Bolsas = 'Bolsas'
}

type Variacao = {
    tamanho: string;
    cor: string;
    estoque: number;
};

export type Item = {
    id: string,
    slug: string,
    imagem: string,
    nome: string,
    categorias: Categorias[],
    descricao: string,
    pedidos: number,
    estoque: number,
    variacaoNome: string
    variacoes: string[],
    tipo: Tipo,
    date: string
}

export type ItemPage = {
    item: Item
}
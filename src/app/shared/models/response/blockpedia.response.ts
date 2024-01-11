import { Pagina } from "./pagina.response";

export interface Blockpedia
{
    ativo:boolean;
    autor:string;
    dataCriacao:number;
    paginas:Pagina[];
}
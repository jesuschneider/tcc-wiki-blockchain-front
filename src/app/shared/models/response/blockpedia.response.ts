import { Pagina } from "./pagina.response";

export interface Blockpedia
{
    ativo:boolean;
    autor:string;
    dataCriacao:any;
    paginas:Pagina[];
}
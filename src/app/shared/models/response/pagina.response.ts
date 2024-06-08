import { Versao } from "./versao.response";

export interface Pagina
{
    ativo:boolean;
    autor:string;
    dataCriacao:any;
    titulo:string;
    versoes:Versao[];
    indicePaginas:number;
}
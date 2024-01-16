import { Versao } from "./versao.response";

export interface Pagina
{
    ativo:boolean;
    autor:string;
    dataCriacao:Date;
    titulo:string;
    versoes:Versao[];
    indicePaginas:number;
}
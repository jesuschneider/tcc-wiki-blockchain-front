import { Versao } from "./versao.response";

export interface Pagina
{
    ativo:boolean;
    autor:string;
    dataCriacao:number;
    titulo:string;
    versoes:Versao[];
}
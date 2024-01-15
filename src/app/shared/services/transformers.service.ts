import { Injectable } from "@angular/core";
import { Blockpedia } from "../models/response/blockpedia.response";
import { Pagina } from "../models/response/pagina.response";
import { Versao } from "../models/response/versao.response";

@Injectable({
    providedIn: 'root'
  })
  export class TransformersService
  {

    constructor(){}

    //0 = ativo = boolean
    //1 = autor = endereco = string
    //2 = dataCriacao = numero = timestamp Unix
    //3 = pagina[] = obj
    public transformarDadosRespostaEmBlockpedia(resposta: any): Blockpedia {
        const blockpedia: Blockpedia = {
            ativo: resposta["0"],
            autor: resposta["1"],
            dataCriacao: this.transformaTimesTampUnixParaDate(resposta["2"]),
            paginas: []
        };

        for (let i = 0; i < resposta["3"].length; i++) {
            blockpedia.paginas.push(this.transformarDadosRespostaEmPaginas(resposta["3"][i]));
        }
    
        return blockpedia;
    }

    //0 = ativo = boolean
    //1 = autor = endereco = string
    //2 = dataCriacao = numero = timestamp Unix
    //3 = titulo = string
    //4 = versao[] = obj
    public transformarDadosRespostaEmPaginas(resposta: any): Pagina
    {
        const pagina: Pagina = {
            ativo: resposta["0"],
            autor: resposta["1"],
            dataCriacao: this.transformaTimesTampUnixParaDate(resposta["2"]),
            titulo: resposta["3"],
            versoes: []
        };

        for (let j = 0; j < resposta["4"].length; j++) {
            pagina.versoes.push(this.transformarDadosRespostaEmVersao(resposta["4"][j]));
        }


        return pagina;

    }

    //0 = ativo = boolean
    //1 = autor = endereco = string
    //2 = dataCriacao = numero = timestamp Unix
    //3 = conteudo = string
    public transformarDadosRespostaEmVersao(resposta: any): Versao 
    {
        const versao: Versao = {
            ativo: resposta["0"],
            autor: resposta["1"],
            dataCriacao: this.transformaTimesTampUnixParaDate(resposta["2"]),
            conteudo: resposta["3"]
        };
        return versao;

    }

    public transformaTimesTampUnixParaDate(timestamp: any):Date
    {
        return new Date(Number(timestamp) * 1000);
    }

  }
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

        let paginas = resposta["3"]
        for (let i = 0; i < paginas.length; i++) {
            blockpedia.paginas.push(this.transformarDadosRespostaEmPaginas(paginas[i],i));
        }
    
        return blockpedia;
    }

    //0 = ativo = boolean
    //1 = autor = endereco = string
    //2 = dataCriacao = numero = timestamp Unix
    //3 = titulo = string
    //4 = versao[] = obj
    //indicePaginas = indice da pagina no array de paginas da blockpedia
    public transformarDadosRespostaEmPaginas(resposta: any, indicePaginas: any=null): Pagina
    {
        const pagina: Pagina = {
            ativo: resposta["0"],
            autor: resposta["1"],
            dataCriacao: this.transformaTimesTampUnixParaDate(resposta["2"]),
            titulo: resposta["3"],
            indicePaginas: indicePaginas,
            versoes: [],
        };

        let vercoes = resposta["4"]
        for (let j = 0; j < vercoes.length; j++) {
            pagina.versoes.push(this.transformarDadosRespostaEmVersao(vercoes[j],j));
        }

        return pagina;
    }

    //0 = ativo = boolean
    //1 = autor = endereco = string
    //2 = dataCriacao = numero = timestamp Unix
    //3 = conteudo = string
    //indiceVersoes = indice da versao no array de versoes da pagina enviada
    public transformarDadosRespostaEmVersao(resposta: any,indiceVersoes:any = null): Versao 
    {
        const versao: Versao = {
            ativo: resposta["0"],
            autor: resposta["1"],
            dataCriacao: this.transformaTimesTampUnixParaDate(resposta["2"]),
            conteudo: resposta["3"],
            indiceVersoes: indiceVersoes
        };
        return versao;
    }

    public transformaTimesTampUnixParaDate(timestamp: any)
    {
        return this.dateInYyyyMmDdHhMmSs(new Date(this.transformaDadoEmNumber(timestamp) * 1000));
    }

    public transformaDadoEmNumber(dado: any):number
    {
        return Number(dado);
    }

    padTwoDigits(num: number)
    {
        return num.toString().padStart(2, "0");
    }
      
    dateInYyyyMmDdHhMmSs(date: Date, dateDiveder: string = "-")
    {
        return (
          [
            date.getFullYear(),
            this.padTwoDigits(date.getMonth() + 1),
            this.padTwoDigits(date.getDate()),
          ].join(dateDiveder) +
          " " +
          [
            this.padTwoDigits(date.getHours()),
            this.padTwoDigits(date.getMinutes()),
            this.padTwoDigits(date.getSeconds()),
          ].join(":")
        );
    }
    
    removerChavesNaoNumericas(objeto: any)
    {
        let objetoModificado: any = structuredClone(objeto)
        this.removerChaves(objetoModificado);
        return objetoModificado;
    }

    removerChaves(obj: any)
    {
        Object.keys(obj).forEach(chave =>{
            if (isNaN(parseInt(chave, 10))) 
                delete obj[chave];
            else if (typeof obj[chave] === 'object' && obj[chave] !== null)
                this.removerChaves(obj[chave])
        });
    }

  }
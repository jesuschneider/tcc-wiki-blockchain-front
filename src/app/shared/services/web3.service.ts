import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import abiContratoBlockpedia from './../../solidity/abi/abi-blockpedia.json';
import Web3 from 'web3';

declare let window: any;
const enderecoContrato = '0x4eAaFD9bBFf24a45d1ced2BD63f00629E8e0a060'


@Injectable({
  providedIn: 'root'
})
export class Web3Service
{
  private web3: any;
  private conta: any;
  private contrato: any;

  constructor(private messageService: MessageService){this.inicializarWeb3();}

  public async inicializarWeb3(): Promise<void>
  {
    if(this.conta) return
    if(typeof window.ethereum !== 'undefined')
    {
      this.web3 = new Web3(window.ethereum);
      try
      {
        let contas = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.conta = contas[0]
        this.contrato = new this.web3.eth.Contract(abiContratoBlockpedia, enderecoContrato);
      } catch (error) {this.aceitarCompartilhar()}
    } else {this.instalarCarteira()}
  }

  public desconectarCarteira(): void {this.conta = null;this.web3 = null}

  public aceitarCompartilhar(){alert("Usuário recusou compartilhar sua conta")}

  public tituloErrado(){alert("Titulo incorreto")}

  public conteudoErrado(){alert("Conteudo incorreto")}

  public indiceErrado(){alert("Indice incorreto")}

  public instalarCarteira(){alert("Por favor, instale uma carteira Ethereum como a MetaMask para usar este aplicativo")}

  public conectarACarteira(){alert("Por favor, conectar a sua carteira")}

  public indiceValido(indice:number){return (indice == null || indice == undefined || indice<0)}

  private async enviarTransacao(method: any): Promise<any>
  {
    if (!this.conta){this.conectarACarteira();throw new Error('Contrato não está inicializado');}
    try{return await method.send({ from: this.conta });}
    catch (error){alert('Erro ao enviar transação: '+ error);throw error;}
  }

  private async metodoDeConsulta(metrod : string,...args: any[]): Promise<any>
  {
    if (!this.conta){this.conectarACarteira();throw new Error('Contrato não está inicializado');}
    try{return await this.contrato.methods[metrod](...args).call();}
    catch (error){alert('Erro ao consultar: '+ error);throw error;}
  }

  public async getAllDadosBlockpedia(): Promise<any>
  {
    return await this.metodoDeConsulta('getAllDadosBlockpedia');
  }

  public async getInformacoesBlockpedia(): Promise<any>
  {
    return await this.metodoDeConsulta('getInformacoesBlockpedia');
  }

  public async getAllPaginasComTodasVersoes(): Promise<any>
  {
    return await this.metodoDeConsulta('getAllPaginasComTodasVersoes');
  }

  public async getAllPaginasAtivas(): Promise<any>
  {
    return await this.metodoDeConsulta('getAllPaginasAtivas');
  }

  public async getAllPaginasAtivasSomenteComAsVersoesAtivas(): Promise<any>
  {
    return await this.metodoDeConsulta('getAllPaginasAtivasSomenteComAsVersoesAtivas');
  }

  public async getPaginaComVersoes(indice:number): Promise<any>
  {
    if (this.indiceValido(indice)){this.indiceErrado();return;}
    
    return await this.metodoDeConsulta('getPaginaComVersoes',indice);
  }

  public async criarPagina(titulo: string, conteudo: string): Promise<any>
  {
    if (!titulo || (titulo.length == 0)){this.tituloErrado();return;}
    if (!conteudo || (conteudo.length == 0)){this.conteudoErrado();return;}
    
    return await this.enviarTransacao(this.contrato.methods.criarPagina(titulo, conteudo));
  }

  public async ativaDesativaBlockpedia(ativo:boolean): Promise<any>
  {
    return await this.enviarTransacao(this.contrato.methods.ativaDesativaBlockpedia(ativo));
  }

  public async adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(indice:number, conteudo: string): Promise<any>
  {
    if (this.indiceValido(indice)){this.indiceErrado();return;}
    if (!conteudo || (conteudo.length == 0)){this.conteudoErrado();return;}

    return await this.enviarTransacao(this.contrato.methods.adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(indice,conteudo));
  }

  public async ativaVersaoPorIndexVersoesEIndexPaginas(indicePagina:number, indiceVersoes:number): Promise<any>
  {
    if (this.indiceValido(indicePagina)){this.indiceErrado();return;}
    if (this.indiceValido(indiceVersoes)){this.indiceErrado();return;}
    
    return await this.enviarTransacao(this.contrato.methods.ativaVersaoPorIndexVersoesEIndexPaginas(indicePagina,indiceVersoes));
  }

  public async desativaPaginaPorIndexPaginas(indicePagina:number): Promise<any>
  {
    if (this.indiceValido(indicePagina)){this.indiceErrado();return;}
    
    return await this.enviarTransacao(this.contrato.methods.desativaPaginaPorIndexPaginas(indicePagina));
  }

  public async ativaPaginaPorIndexPaginas(indicePagina:number): Promise<any>
  {
    if (this.indiceValido(indicePagina)){this.indiceErrado();return;}
    
    return await this.enviarTransacao(this.contrato.methods.ativaPaginaPorIndexPaginas(indicePagina));
  }

  public async getPaginasPorTitulo(titulo: string): Promise<any>
  {
    if (!titulo || (titulo.length == 0)){this.conteudoErrado();return;}

    return await this.enviarTransacao(this.contrato.methods.getPaginasPorTitulo(titulo));
  }

}

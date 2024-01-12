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

  private toast(severidade:string, titulo:string, mensagem:string)
  {
    if(this.stringInvalida(severidade) || !(severidade === 'error' || severidade === 'info' || severidade === 'warnig' || severidade === 'success' ))
      severidade = 'error'

    if(this.stringInvalida(titulo))
      titulo = 'error'

    this.messageService.add({ severity: severidade, summary: titulo, detail: mensagem });
  }

  public indiceInvalido(indice:number):boolean{return (indice == null || indice == undefined || indice<0)}

  private stringInvalida(input: string): boolean {return (input==null || input==undefined || input.trim().length === 0)}

  public desconectarCarteira(): void {this.conta = null;this.web3 = null}

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
      } catch (error) {this.toast('','','Usuario recusou compartilhar sua conta')}
    } else {this.toast('','','Por favor, instale uma carteira Ethereum como a MetaMask para usar este aplicativo')}
  }

  private async enviarTransacao(method: any): Promise<any>
  {
    if (!this.conta){this.toast('','','Por favor, conectar a sua carteira');throw new Error('Sem permissao para acessar conta');}
    try{return await method.send({ from: this.conta });}
    catch (error){alert('Erro ao enviar transacao: '+ error);throw error;}
  }

  private async metodoDeConsulta(metrod : string,...args: any[]): Promise<any>
  {
    if (!this.conta){this.toast('','','Por favor, conectar a sua carteira');throw new Error('Sem permissao para acessar conta');}
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
    if (this.indiceInvalido(indice)){this.toast('','','Indice da pagina incorreto');return;}
    
    return await this.metodoDeConsulta('getPaginaComVersoes',indice);
  }

  public async criarPagina(titulo: string, conteudo: string): Promise<any>
  {
    if (this.stringInvalida(titulo)){this.toast('','','Titulo incorreto');return;}
    if (this.stringInvalida(conteudo)){this.toast('','','Conteudo incorreto');return;}
    
    return await this.enviarTransacao(this.contrato.methods.criarPagina(titulo, conteudo));
  }

  public async ativaDesativaBlockpedia(ativo:boolean): Promise<any>
  {
    return await this.enviarTransacao(this.contrato.methods.ativaDesativaBlockpedia(ativo));
  }

  public async adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(indice:number, conteudo: string): Promise<any>
  {
    if (this.indiceInvalido(indice)){this.toast('','','Indice da pagina incorreto');return;}
    if (this.stringInvalida(conteudo)){this.toast('','','Conteudo incorreto');return;}

    return await this.enviarTransacao(this.contrato.methods.adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(indice,conteudo));
  }

  public async ativaVersaoPorIndexVersoesEIndexPaginas(indicePagina:number, indiceVersoes:number): Promise<any>
  {
    if (this.indiceInvalido(indicePagina)){this.toast('','','Indice da pagina incorreto');return;}
    if (this.indiceInvalido(indiceVersoes)){this.toast('','','Indice da vercao incorreto');return;}
    
    return await this.enviarTransacao(this.contrato.methods.ativaVersaoPorIndexVersoesEIndexPaginas(indicePagina,indiceVersoes));
  }

  public async desativaPaginaPorIndexPaginas(indicePagina:number): Promise<any>
  {
    if (this.indiceInvalido(indicePagina)){this.toast('','','Indice da pagina incorreto');return;}
    
    return await this.enviarTransacao(this.contrato.methods.desativaPaginaPorIndexPaginas(indicePagina));
  }

  public async ativaPaginaPorIndexPaginas(indicePagina:number): Promise<any>
  {
    if (this.indiceInvalido(indicePagina)){this.toast('','','Indice da pagina incorreto');return;}
    
    return await this.enviarTransacao(this.contrato.methods.ativaPaginaPorIndexPaginas(indicePagina));
  }

  public async getPaginasPorTitulo(titulo: string): Promise<any>
  {
    if (this.stringInvalida(titulo)){this.toast('','','Titulo incorreto');return;}

    return await this.enviarTransacao(this.contrato.methods.getPaginasPorTitulo(titulo));
  }

}

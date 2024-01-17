import { Injectable } from '@angular/core';
import abiContratoBlockpedia from './../../solidity/abi/abi-blockpedia.json';
import Web3 from 'web3';
import { Blockpedia } from '../models/response/blockpedia.response';
import { TransformersService } from './transformers.service';
import { InputValidator } from '../util/inputValidator.service';
import { ToastService } from './toast.service';
import { Pagina } from '../models/response/pagina.response';

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

  constructor(
    private transformersService: TransformersService,
    private toastService: ToastService,
    private inputValidator: InputValidator
    ){
      this.web3 = new Web3(window.ethereum);
      this.contrato = new this.web3.eth.Contract(abiContratoBlockpedia, enderecoContrato);
    }

  public desconectarCarteira(): void {this.conta = null;this.web3 = null}

  public async validaConta(): Promise<void>
  {
    if(this.conta) return
    if(typeof window.ethereum !== 'undefined')
    {
      try
      {
        let contas = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.conta = contas[0]
      } catch (error) {this.toastService.toastErro('Usuario recusou compartilhar sua conta')}
    } else {this.toastService.toastErro('Por favor, instale uma carteira Ethereum como a MetaMask para usar esta funcao deste aplicativo')}
  }

  private async enviarTransacao(method: any): Promise<any>
  {
    if (!this.conta){await this.validaConta()}
    try{return await method.send({ from: this.conta });}
    catch (error){this.toastService.toastErro('Erro ao enviar transacao: '+ error)}
  }

  private async metodoDeConsulta(metrod : string,...args: any[]): Promise<any>
  {
    try{return await this.contrato.methods[metrod](...args).call();}
    catch (error){this.toastService.toastErro('Erro ao consultar: '+ error)}
  }

  public async getAllDadosBlockpedia(): Promise<Blockpedia>
  {
    return this.transformersService.transformarDadosRespostaEmBlockpedia(await this.metodoDeConsulta('getAllDadosBlockpedia'));
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
    if (this.inputValidator.indiceInvalido(indice)){this.toastService.toastErro('Indice da pagina incorreto')}
    
    return this.transformersService.transformarDadosRespostaEmPaginas(await this.metodoDeConsulta('getPaginaComVersoes',indice),indice);
  }

  public async criarPagina(titulo: string, conteudo: string): Promise<any>
  {
    if (this.inputValidator.stringVazia(titulo)){this.toastService.toastErro('Titulo incorreto')}
    if (this.inputValidator.stringVazia(conteudo)){this.toastService.toastErro('Conteudo incorreto')}
    
    return await this.enviarTransacao(this.contrato.methods.criarPagina(titulo, conteudo));
  }

  public async ativaDesativaBlockpedia(ativo:boolean): Promise<any>
  {
    return await this.enviarTransacao(this.contrato.methods.ativaDesativaBlockpedia(ativo));
  }

  public async adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(indice:number, conteudo: string): Promise<any>
  {
    if (this.inputValidator.indiceInvalido(indice)){this.toastService.toastErro('Indice da pagina incorreto')}
    if (this.inputValidator.stringVazia(conteudo)){this.toastService.toastErro('Conteudo incorreto')}

    return await this.enviarTransacao(this.contrato.methods.adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(indice,conteudo));
  }

  public async ativaVersaoPorIndexVersoesEIndexPaginas(indicePagina:number, indiceVersoes:number): Promise<any>
  {
    if (this.inputValidator.indiceInvalido(indicePagina)){this.toastService.toastErro('Indice da pagina incorreto')}
    if (this.inputValidator.indiceInvalido(indiceVersoes)){this.toastService.toastErro('Indice da vercao incorreto')}
    
    return await this.enviarTransacao(this.contrato.methods.ativaVersaoPorIndexVersoesEIndexPaginas(indicePagina,indiceVersoes));
  }

  public async desativaPaginaPorIndexPaginas(indicePagina:number): Promise<any>
  {
    if (this.inputValidator.indiceInvalido(indicePagina)){this.toastService.toastErro('Indice da pagina incorreto')}
    
    return await this.enviarTransacao(this.contrato.methods.desativaPaginaPorIndexPaginas(indicePagina));
  }

  public async ativaPaginaPorIndexPaginas(indicePagina:number): Promise<any>
  {
    if (this.inputValidator.indiceInvalido(indicePagina)){this.toastService.toastErro('Indice da pagina incorreto')}
    
    return await this.enviarTransacao(this.contrato.methods.ativaPaginaPorIndexPaginas(indicePagina));
  }

  public async getPaginasPorTitulo(titulo: string): Promise<any>
  {
    if (this.inputValidator.stringVazia(titulo)){this.toastService.toastErro('Titulo incorreto')}

    return await this.enviarTransacao(this.contrato.methods.getPaginasPorTitulo(titulo));
  }

}

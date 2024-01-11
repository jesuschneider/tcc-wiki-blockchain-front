import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import abiContratoBlockpedia from './../../solidity/abi-blockpedia.json';
import Web3 from 'web3';

declare let window: any;
const enderecoContrato = '0x4cdbb9Fbf164D485b7DA461DcE92267529325Db5'


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

  private async enviarTransacao(method: any): Promise<any>
  {
    try{return await method.send({ from: this.conta });}
    catch (error){alert('Erro ao enviar transação: '+ error);throw error;}
  }

  public async criarPagina(titulo: string, conteudo: string): Promise<any>
  {
    if (!this.conta){this.conectarACarteira();return;}
    if (!titulo || (titulo.length == 0)){this.tituloErrado();return;}
    if (!conteudo || (conteudo.length == 0)){this.conteudoErrado();return;}
    
    return await this.enviarTransacao(this.contrato.methods.criarPagina(titulo, conteudo));
  }

  public async getConteudoVersaoValidaPorIndexPaginas(indice: number): Promise<any>
  {
    if (!this.conta){this.conectarACarteira();throw new Error('Contrato não está inicializado');}
    if (!indice ||(indice<0)){this.indiceErrado();return;}

    return await this.contrato.methods.getConteudoVersaoValidaPorIndexPaginas(indice).call();
  }

  public async ativaDesativaBlockpedia(ativo:boolean): Promise<any>
  {
    if (!this.conta){this.conectarACarteira();throw new Error('Contrato não está inicializado');}

    return await this.enviarTransacao(this.contrato.methods.ativaDesativaBlockpedia(ativo));
  }

  public desconectarCarteira(): void {this.conta = null;this.web3 = null}

  public aceitarCompartilhar(){alert("Usuário recusou compartilhar sua conta")}

  public tituloErrado(){alert("Titulo incorreto")}

  public conteudoErrado(){alert("Conteudo incorreto")}

  public indiceErrado(){alert("Indice incorreto")}

  public instalarCarteira(){alert("Por favor, instale uma carteira Ethereum como a MetaMask para usar este aplicativo")}

  public conectarACarteira(){alert("Por favor, conectar a sua carteira")}
}

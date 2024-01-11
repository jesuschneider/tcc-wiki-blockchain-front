import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import abiContratoBlockpedia from './../../solidity/abi-blockpedia.json';
import Web3 from 'web3';

declare let window: any;
const enderecoContrato = '0x4cdbb9Fbf164D485b7DA461DcE92267529325Db5'


@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3: any;
  private conta: any;
  private contrato: any;

  constructor(private messageService: MessageService)
  {
    this.inicializarWeb3();
  }

  public async inicializarWeb3(): Promise<void> {
    if(this.conta !=null || this.conta!=undefined) return
    if(typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      try {
        let contas = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.conta = contas[0]
        this.contrato = new this.web3.eth.Contract(abiContratoBlockpedia, enderecoContrato);
      } catch (error) {this.aceitarCompartilhar()}
    } else {this.instalarCarteira()}
  }

  public aceitarCompartilhar(){alert("Usuário recusou compartilhar sua conta")}

  public instalarCarteira(){alert("Por favor, instale uma carteira Ethereum como a MetaMask para usar este aplicativo")}

  public conectarACarteira(){alert("Por favor, conectar a sua carteira")}

  public desconectarCarteira(): void {this.conta = null;this.web3 = null}


  public async criarPagina(titulo: string, conteudo: string): Promise<void> {
    if (this.conta==null || this.conta==undefined){this.conectarACarteira();return;}
    
    return this.enviarTransacao(this.contrato.methods.criarPagina(titulo, conteudo));
  }

  
  private async enviarTransacao(method: any): Promise<void> {
    this.web3
    this.conta
    this.contrato
    try {
      await method.send({ from: this.conta });
    } catch (error) {
      console.error('Erro ao enviar transação:', error);
      throw error;
    }
  }

}

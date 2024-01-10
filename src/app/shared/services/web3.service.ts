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

  constructor(
    private messageService: MessageService,
    )
  {
    this.inicializarWeb3();
    console.log(abiContratoBlockpedia)
  }

  public async inicializarWeb3(): Promise<void> {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      try {
        const contas = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.conta = contas[0];
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Usuário recusou compartilhar sua conta.',
        });
      }
    } else {
      this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Por favor, instale uma carteira Ethereum como a MetaMask para usar este aplicativo.',
      });
    }
  }

  public async verificarContaCarteira():Promise<void> {
    if(this.conta == null || this.conta == undefined)
      return this.inicializarWeb3();
  }

  criarPagina(titulo: string, conteudo: string): any {
    throw new Error('Method not implemented.');
  }
  enviarTransacao(arg0: () => any) {
    throw new Error('Method not implemented.');
  }

}

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: any;
  private conta: any;

  constructor(private messageService: MessageService,) {
    
    console.log('teste')
    this.inicializarWeb3();
  }

  private async inicializarWeb3(): Promise<void> {
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

}

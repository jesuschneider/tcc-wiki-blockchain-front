import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Web3Service } from './shared/services/web3.service';
import { MessageService } from 'primeng/api';

//verificar sccs do app (toast errado)
//melhorar desconectar conectar a carteira
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'blockpedia';

  titulo: string = '';
  conteudo: string = '';

  constructor(
    private web3Service: Web3Service,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {}

  criarPagina() {
    if (!this.titulo || !this.conteudo) {
      alert("Necessario preencher o titulo e conteudo para continuar")
      return;
    }

    
    this.web3Service.criarPagina(this.titulo, this.conteudo)
    
  }

  inicializarWeb3() {this.web3Service.inicializarWeb3();}

  desconectarCarteira() {this.web3Service.desconectarCarteira();}

  
}

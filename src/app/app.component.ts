import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Web3Service } from './shared/services/web3.service';
import { MessageService } from 'primeng/api';

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
      this.messageService.add({
        severity: 'warning',
        summary: 'Aviso',
        detail: 'Necessario preencher o titulo e conteudo para continuar',
      });
      return;
    }

    this.web3Service.enviarTransacao(() => 
      this.web3Service.criarPagina(this.titulo, this.conteudo)
    );
  }

  
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Web3Service } from './shared/services/web3.service';
import { MessageService } from 'primeng/api';
import { Pagina } from './shared/models/response/pagina.response';

//verificar sccs do app (toast errado)
//melhorar desconectar conectar a carteira
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'blockpedia';

  tituloCadastro: string = '';
  conteudoCadastro: string = '';

  indicePaginaPesquisa: number = 0;
  conteudoAtivoPagina: string | null = null;

  paginaSelecionada: Pagina | null = null;

  constructor(
    private web3Service: Web3Service,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {}

  criarPagina(){this.web3Service.criarPagina(this.tituloCadastro, this.conteudoCadastro).then(conteudo => {}).catch(error => {})}

  desativaBlockpedia(){this.web3Service.ativaDesativaBlockpedia(false).then(conteudo => {}).catch(error => {});}

  ativaBlockpedia(){this.web3Service.ativaDesativaBlockpedia(true).then(conteudo => {}).catch(error => {});}

  inicializarWeb3() {this.web3Service.inicializarWeb3();}

  desconectarCarteira() {this.web3Service.desconectarCarteira();}

  /*
  buscarConteudoPagina()
  {
    this.web3Service.getConteudoVersaoValidaPorIndexPaginas(this.indicePaginaPesquisa)
      .then(conteudo => {
        this.conteudoAtivoPagina = conteudo;
      })
      .catch(error => {
        this.conteudoAtivoPagina = null;
      });
  }
  */



}

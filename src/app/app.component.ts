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

  funcaoSelecionada:number= 0;

  indicePagina: number = 0;
  indiceVercao: number = 0;
  tituloCadastro: string = '';
  conteudoCadastro: string = '';

  constructor(
    private web3Service: Web3Service,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {}

  ativafuncao()
  {
    if(this.funcaoSelecionada==1)
      this.web3Service.getAllDadosBlockpedia().then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==2)
      this.web3Service.getInformacoesBlockpedia().then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==3)
      this.web3Service.getAllPaginasComTodasVersoes().then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==4)
      this.web3Service.getAllPaginasAtivas().then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==5)
      this.web3Service.getAllPaginasAtivasSomenteComAsVersoesAtivas().then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==6)
      this.web3Service.getPaginaComVersoes(this.indicePagina).then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==7)
      this.web3Service.criarPagina(this.tituloCadastro,this.conteudoCadastro).then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==8)
      this.web3Service.ativaDesativaBlockpedia(true).then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==9)
      this.web3Service.ativaDesativaBlockpedia(false).then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==10)
      this.web3Service.adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(this.indicePagina,this.conteudoCadastro).then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==11)
      this.web3Service.ativaVersaoPorIndexVersoesEIndexPaginas(this.indicePagina,this.indiceVercao).then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==12)
      this.web3Service.desativaPaginaPorIndexPaginas(this.indicePagina).then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==13)
      this.web3Service.ativaPaginaPorIndexPaginas(this.indicePagina).then(resposta => {console.log(resposta)}).catch(error => {})
    if(this.funcaoSelecionada==14)
      this.web3Service.getPaginasPorTitulo(this.tituloCadastro).then(resposta => {console.log(resposta)}).catch(error => {})
  }

}

import { Component, OnInit } from '@angular/core';
import { Web3Service } from './shared/services/web3.service';

//MELHORIA
//talvez fazer um jeito de saber que usuario ativou a vercao valida para facilitar rastreabilidade
//melhorar apresentacao do app
//formatar data pra apresentar

//CORRIGIR
//verificar sccs do app (toast errado)
//arrumar erro do carregamento do titulo no browser
//fazer uma busca pagina para n carrega toda blockpedia

//ADICIONAR
//adicionar campo para buscar paginas por titulo e ao clicar selecionar ela(colocar o titulo, vercao etc)
//adicionar botão para adicionar nova pagina
//TALVEZ ADICIONAR
//adicionar botão para desativar blockpedia
//melhoria para verificar de titulo existe antes de adicionar pagina,
//melhoria para bater input de indice com tamanho total das paginas/vercoes
//melhoria fazer busca de paginas/vercoes tbm trazer o indice pela junto

//adicionar aba com todas as vercoes da pagina
//dentro dessa pagina tem o botão de ativar vercao
//


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

  public dados: any;

  constructor(private web3Service: Web3Service) {}

  ngOnInit(): void {this.ativafuncao()}

  ativafuncao(funcaoSelecionadaParametro:any=1)
  {      
    if(funcaoSelecionadaParametro!=null && funcaoSelecionadaParametro!=null && funcaoSelecionadaParametro>0)
      this.funcaoSelecionada=funcaoSelecionadaParametro

    if(this.funcaoSelecionada===1)
      this.web3Service.getAllDadosBlockpedia().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})  
    if(this.funcaoSelecionada===2)
      this.web3Service.getInformacoesBlockpedia().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===3)
      this.web3Service.getAllPaginasComTodasVersoes().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===4)
      this.web3Service.getAllPaginasAtivas().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===5)
      this.web3Service.getAllPaginasAtivasSomenteComAsVersoesAtivas().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===6)
      this.web3Service.getPaginaComVersoes(this.indicePagina).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {}) 
    if(this.funcaoSelecionada===7)
      this.web3Service.criarPagina(this.tituloCadastro,this.conteudoCadastro).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===8)
      this.web3Service.ativaDesativaBlockpedia(true).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===9)
      this.web3Service.ativaDesativaBlockpedia(false).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===10)
      this.web3Service.adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(this.indicePagina,this.conteudoCadastro).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===11)
      this.web3Service.ativaVersaoPorIndexVersoesEIndexPaginas(this.indicePagina,this.indiceVercao).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===12)
      this.web3Service.desativaPaginaPorIndexPaginas(this.indicePagina).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===13)
      this.web3Service.ativaPaginaPorIndexPaginas(this.indicePagina).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada===14)
      this.web3Service.getPaginasPorTitulo(this.tituloCadastro).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
  }

}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function() { return this.toString() }
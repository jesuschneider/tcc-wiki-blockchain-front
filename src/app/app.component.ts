import { Component, OnInit } from '@angular/core';
import { Web3Service } from './shared/services/web3.service';
import { Pagina } from './shared/models/response/pagina.response';
import { Blockpedia } from './shared/models/response/blockpedia.response';
import { Versao } from './shared/models/response/versao.response';
import { ToastService } from './shared/services/toast.service';


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

  public dados!: Blockpedia;

  public paginaSelecionada!:Pagina;
  public versaoSelecionada!:Versao;

  constructor(
    private web3Service: Web3Service,
    private toastService: ToastService,
    ) {}

  ngOnInit(): void 
  {
    this.carregaPaginaInicial();
  }

  carregaPaginaInicial()
  {
    this.web3Service.getAllDadosBlockpedia().then(resposta => 
    {
      this.dados=resposta
      this.setPaginaEVersao(resposta.paginas[0])
    }).catch(error => {console.log(error)})
  }

  getVercaoAtiva(pagina: Pagina):Versao {
    for (let i = 0; i < pagina.versoes.length; i++)
    {
      if(pagina.versoes[i].ativo)return pagina.versoes[i]
    }
    this.toastService.toastErro('Pagina nao contem versao valida');
    throw Error('Pagina nao contem versao valida');
  }

  adicionaNovaVercaoDesativadaAPaginaSelecionada()
  {
    this.web3Service.adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(
      this.paginaSelecionada.indicePaginas,
      this.conteudoCadastro)
      .then(resposta => {this.recarregaPaginaAtual()})
      .catch(error => {})
  }

  recarregaPaginaAtual(){this.carregaPaginaPorIndexPaginas(this.paginaSelecionada.indicePaginas)}

  carregaPaginaPorIndexPaginas(indice:number)
  {
    this.web3Service.getPaginaComVersoes(indice)
    .then(resposta => {this.setPaginaEVersao(resposta)})
    .catch(error => {})
  }

  setPaginaEVersao(pagicaCompleta:Pagina)
  {
    this.paginaSelecionada = structuredClone(pagicaCompleta)
    this.versaoSelecionada = this.getVercaoAtiva(this.paginaSelecionada)
  }

  alteraAtivoDesativaPagina()
  {
    if(this.paginaSelecionada.ativo)
      this.web3Service.ativaPaginaPorIndexPaginas(this.paginaSelecionada.indicePaginas)
        .then(resposta => {this.recarregaPaginaAtual()})
        .catch(error => {})
    if(!this.paginaSelecionada.ativo)
      this.web3Service.desativaPaginaPorIndexPaginas(this.paginaSelecionada.indicePaginas)
        .then(resposta => {this.recarregaPaginaAtual()})
        .catch(error => {})
  }



  ativafuncao(numeroFuncao:number=0)
  {      
    if(numeroFuncao==2)
      this.web3Service.getInformacoesBlockpedia().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==3)
      this.web3Service.getAllPaginasComTodasVersoes().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==4)
      this.web3Service.getAllPaginasAtivas().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==5)
      this.web3Service.getAllPaginasAtivasSomenteComAsVersoesAtivas().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==7)
      this.web3Service.criarPagina(this.tituloCadastro,this.conteudoCadastro).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==8)
      this.web3Service.ativaDesativaBlockpedia(true).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==9)
      this.web3Service.ativaDesativaBlockpedia(false).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==10)
      this.web3Service.adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(this.indicePagina,this.conteudoCadastro).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==11)
      this.web3Service.ativaVersaoPorIndexVersoesEIndexPaginas(this.indicePagina,this.indiceVercao).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==12)
      this.web3Service.desativaPaginaPorIndexPaginas(this.indicePagina).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==13)
      this.web3Service.ativaPaginaPorIndexPaginas(this.indicePagina).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(numeroFuncao==14)
      this.web3Service.getPaginasPorTitulo(this.tituloCadastro).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
  }

}
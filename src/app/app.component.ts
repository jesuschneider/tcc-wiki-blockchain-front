import { Component, OnInit } from '@angular/core';
import { Web3Service } from './shared/services/web3.service';
import { Pagina } from './shared/models/response/pagina.response';
import { Blockpedia } from './shared/models/response/blockpedia.response';
import { Versao } from './shared/models/response/versao.response';
import { ToastService } from './shared/services/toast.service';

//verificar sccs do app (toast errado)

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
      this.paginaSelecionada=resposta.paginas[0]

      this.versaoSelecionada = this.getVercaoAtiva(this.paginaSelecionada)


    }).catch(error => {console.log(error)})
  }

  getVercaoAtiva(paginaSelecionada: Pagina):Versao {
    for (let i = 0; i < this.paginaSelecionada.versoes.length; i++)
    {
      if(this.paginaSelecionada.versoes[i].ativo)return this.paginaSelecionada.versoes[i]
    }
    this.toastService.toastErro('Pagina nao contem versao valida');
    throw Error('Pagina nao contem versao valida');
  }

  ativafuncao()
  {      
    if(this.funcaoSelecionada==2)
      this.web3Service.getInformacoesBlockpedia().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==3)
      this.web3Service.getAllPaginasComTodasVersoes().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==4)
      this.web3Service.getAllPaginasAtivas().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==5)
      this.web3Service.getAllPaginasAtivasSomenteComAsVersoesAtivas().then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==6)
      this.web3Service.getPaginaComVersoes(this.indicePagina).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==7)
      this.web3Service.criarPagina(this.tituloCadastro,this.conteudoCadastro).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==8)
      this.web3Service.ativaDesativaBlockpedia(true).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==9)
      this.web3Service.ativaDesativaBlockpedia(false).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==10)
      this.web3Service.adicionaNovaVercaoDesativadaAPaginaPorIndexPaginas(this.indicePagina,this.conteudoCadastro).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==11)
      this.web3Service.ativaVersaoPorIndexVersoesEIndexPaginas(this.indicePagina,this.indiceVercao).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==12)
      this.web3Service.desativaPaginaPorIndexPaginas(this.indicePagina).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==13)
      this.web3Service.ativaPaginaPorIndexPaginas(this.indicePagina).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
    if(this.funcaoSelecionada==14)
      this.web3Service.getPaginasPorTitulo(this.tituloCadastro).then(resposta => {console.log(resposta);this.dados=resposta}).catch(error => {})
  }

}
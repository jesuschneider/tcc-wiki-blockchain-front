import { Injectable } from "@angular/core";
import { MessageService } from 'primeng/api';
import { InputValidator } from "../util/inputValidator.service";

@Injectable({
    providedIn: 'root'
  })
  export class ToastService
  {
    constructor(
        private messageService: MessageService,
        private inputValidator: InputValidator
        ){}

    public toast(severidade:string, titulo:string, mensagem:string, erro:boolean = false)
    {
      if(this.inputValidator.stringVazia(severidade) || !(severidade === 'error' || severidade === 'info' || severidade === 'warnig' || severidade === 'success' ))
        severidade = 'error'
  
      if(this.inputValidator.stringVazia(titulo))
        titulo = 'Erro'
  
      this.messageService.add({ severity: severidade, summary: titulo, detail: mensagem });
      if(erro) throw Error(mensagem)
    } 

    public toastErro(titulo:string, erro:boolean = true)
    {
        return this.toast('','',titulo,erro)
    }  
    
  }
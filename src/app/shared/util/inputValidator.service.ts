import { Injectable } from "@angular/core";
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
  })
  export class InputValidator
  {
    constructor(){}

    public indiceInvalido(indice:number):boolean{return (indice == null || indice == undefined || indice<0)}

    public stringVazia(input: string): boolean {return (input==null || input==undefined || input.trim().length === 0)}
  
  }
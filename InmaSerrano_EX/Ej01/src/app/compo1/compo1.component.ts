import { compileInjectable } from '@angular/compiler';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Component, AfterContentChecked, SimpleChange, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-compo1',
  templateUrl: './compo1.component.html',
  styleUrls: ['./compo1.component.css']
})


export class Compo1Component {

    //Cogemos los datos del componente padre:
  @Input() nombre: string;
  @Input() primerApellido: string;
  @Input() edad: number;
  aux1: string;
  aux2: string;

    //Usams un decorador:
  @Output() password = new EventEmitter<string>();

    //Emitimos los datos al padre:
    generatePassword(){
      this.password.emit(this.nombre + "ajs89/" + this.primerApellido + this.edad);
    }

    generatePasswordCompleja(){
      this.password.emit(this.nombre + this.primerApellido + this.edad);
    }

    ngAfterContentChecked() {
    /* Función para el calculo de caracteres aleatorios*/
      // aleatorio(){
      //   let result = '';
      //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-/?!';
      //   //const charactersLength = characters.length;
      //   for (let i = 0; i < 5; i++) {
      //       result += characters.charAt(Math.floor(Math.random() * characters.length));
      //   }
      //     return result;
      //   }

    }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    nombre: string = "";
    primerApellido: string;
    edad: number;
    resultadoP: string;

    capturaResultado(event){
      this.resultadoP = event;
    }
}



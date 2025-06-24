import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4 max-w-md mx-auto text-center">
      <p class="text-lg mb-4">Valor del dólar = {{ dolar }} CLP</p>
      <h1 class="text-3xl font-bold mb-6">Simulador de Premios</h1>

      <div class="mb-8" *ngFor="let premio of premios">
        <img [src]="premio.img" [alt]="premio.nombre" class="mx-auto w-40 h-auto mb-2 rounded shadow" />
        <input
          [(ngModel)]="premio.valor"
          type="number"
          class="border w-full text-lg p-2 rounded mb-2 text-center"
        />
        <p class="text-lg">Ud cobrará {{ premio.calc(premio.valor) }} millones de pesos</p>
      </div>
    </div>
  `
})
export class AppComponent {
  dolar = 950;

  premios = [
    {
      nombre: 'Loto',
      img: 'assets/loto.png',
      valor: 0,
      calc: (v: number) => Math.round(v * 0.83)
    },
    {
      nombre: 'Kino',
      img: 'assets/kino.png',
      valor: 0,
      calc: (v: number) => Math.round(v * 0.83)
    },
    {
      nombre: 'MegaMillions',
      img: 'assets/megamillions.png',
      valor: 0,
      calc: (v: number) => Math.round(v * 0.32 * 0.72 * this.dolar)
    }
  ];
}

bootstrapApplication(AppComponent);

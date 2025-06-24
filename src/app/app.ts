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
      <p class="text-sm text-gray-600 mb-2">Valor del dólar = {{ valorDolar }} CLP</p>
      <h1 class="text-2xl font-bold mb-6">Simulador de Premios</h1>

      <div *ngFor="let premio of premios" class="mb-10">
        <img [src]="premio.img" [alt]="premio.nombre" class="mx-auto w-40 h-auto mb-2" />
        <input [(ngModel)]="premio.valor" type="number" class="p-2 border text-lg w-40 text-center" />
        <p class="mt-2 text-base">Ud cobrará {{ premio.calcular(premio.valor) }} millones de pesos</p>
      </div>
    </div>
  `
})
export class AppComponent {
  valorDolar = 950;

  premios = [
    {
      nombre: 'Loto',
      img: 'assets/loto.png',
      valor: 0,
      calcular: (valor: number) => Math.round(valor * 0.83)
    },
    {
      nombre: 'Kino',
      img: 'assets/kino.png',
      valor: 0,
      calcular: (valor: number) => Math.round(valor * 0.83)
    },
    {
      nombre: 'MegaMillions',
      img: 'assets/megamillions.png',
      valor: 0,
      calcular: (valor: number) => Math.round(valor * 0.32 * 0.72 * 950)
    }
  ];
}

bootstrapApplication(AppComponent);
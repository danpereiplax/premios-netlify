import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-8">
      <h1 class="text-4xl font-bold mb-6">Simulador de Premios</h1>

      <div class="mb-6">
        <img src="assets/loto.png" alt="Loto" class="inline-block w-6 h-6" />
        <input [(ngModel)]="loto" type="number" class="border ml-2 p-1" />
        <p class="mt-2">Ud cobrará {{ calcularLotoKino(loto) }} millones de pesos</p>
      </div>

      <div class="mb-6">
        <img src="assets/kino.png" alt="Kino" class="inline-block w-6 h-6" />
        <input [(ngModel)]="kino" type="number" class="border ml-2 p-1" />
        <p class="mt-2">Ud cobrará {{ calcularLotoKino(kino) }} millones de pesos</p>
      </div>

      <div class="mb-6">
        <img src="assets/megamillions.png" alt="MegaMillions" class="inline-block w-6 h-6" />
        <input [(ngModel)]="mega" type="number" class="border ml-2 p-1" />
        <p class="mt-2">Ud cobrará {{ calcularMega(mega) }} millones de pesos</p>
      </div>
    `
})
export class AppComponent {
  loto = 0;
  kino = 0;
  mega = 0;

  calcularLotoKino(valor: number): number {
    return Math.round(valor * 0.83); // 17% de descuento
  }

  calcularMega(valor: number): number {
    return Math.round(valor * 0.32 * 0.72 * 935); // fórmula exacta de tu Excel
  }
}

bootstrapApplication(AppComponent);

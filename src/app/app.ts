import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-md mx-auto text-center">
      <p class="text-sm mb-4">Valor del dólar = {{ dolar }} CLP</p>
      <h1 class="text-2xl font-bold mb-6">Simulador de Premios</h1>

      <div class="mb-6 flex flex-col items-center">
        <img src="assets/loto.png" alt="Loto" class="w-40 mb-2" />
        <input [(ngModel)]="loto" type="number" class="border p-2 w-full max-w-xs mb-2 text-center" />
        <p class="text-sm">Ud cobrará {{ calcularLotoKino(loto) }} millones de pesos</p>
      </div>

      <div class="mb-6 flex flex-col items-center">
        <img src="assets/kino.png" alt="Kino" class="w-40 mb-2" />
        <input [(ngModel)]="kino" type="number" class="border p-2 w-full max-w-xs mb-2 text-center" />
        <p class="text-sm">Ud cobrará {{ calcularLotoKino(kino) }} millones de pesos</p>
      </div>

      <div class="mb-6 flex flex-col items-center">
        <img src="assets/megamillions.png" alt="MegaMillions" class="w-40 mb-2" />
        <input [(ngModel)]="mega" type="number" class="border p-2 w-full max-w-xs mb-2 text-center" />
        <p class="text-sm">Ud cobrará {{ calcularMega(mega) }} millones de pesos</p>
      </div>
    </div>
  `
})
export class AppComponent {
  loto = 0;
  kino = 0;
  mega = 0;
  dolar = 950;

  calcularLotoKino(valor: number): number {
    return Math.round(valor * 0.83); // 17% descuento
  }

  calcularMega(valor: number): number {
    return Math.round(valor * 0.32 * 0.72 * this.dolar);
  }
}

bootstrapApplication(AppComponent);

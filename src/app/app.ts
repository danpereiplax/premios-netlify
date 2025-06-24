import { Component, effect, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4 max-w-md mx-auto text-center">
      <p class="text-sm mb-4">Valor del dólar = {{ dolar() }} CLP</p>
      <h1 class="text-2xl font-bold mb-6">Simulador de Premios</h1>

      <div class="mb-8">
        <img src="assets/loto.png" alt="Loto" class="w-32 mx-auto mb-2" />
        <input [(ngModel)]="loto" type="number" class="w-full p-3 text-lg border rounded" placeholder="Monto Loto" />
        <p class="mt-3 text-base font-medium">Ud cobrará {{ calcularLotoKino(loto) }} millones de pesos</p>
      </div>

      <div class="mb-8">
        <img src="assets/kino.png" alt="Kino" class="w-32 mx-auto mb-2" />
        <input [(ngModel)]="kino" type="number" class="w-full p-3 text-lg border rounded" placeholder="Monto Kino" />
        <p class="mt-3 text-base font-medium">Ud cobrará {{ calcularLotoKino(kino) }} millones de pesos</p>
      </div>

      <div class="mb-8">
        <img src="assets/megamillions.png" alt="MegaMillions" class="w-32 mx-auto mb-2" />
        <input [(ngModel)]="mega" type="number" class="w-full p-3 text-lg border rounded" placeholder="Monto MegaMillions" />
        <p class="mt-3 text-base font-medium">Ud cobrará {{ calcularMega(mega) }} millones de pesos</p>
      </div>
    </div>
  `
})
export class AppComponent {
  loto = 0;
  kino = 0;
  mega = 0;

  dolar = signal(935); // Valor inicial de respaldo

  constructor() {
    fetch('https://findic.cl/api/')
      .then(res => res.json())
      .then(data => {
        if (data?.dolar?.valor) {
          this.dolar.set(Math.round(data.dolar.valor));
        }
      })
      .catch(() => {
        console.warn('No se pudo obtener el valor del dólar desde la API, usando valor por defecto.');
      });
  }

  calcularLotoKino(valor: number): number {
    return Math.round(valor * 0.83); // 17% de descuento
  }

  calcularMega(valor: number): number {
    return Math.round(valor * 0.32 * 0.72 * this.dolar());
  }
}

bootstrapApplication(AppComponent);

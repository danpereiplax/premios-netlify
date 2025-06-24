import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="p-4 max-w-md mx-auto text-center">
      <p class="text-sm mb-4 text-gray-600">Valor del dólar: <strong>{{ dolar }}</strong> pesos</p>

      <h1 class="text-2xl font-bold mb-6">Simulador de Premios</h1>

      <div class="mb-8" *ngFor="let juego of juegos">
        <img [src]="juego.imagen" [alt]="juego.nombre" class="w-24 h-24 mx-auto mb-3 rounded shadow" />
        <input [(ngModel)]="juego.valor" type="number"
          class="border p-2 w-full text-center rounded mb-1 outline-none focus:ring-2 focus:ring-blue-300" />
        <p class="text-sm text-gray-700">Ud cobrará <strong>{{ calcular(juego) }}</strong> millones de pesos</p>
      </div>
    `
})
export class AppComponent {
  private http = inject(HttpClient);

  dolar: number = 0;

  juegos = [
    { nombre: 'Loto', imagen: 'assets/loto.png', valor: 0, tipo: 'nacional' },
    { nombre: 'Kino', imagen: 'assets/kino.png', valor: 0, tipo: 'nacional' },
    { nombre: 'MegaMillions', imagen: 'assets/megamillions.png', valor: 0, tipo: 'mega' }
  ];

  constructor() {
    this.http.get<any>('https://findic.cl/api/').subscribe(data => {
      this.dolar = data.dolar.valor;
    });
  }

  calcular(juego: any): number {
    if (juego.tipo === 'nacional') {
      return Math.round(juego.valor * 0.83);
    } else if (juego.tipo === 'mega') {
      return Math.round(juego.valor * 0.32 * 0.72 * this.dolar);
    }
    return 0;
  }
}

bootstrapApplication(AppComponent);

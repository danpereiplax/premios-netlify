import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="p-6 text-center space-y-8">
      <h1 class="text-3xl font-bold">Simulador de Premios</h1>

      <!-- Loto -->
      <div>
        <img src="assets/loto.png" alt="Loto" class="mx-auto w-52 rounded" />
        <input type="number" [(ngModel)]="lotoInput" class="border mt-2 p-1 text-center" placeholder="Millones de CLP" />
        <p *ngIf="lotoInput !== null">Ud cobrará {{ calcularCLP(lotoInput) | number:'1.0-0' }} millones de pesos</p>
      </div>

      <!-- Kino -->
      <div>
        <img src="assets/kino.png" alt="Kino" class="mx-auto w-52 rounded" />
        <input type="number" [(ngModel)]="kinoInput" class="border mt-2 p-1 text-center" placeholder="Millones de CLP" />
        <p *ngIf="kinoInput !== null">Ud cobrará {{ calcularCLP(kinoInput) | number:'1.0-0' }} millones de pesos</p>
      </div>

      <!-- MegaMillions -->
      <div>
        <img src="assets/megamillions.png" alt="MegaMillions" class="mx-auto w-52 rounded" />
        <input type="number" [(ngModel)]="megaInput" class="border mt-2 p-1 text-center" placeholder="Millones de USD" />
        <p *ngIf="megaInput !== null && dolar">Ud cobrará {{ calcularUSD(megaInput) | number:'1.0-0' }} millones de pesos</p>
        <p *ngIf="!dolar">Cargando valor del dólar...</p>
      </div>
    </div>
  `
})
export class AppComponent {
  lotoInput: number | null = null;
  kinoInput: number | null = null;
  megaInput: number | null = null;
  dolar: number | null = null;

  constructor(private http: HttpClient) {
    this.http.get<any>('https://findic.cl/api/').subscribe({
      next: data => this.dolar = data?.dolar?.valor,
      error: () => this.dolar = null
    });
  }

  calcularCLP(monto: number): number {
    return Math.round(monto * 1000000 * 0.83 / 1000000);
  }

  calcularUSD(monto: number): number {
    if (!this.dolar) return 0;
    let totalCLP = monto * this.dolar;
    totalCLP = totalCLP * 0.32; // aplica 68% de descuento
    totalCLP = totalCLP * 0.42; // otro 58% de descuento
    return Math.round(totalCLP / 1000000); // millones de CLP
  }
}

bootstrapApplication(AppComponent);

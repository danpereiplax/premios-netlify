import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .container {
      max-width: 400px;
      margin: 0 auto;
      text-align: center;
    }
    .image {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1rem auto;
    }
    input {
      width: 80%;
      padding: 10px;
      margin-top: 0.5rem;
      font-size: 1rem;
    }
    p {
      font-size: 1.1rem;
      margin: 0.5rem 0 2rem 0;
    }
    h1 {
      margin-bottom: 2rem;
    }
  `],
  template: `
    <div class="container">
      <p>Valor del dólar = {{ dolar }} CLP</p>
      <h1>Simulador de Premios</h1>

      <div>
        <img src="assets/loto.png" alt="Loto" class="image" />
        <input [(ngModel)]="loto" type="number" min="0" (keypress)="soloNumeros($event)" />
        <p>Ud cobrará {{ calcularLotoKino(loto) | number:'1.0-0' }} millones de pesos</p>
      </div>

      <div>
        <img src="assets/kino.png" alt="Kino" class="image" />
        <input [(ngModel)]="kino" type="number" min="0" (keypress)="soloNumeros($event)" />
        <p>Ud cobrará {{ calcularLotoKino(kino) | number:'1.0-0' }} millones de pesos</p>
      </div>

      <div>
        <img src="assets/megamillions.png" alt="MegaMillions" class="image" />
        <input [(ngModel)]="mega" type="number" min="0" (keypress)="soloNumeros($event)" />
        <p>Ud cobrará {{ calcularMega(mega) | number:'1.0-0' }} millones de pesos</p>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  loto = 0;
  kino = 0;
  mega = 0;
  dolar = 950;

  private http = inject(HttpClient);

  ngOnInit() {
    this.http.get<any>('https://mindicador.cl/api/dolar').subscribe({
      next: data => {
        if (data?.serie?.[0]?.valor) {
          this.dolar = Math.round(data.serie[0].valor);
        }
      },
      error: () => {
        console.warn('No se pudo obtener el valor del dólar, se usa valor por defecto.');
      }
    });
  }

  calcularLotoKino(valor: number): number {
    return Math.round(valor * 0.83);
  }

  calcularMega(valor: number): number {
    return Math.round(valor * 0.32 * 0.72 * this.dolar);
  }

  soloNumeros(event: KeyboardEvent): void {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }
}

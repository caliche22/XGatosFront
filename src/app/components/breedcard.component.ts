import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breed } from '../interfaces/breed.interface';

@Component({
  standalone: true,
  selector: 'app-breed-card',
  imports: [CommonModule],
  template: `
  <div class="card" *ngIf="breed">
    <h2>{{ breed.name }}</h2>
    <p><strong>Origen:</strong> {{breed.origin || 'N/D'}}</p>
    <p><strong>Temperamento:</strong> {{breed.temperament || 'N/D'}}</p>
    <p><strong>Vida:</strong> {{breed.life_span || 'N/D'}} años</p>
    <p class="desc">{{breed.description}}</p>
  </div>
  `,
  styles:[`
    .card { padding:1rem; border-radius:16px; background:#fff; box-shadow:0 2px 12px rgba(0,0,0,.08); margin-bottom:1rem;}
    .desc { opacity:.85; }
  `]
})
export class BreedCardComponent {
  @Input() breed: Breed | null = null;
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatImage } from '../interfaces/image.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-carousel',
  imports: [CommonModule, MatButtonModule],
  template: `
  <div class="carousel" *ngIf="images?.length">
    <button mat-raised-button (click)="prev()">&lt;</button>
    <img [src]="images[idx].url" [alt]="images[idx].id" />
    <button mat-raised-button (click)="next()">&gt;</button>
  </div>
  `,
  styles: [`
    .carousel { display:flex; align-items:center; justify-content:center; gap:1rem; flex-wrap: nowrap; margin:1rem 0; }
    img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.15); }
    @media (max-width:768px){ .carousel{ flex-wrap:wrap } }
  `]
})
export class CarouselComponent {
  @Input() images: CatImage[] = [];
  idx = 0;
  next() { this.idx = (this.idx + 1) % this.images.length; }
  prev() { this.idx = (this.idx - 1 + this.images.length) % this.images.length; }
}

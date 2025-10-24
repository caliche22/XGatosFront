import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { BreedsService } from '../../services/breeds.service';
import { ImagesService } from '../../services/images.service';
import { Breed } from '../../interfaces/breed.interface';
import { CatImage } from '../../interfaces/image.interface';
import { CarouselComponent } from '../../components/carousel.component';
import { BreedCardComponent } from '../../components/breedcard.component';

import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatSelectModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    CarouselComponent, BreedCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private breedsSvc = inject(BreedsService);
  private imagesSvc = inject(ImagesService);
  breeds = signal<Breed[]>([]);
  images = signal<CatImage[]>([]);
  selectedBreed = signal<Breed | null>(null);
  selectedId = new FormControl<string>('');
  filter = new FormControl<string>('');
  filterKey = signal<string>('');
  displayedColumns = ['name', 'origin', 'life_span'];
  filteredBreeds = computed(() => {
    const f = this.filterKey().toLowerCase();
    return this.breeds().filter(b =>
      b.name.toLowerCase().includes(f) ||
      (b.origin ?? '').toLowerCase().includes(f)
    );
  });

  ngOnInit(): void {
    this.breedsSvc.listBreeds().subscribe(bs => this.breeds.set(bs));
    this.selectedId.valueChanges.pipe(
      debounceTime(150),
      switchMap(id => id ? this.imagesSvc.getByBreedId(id, 8) : of<CatImage[]>([]))
    ).subscribe(imgs => {
      this.images.set(imgs || []);
      const currentId = this.selectedId.value ?? '';
      const b = this.breeds().find(x => x.id === currentId);
      this.selectedBreed.set(b ?? null);
    });
  }

  searchTable() {
    this.filterKey.set((this.filter.value ?? '').trim());
    const matches = this.filteredBreeds();
    if (matches.length === 1) {
      this.selectedId.setValue(matches[0].id);
    }
  }
  selectBreed(b: Breed) {
    this.selectedId.setValue(b.id);
  }
}

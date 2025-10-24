import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment.dev';
import { Breed } from '../interfaces/breed.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreedsService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  listBreeds(): Observable<Breed[]> { return this.http.get<Breed[]>(`${this.base}/breeds`); }
  getBreedById(breedId: string): Observable<Breed> { return this.http.get<Breed>(`${this.base}/breeds/${breedId}`); }
  searchBreeds(q: string): Observable<Breed[]> { return this.http.get<Breed[]>(`${this.base}/breeds/search`, { params: { q } }); }
}

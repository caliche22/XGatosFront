import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment.dev';
import { Observable } from 'rxjs';
import { CatImage } from '../interfaces/image.interface';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  getByBreedId(breed_id: string, limit = 10): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(`${this.base}/imagesbybreedid`, { params: { breed_id, limit } as any });
  }
}

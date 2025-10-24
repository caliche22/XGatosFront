import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { BreedsService } from '../../services/breeds.service';
import { ImagesService } from '../../services/images.service';
import { Breed } from '../../interfaces/breed.interface';
import { CatImage } from '../../interfaces/image.interface';

@Component({
  standalone: true,
  selector: 'app-carousel',
  template: '<div class="stub-carousel"></div>'
})
class CarouselStubComponent {
  @Input() images: CatImage[] = [];
}

@Component({
  standalone: true,
  selector: 'app-breed-card',
  template: '<div class="stub-breed-card"></div>'
})
class BreedCardStubComponent {
  @Input() breed: Breed | null = null;
}

const MOCK_BREEDS: Breed[] = [
  { id: 'abys', name: 'Abyssinian', origin: 'Egypt', life_span: '14 - 15' } as any,
  { id: 'siam', name: 'Siamese',    origin: 'Thailand', life_span: '12 - 15' } as any,
  { id: 'rblu', name: 'Russian Blue', origin: 'Russia', life_span: '10 - 16' } as any,
];

const MOCK_IMAGES: CatImage[] = [
  { id: 'img1', url: 'http://example.com/1.jpg', breeds: [] } as any,
  { id: 'img2', url: 'http://example.com/2.jpg', breeds: [] } as any,
];

class BreedsServiceMock {
  listBreeds = jasmine.createSpy('listBreeds').and.returnValue(of(MOCK_BREEDS));
}

class ImagesServiceMock {
  getByBreedId = jasmine.createSpy('getByBreedId').and.callFake((_id: string, _limit: number) =>
    of(MOCK_IMAGES)
  );
}

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HomeComponent,
        CarouselStubComponent,
        BreedCardStubComponent
      ],
      providers: [
        { provide: BreedsService, useClass: BreedsServiceMock },
        { provide: ImagesService, useClass: ImagesServiceMock }
      ]
    })
    .overrideComponent(HomeComponent, {
      remove: { imports: (HomeComponent as any).ɵcmp?.imports ?? [] },
      add: { imports: [CarouselStubComponent, BreedCardStubComponent] }
    })
    .compileComponents();
  });

  function create() {
    const fixture = TestBed.createComponent(HomeComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, comp };
  }

  it('debe crearse y cargar razas iniciales', () => {
    const { comp } = create();
    expect(comp).toBeTruthy();
    expect(comp.breeds().length).toBe(MOCK_BREEDS.length);
    expect(comp.filteredBreeds().length).toBe(MOCK_BREEDS.length);
  });

  it('searchTable: filtra sin autoseleccionar cuando hay >1 coincidencia', () => {
    const { comp } = create();
    comp.filter.setValue('s');
    comp.searchTable();

    const filtered = comp.filteredBreeds();
    expect(filtered.length).toBeGreaterThan(1);
    expect(comp.selectedId.value).toBe('');
    expect(comp.selectedBreed()).toBeNull();
  });

  it('selectBreed: al seleccionar una fila, setea raza y carga imágenes', fakeAsync(() => {
    const imagesSvc = TestBed.inject(ImagesService) as unknown as ImagesServiceMock;
    const { comp } = create();

    comp.selectBreed(MOCK_BREEDS[0]);  // abys
    tick(160);

    expect(comp.selectedId.value).toBe('abys');
    expect(imagesSvc.getByBreedId).toHaveBeenCalledWith('abys', 8);
    expect(comp.selectedBreed()).toEqual(MOCK_BREEDS[0]);
    expect(comp.images().length).toBe(MOCK_IMAGES.length);
  }));
});

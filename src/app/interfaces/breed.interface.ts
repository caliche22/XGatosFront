export interface Breed {
  id: string;
  name: string;
  origin?: string;
  description?: string;
  temperament?: string;
  life_span?: string;
  weight?: { imperial?: string; metric?: string };
}
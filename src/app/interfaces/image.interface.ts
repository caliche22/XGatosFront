import { Breed } from './breed.interface';
export interface CatImage { id: string; url: string; width?: number; height?: number; breeds?: Breed[]; }

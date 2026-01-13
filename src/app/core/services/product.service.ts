import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  readonly API_URL = 'https://dummyjson.com/products';

  getAll() {
    return this.http.get<{ products: any[] }>(this.API_URL);
  }
}

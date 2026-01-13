import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ICategory,
  IProduct,
  IProductResponse,
  PaginatedResponse,
} from '../../common/interfaces/IProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/products';

  getAll(): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(this.apiUrl);
  }

  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  search(query: string): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.apiUrl}/search?q=${query}`);
  }

  getPaginated<T = IProduct>(
    limit: number,
    skip: number,
    select?: (keyof T)[]
  ): Observable<PaginatedResponse<T>> {
    let url = `${this.apiUrl}?limit=${limit}&skip=${skip}`;

    if (select?.length) {
      url += `&select=${select.join(',')}`;
    }

    return this.http.get<PaginatedResponse<T>>(url);
  }

  sortBy(sortBy: keyof IProduct, order: 'asc' | 'desc'): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.apiUrl}?sortBy=${sortBy}&order=${order}`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/categories`);
  }

  getCategoryList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/category-list`);
  }

  getProductsByCategory(category: string): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.apiUrl}/category/${category}`);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/add`, product);
  }

  updateProduct(id: number, product: Partial<IProduct>): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<IProduct & { isDeleted: boolean; deletedOn: string }> {
    return this.http.delete<IProduct & { isDeleted: boolean; deletedOn: string }>(
      `${this.apiUrl}/${id}`
    );
  }
}

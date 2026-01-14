// features/products/store/products.store.ts
import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of, finalize } from 'rxjs';
import { ProductListItem } from './products.types';
import { ProductService } from '../../core/services/product.service';

@Injectable({ providedIn: 'root' })
export class ProductsStore {
  private readonly productService = inject(ProductService);

  public products = signal<ProductListItem[]>([]);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  public load() {
    this.loading.set(true);
    this.error.set(null);
    this.productService
      .getPaginated<ProductListItem>(20, 0, [
        'id',
        'title',
        'price',
        'thumbnail',
        'category',
        'description',
        'discountPercentage',
        'rating',
      ])
      .pipe(
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (products) => {
          this.products.set(products.products);
        },
        error: (err) => {
          this.error.set('Failed to load products');
        },
      });
  }

  public readonly productCount = computed(() => this.products().length);
}

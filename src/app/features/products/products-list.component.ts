import { Component, inject } from '@angular/core';
import { ProductsStore } from './products.store';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `
    <h1>Products</h1>

    @if (store.loading()) {
    <p>Loading...</p>
    } @if (store.error()) {
    <p class="error">{{ store.error() }}</p>
    }
    <style>
      ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 1rem;
        row-gap: 2rem; /* more margin between rows */
        padding: 0;
        margin: 0;
        list-style: none;
      }
    </style>
    <ul>
      @for (product of store.products(); track product.id) {
      <app-product-card [product]="product"></app-product-card>
      }
    </ul>
  `,
})
export class ProductsListComponent {
  readonly store = inject(ProductsStore);

  constructor() {
    this.store.load();
  }
}

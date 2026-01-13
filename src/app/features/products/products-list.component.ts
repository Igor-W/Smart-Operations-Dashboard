import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products-list',
  imports: [AsyncPipe, JsonPipe],
  template: `<h1>Products List Works!</h1>
    @let products = products$ | async; @if(products) {
    <div>{{ products | json }}</div>
    }`,
})
export class ProductsListComponent {
  private readonly _productService = inject(ProductService);
  readonly products$ = this._productService.getAll();
}

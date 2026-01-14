import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProductListItem } from '../products.types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [FontAwesomeModule],
  templateUrl: `./product-card.component.html`,
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<ProductListItem>();

  // depending on rating we can have differnt stars
  // integer part = filled stars
  // decimal part = partially filled star
  // rest = unfilled stars
  readonly ratingStars = computed(() => {
    const fullStars = Math.floor(this.product().rating);
    const halfStar = this.product().rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return {
      fullStars,
      halfStar,
      emptyStars,
    };
  });
}

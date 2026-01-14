// products.types.ts
import { IProduct } from '../../common/interfaces/IProduct';

export type ProductListItem = Pick<
  IProduct,
  | 'id'
  | 'title'
  | 'price'
  | 'thumbnail'
  | 'category'
  | 'description'
  | 'discountPercentage'
  | 'rating'
>;

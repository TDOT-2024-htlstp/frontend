import {Product} from "./product";
import {Order} from "./order";

export type ProductEntry = {
  order: Order,
  product: Product;
  amount: number;
}

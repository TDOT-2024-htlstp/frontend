import {Product} from "./product";
import {Order} from "./order";

export type ProductEntry = {
  id: number;
  order: Order;
  product: Product;
  amount: number;
}

import {Product} from "./product";
import {Order} from "./order";

export type ProductEntry = {
  id: number|undefined;
  product: Product;
  amount: number;
}

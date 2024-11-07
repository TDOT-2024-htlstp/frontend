import {Category} from "./category";

export type Product = {
  id: number;
  name: string;
  price: number;
  amountLeft: number;
  imagePath: string;
  category: Category|undefined;
}

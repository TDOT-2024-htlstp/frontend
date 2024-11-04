import {ProductEntry} from "./productEntry";

export type Order = {
  uuid: string;
  entries: ProductEntry[]
}

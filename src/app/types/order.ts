import {ProductEntry} from "./productEntry";

export type Order = {
  id: number|undefined;
  status: "IN_PROGRESS" | "READY" | "FINISHED";
  entries: ProductEntry[]
}

import {ProductEntry} from "./productEntry";

export type Order = {
  id: string|undefined;
  status: "IN_PROGRESS" | "READY" | "FINISHED";
  entries: ProductEntry[]
}

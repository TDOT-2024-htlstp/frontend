import {ProductEntry} from "./productEntry";

export type Order = {
  status: "IN_PROGRESS" | "READY" | "FINISHED";
  id: string;
  entries: ProductEntry[]
}

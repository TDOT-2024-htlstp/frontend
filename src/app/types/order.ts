import {ProductEntry} from "./productEntry";

export type Order = {
  status: "in_progress" | "ready" | "finished";
  uuid: string;
  entries: ProductEntry[]
}

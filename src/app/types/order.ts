import {ProductEntry} from "./productEntry";

export type Order = {
  status: "in_progress" | "done";
  id: string;
  entries: ProductEntry[]
}

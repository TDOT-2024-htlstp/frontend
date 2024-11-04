import {ProductEntry} from "./productEntry";

export type Order = {
  status: "in_progress" | "done";
  uuid: string;
  entries: ProductEntry[]
}

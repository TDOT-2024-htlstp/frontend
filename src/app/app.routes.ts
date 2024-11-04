import {Routes} from '@angular/router';
import {KitchenComponent} from "./kitchen/kitchen/kitchen.component";
import {OrderComponent} from "./order/order/order.component";
import {StatusComponent} from "./status/status/status.component";
import {ErrorComponent} from "./error/error.component";

export const routes: Routes = [
  {"path": "", redirectTo: "/order", pathMatch: "full" },
  {"path": "kitchen", component: KitchenComponent},
  {"path": "order", component: OrderComponent},
  {"path": "status", component: StatusComponent},
  {"path": "**", component: ErrorComponent},
];

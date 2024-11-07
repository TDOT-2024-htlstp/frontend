import {Routes} from '@angular/router';
import {KitchenComponent} from "./kitchen/kitchen/kitchen.component";
import {OrderComponent} from "./order/order/order.component";
import {StatusComponent} from "./status/status/status.component";
import {ErrorComponent} from "./error/error.component";
import {ConfirmOrderComponent} from "./confirmOrder/confirm-order/confirm-order.component";
import {OrderDisplayComponent} from "./order-display/order-display/order-display.component";

export const routes: Routes = [
  {"path": "", redirectTo: "/order", pathMatch: "full" },
  {"path": "kitchen", component: KitchenComponent},
  {"path": "order", component: OrderComponent},
  {"path": "order/confirm", component: ConfirmOrderComponent},
  {"path": "order/display", component: OrderDisplayComponent},
  {"path": "status", component: StatusComponent},
  {"path": "**", component: ErrorComponent},
];

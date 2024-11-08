import {Component} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {Router} from "@angular/router";
import {routes} from "../../app.routes";
import {UserService} from "../../service/user.service";
import {ErrorService} from "../../service/error.service";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {BackendService} from "../../service/backend.service";
import {Order} from "../../types/order";

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.scss'
})
export class ConfirmOrderComponent {
  constructor(protected shoppingCartService: ShoppingCartService, private router: Router, protected userService: UserService, private errorService: ErrorService, private http: HttpClient, private backend: BackendService) {
  }

  ngOnInit() {
    this.userService.loadCoins();
    if (this.shoppingCartService.total() == 0) {
      this.router.navigate(["order"])
    }
  }

  goBack() {
    this.router.navigate(["order"])
  }

  async sendOrder() {
    await this.userService.loadCoins();

    if (this.userService.coins() < this.shoppingCartService.total()) {
      this.errorService.showError("Sie haben nicht genug Münzen für diese Bestellung");
      return
    }

    await this.userService.chargePoints(this.shoppingCartService.total());

    let order = this.shoppingCartService.asOrder();
    order = await firstValueFrom(this.http.post<Order>(this.backend.with("/api/orders/process"), order, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }));
    // await firstValueFrom(this.http.post(`${this.backend.receiptUrl}order`, order, {
    //   headers: {
    //     'Access-Control-Allow-Origin':'*',
    //   }
    // }));
    await firstValueFrom(this.http.post(this.backend.with("/api/print"), order, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }));

    this.shoppingCartService.clear();


    await this.router.navigate(["order", "display"], {
      queryParams: {
        orderId: order.id
      }
    })
  }
}

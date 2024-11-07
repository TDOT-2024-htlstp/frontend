import {Component} from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {ProductService} from "../../service/product.service";
import {Category} from "../../types/category";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {routes} from "../../app.routes";
import {ErrorService} from "../../service/error.service";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {StatusComponent} from "../../status/status/status.component";
import { Client, IMessage } from '@stomp/stompjs';
import {BackendService} from "../../service/backend.service";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  constructor(protected categoryService: CategoryService, protected productService: ProductService, protected shoppingCartService: ShoppingCartService, private router: Router, private errorService: ErrorService, private authService: AuthService, protected userService: UserService, protected backend: BackendService) {
    this.asyncConstructor();
  }

  async asyncConstructor() {
    this.authService.loadAuthData();
    if (!this.authService.isAuthenticated()) {
      await this.authService.authenticate();
    }

    await this.categoryService.fetchCategories();
    this.productService.fillCategory(this.categoryService.selectedCategory()!.id)
  }

  ngOnInit() {
    this.userService.loadCoins()
  }

  selectCategory(category: Category): void {
    this.categoryService.selectedCategory.set(category)
    this.productService.fillCategory(category.id)
  }

  goToOrderOverview() {
    if (this.shoppingCartService.total() != 0) {
      this.router.navigate(["order", "confirm"])
    } else {
      this.errorService.showError("Ihre Bestellung ist leer")
    }
  }
}

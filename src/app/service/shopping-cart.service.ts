import {Injectable, signal, WritableSignal} from '@angular/core';
import {Product} from "../types/product";
import {Order} from "../types/order";
import {ProductEntry} from "../types/productEntry";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private internalShoppingCart: WritableSignal<Map<Product, number>> = signal(new Map());
  public readonly shoppingCart = this.internalShoppingCart.asReadonly();

  constructor(private errorService: ErrorService) {
  }

  clear() {
    this.internalShoppingCart.set(new Map())
  }

  add(product: Product) {
    let productAmount;
    if (!this.internalShoppingCart().has(product)) {
      this.internalShoppingCart().set(product, 0)
      productAmount = 0;
    } else {
      productAmount = this.internalShoppingCart().get(product)!;
    }

    if (productAmount < product.amountLeft) {
      this.internalShoppingCart().set(product, productAmount + 1)
    } else {
      this.errorService.showError("Sie können maximal " + productAmount + " von diesem Produkt bestellen")
    }
  }

  sub(product: Product) {
    if (!this.internalShoppingCart().has(product)) {
      return;
    }

    const productAmount = this.internalShoppingCart().get(product)!;
    if (productAmount == 1) {
      this.internalShoppingCart().delete(product)
    } else if (productAmount > 1) {
      this.internalShoppingCart().set(product, productAmount - 1)
    }
  }

  total(): number {
    let total = 0;
    for (let [product, amount] of this.internalShoppingCart()) {
      total += product.price * amount
    }
    return total;
  }

  asOrder(): Order {
    let entries: ProductEntry[] = [];
    let i = 0;
    for (let [product, amount] of this.internalShoppingCart()) {
      entries.push({
        id: undefined,
        product,
        amount
      })
      i+=1;
    }
    return {
      id: undefined,
      status: "IN_PROGRESS",
      entries: entries
    };
  }
}

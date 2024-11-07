import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../types/order";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  constructor(private http: HttpClient) {
  }

  elements = signal<Order[] | undefined>(undefined);

  deleteOrderById(id: string) {
    this.elements.update((orders) => {
      if (!orders) return orders;

      return orders.filter(order => order.id !== id);
    });
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:8080/api/orders");
  }

  updateOrderState(order: Order): Observable<Order> {
    return this.http.put<Order>(`http://localhost:8080/api/orders/${order.id}`, order);
  }

}

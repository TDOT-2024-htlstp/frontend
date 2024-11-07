import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../types/order";
import {Observable} from "rxjs";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  constructor(private http: HttpClient, public backend: BackendService) {
  }

  elements = signal<Order[] | undefined>(undefined);

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.backend.url}api/orders`);
  }

  updateOrderState(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.backend.url}api/orders/${order.id}`, order);
  }

}

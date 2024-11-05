import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../types/order";
import {ProductEntry} from "../types/productEntry";
import {Product} from "../types/product";
import {Category} from "../types/category";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class KitchenService {

    constructor(private http: HttpClient) {
    }

    getOrdersMock() {
        let category1: Category = {
            id: 1,
            name: "Obst"
        }

        let category2: Category = {
            id: 1,
            name: "Gemüse"
        }

        let product1: Product = {
            id: 1,
            name: "Apfel",
            category: category1,
            amountLeft: 5,
            price: 1.99
        }

        let product2: Product = {
            id: 2,
            name: "Banane",
            category: category1,
            amountLeft: 10,
            price: 2.99
        }

        let product3: Product = {
            id: 3,
            name: "Gurke",
            category: category2,
            amountLeft: 3,
            price: 1.79
        }

        let order1: Order = {
            id: "1",
            status: "in_progress",
            entries: [
                {
                    id: 1,
                    amount: 3,
                    product: product1,
                } as ProductEntry,
                {
                    id: 2,
                    amount: 5,
                    product: product2,
                } as ProductEntry
            ]
        }

        let order2: Order = {
            id: "2",
            status: "in_progress",
            entries: [
                {
                    id: 1,
                    amount: 10,
                    product: product3,
                } as ProductEntry
            ]
        }

        return [order1, order2];
    }

    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>("http://localhost:8080/api/orders");
    }

    updateOrderState(order: Order): Observable<Order> {
        return this.http.put<Order>(`http://localhost:8080/api/orders`, order);
    }

}

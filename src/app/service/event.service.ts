import {Injectable} from '@angular/core';
import {Client} from "@stomp/stompjs";
import {BackendService} from "./backend.service";
import {KitchenService} from "./kitchen.service";
import {Product} from "../types/product";
import {ProductService} from "./product.service";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private client: Client;

  constructor(private backend: BackendService, private http: HttpClient, productService: ProductService, private kitchenService: KitchenService) {
    this.client = new Client({
      brokerURL: `${backend.wsUrl}restaurant`
    })

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      this.client.subscribe("/api/orders", (orders => {
        this.kitchenService.elements.set(JSON.parse(orders.body))
      }))

      this.client.subscribe("/api/products", (products => {
        let newProducts: Product[] = JSON.parse(products.body)
        let map = new Map<number, Product[]>();

        for (let product of newProducts) {
          let id = product.category!.id;
          if (!map.has(id)) {
            map.set(id, [])
          }
          map.get(id)?.push(product)
        }

        console.log(map)

        productService.override(map)
      }))

      this.client.subscribe("/api/order", (order => {
        console.log(order.body)

        firstValueFrom(this.http.post(`${this.backend.receiptUrl}order`, JSON.parse(order.body), {
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        })).then();
      }))

    };

    this.client.activate();
  }

}

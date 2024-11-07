import {Injectable} from '@angular/core';
import {Client} from "@stomp/stompjs";
import {BackendService} from "./backend.service";
import {KitchenService} from "./kitchen.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private client: Client;

  constructor(backend: BackendService, private kitchenService: KitchenService) {
    this.client = new Client({
      brokerURL: `${backend.wsUrl}restaurant`
    })

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      this.client.subscribe("/api/orders", (orders => {
        this.kitchenService.elements.set(JSON.parse(orders.body))
      }))
    };

    this.client.activate();
  }

}

import {Injectable} from '@angular/core';
import {Client} from "@stomp/stompjs";
import {KitchenService} from "./kitchen.service";

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private client: Client;

    constructor(private kitchenService: KitchenService) {
        this.client = new Client({
            brokerURL: `ws://localhost:8080/restaurant`
        })

        this.client.onConnect = (frame) => {
            console.log('Connected: ' + frame);

            this.client.subscribe("/api/orders", (orders => {
                console.log(orders.body)
                this.kitchenService.elements.set(JSON.parse(orders.body))
            }))
        };

        this.client.activate();
    }

}

import {Component, OnInit, signal} from '@angular/core';
import {Order} from "../../types/order";
import {KitchenElementComponent} from "../kitchen-element/kitchen-element.component";
import {KitchenService} from "../../service/kitchen.service";
import {io} from "socket.io-client";

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [
    KitchenElementComponent
  ],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss'
})
export class KitchenComponent implements OnInit {

  elements = signal<Order[] | undefined>(undefined);

  constructor(private service: KitchenService) {
  }

  ngOnInit(): void {

    // this.service.socket = io("localhost:3001/kitchen");
    //
    // this.service.socket.on("connect", () => {
    //   console.log("logged in: " + this.service.socket.id)
    // });
    //
    // this.service.socket.on("orders", (orders: Order[]) => {
    //   this.elements.set(orders);
    // })
    //
    // this.service.socket.on("updated-order-state", () => {
    //   console.log("order state updated")
    //   //todo del from list
    // })
    //
    // this.service.socket.on("order-update", (orders: Order[]) => {
    //   console.log(orders)
    // })

    // this.elements.set(this.service.getOrdersMock());

    // this.getAllOrders()
  }

  // getAllOrders() {
  //   this.service.getAllOrders().subscribe({
  //     next: (response: Order[]) => {
  //       this.elements.set(response);
  //     },
  //     error: (err) => {
  //       console.error(err)
  //     }
  //   });
  // }

}

import {Component, input} from '@angular/core';
import {Order} from "../../types/order";
import {KitchenService} from "../../service/kitchen.service";

@Component({
  selector: 'app-kitchen-element',
  standalone: true,
  imports: [],
  templateUrl: './kitchen-element.component.html',
  styleUrl: './kitchen-element.component.scss'
})
export class KitchenElementComponent {

  order = input.required<Order>();

  constructor(private service: KitchenService) {
  }

  updateOrderState() {
    this.service.updateOrderState(this.order()).subscribe({
      next: (response: Order) => {
        console.log(response)

        // this.service.deleteOrderById(this.order().id)
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

}
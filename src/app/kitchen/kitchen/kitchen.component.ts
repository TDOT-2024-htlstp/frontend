import {Component, OnInit} from '@angular/core';
import {Order} from "../../types/order";
import {KitchenElementComponent} from "../kitchen-element/kitchen-element.component";
import {KitchenService} from "../../service/kitchen.service";

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

  constructor(protected kitchenService: KitchenService) {
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.kitchenService.getAllOrders().subscribe({
      next: (response: Order[]) => {
        this.kitchenService.elements.set(response);
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

  updateOrderState(order: Order) {
    this.kitchenService.updateOrderState(order).subscribe({
      next: (response: Order) => {
        console.log(response)
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

}

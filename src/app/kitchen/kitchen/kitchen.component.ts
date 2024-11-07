import {Component, OnInit} from '@angular/core';
import {Order} from "../../types/order";
import {KitchenElementComponent} from "../kitchen-element/kitchen-element.component";
import {KitchenService} from "../../service/kitchen.service";
import {EventService} from "../../service/event.service";

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

  constructor(protected kitchenService: KitchenService, protected event: EventService) {
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

}

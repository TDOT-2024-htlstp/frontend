import {Component, OnInit, signal} from '@angular/core';
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

  elements = signal<Order[] | undefined>(undefined);

  constructor(private service: KitchenService) {
  }

  ngOnInit(): void {
    // this.elements.set(this.service.getOrdersMock());
    this.getAllOrders()
  }

  getAllOrders() {
    this.service.getAllOrders().subscribe({
      next: (response: Order[]) => {
        console.log(response)
        this.elements.set(response);
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

}

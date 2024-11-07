import {Component, OnInit} from '@angular/core';
import {KitchenElementComponent} from "../../kitchen/kitchen-element/kitchen-element.component";
import {KitchenService} from "../../service/kitchen.service";
import {Order} from "../../types/order";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    KitchenElementComponent,
    NgOptimizedImage
  ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {

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

}

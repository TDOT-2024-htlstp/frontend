import {Component, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-display',
  standalone: true,
  imports: [],
  templateUrl: './order-display.component.html',
  styleUrl: './order-display.component.scss'
})
export class OrderDisplayComponent {
  protected orderId = signal("");

  constructor(route: ActivatedRoute, private router: Router) {
    this.orderId.set(
      route.snapshot.queryParams['orderId']
    )
  }

  goBack() {
    this.router.navigate(["order"])
  }
}

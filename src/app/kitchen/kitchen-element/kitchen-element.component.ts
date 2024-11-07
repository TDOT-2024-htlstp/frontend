import {Component, input} from '@angular/core';
import {Order} from "../../types/order";
import {Color} from "../../types/color";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-kitchen-element',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './kitchen-element.component.html',
    styleUrl: './kitchen-element.component.scss'
})
export class KitchenElementComponent {

    order = input.required<Order>();
    color = input.required<Color>();

}

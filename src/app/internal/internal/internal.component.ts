import {Component, OnInit} from '@angular/core';
import {EventService} from "../../service/event.service";

@Component({
  selector: 'app-internal',
  standalone: true,
  imports: [],
  templateUrl: './internal.component.html',
  styleUrl: './internal.component.scss'
})
export class InternalComponent implements OnInit {

  constructor(private event: EventService) {
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

import { Injectable } from '@angular/core';
import {Client} from "@stomp/stompjs";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private client: Client;

  constructor(backend: BackendService) {
    this.client = new Client({
      brokerURL: `${backend.wsUrl}restaurant`
    })

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
    };

    this.client.activate();
  }

  registerOnEvent(channel: string, action: (data: string) => void) {

  }
}

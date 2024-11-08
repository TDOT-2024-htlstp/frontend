import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public readonly url = "https://tdot-backend.tobinio.at/";
  public readonly wsUrl = "wss://tdot-backend.tobinio.at/";
  public readonly receiptUrl = "http://localhost:8081/";

  constructor() { }

  with(path: string): string {
    if (path.startsWith("/")) {
      path = path.substring(1)
    }
    return this.url + path;
  }
}

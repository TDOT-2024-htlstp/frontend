import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public readonly url = "http://localhost:8080/";
  public readonly wsUrl = "ws://localhost:8080/";
  public readonly receiptUrl = "http://localhost:8081/";

  constructor() { }

  with(path: string): string {
    if (path.startsWith("/")) {
      path = path.substring(1)
    }
    return this.url + path;
  }
}

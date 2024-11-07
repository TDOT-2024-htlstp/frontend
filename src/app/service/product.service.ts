import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Product} from "../types/product";
import {firstValueFrom} from "rxjs";
import {Category} from "../types/category";
import {HttpClient} from "@angular/common/http";
import {BackendService} from "./backend.service";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private internalProductsByCategory: WritableSignal<Map<number, Product[]>> = signal(new Map());
  public productsByCategory: Signal<Map<number, Product[]>> = this.internalProductsByCategory.asReadonly();

  constructor(private httpClient: HttpClient, private backend: BackendService, private eventService: EventService) {
  }

  async fillCategory(id: number) {
    if (this.internalProductsByCategory().get(id) === undefined) {
      await this.fetchCategory(id)
    }
  }

  async fetchCategory(id: number) {
    // fetch api
    let response = await firstValueFrom(this.httpClient.get<Product[]>(this.backend.with(`/api/products/${id}`), {
      headers: {
        'Access-Control-Allow-Origin':'*',
      }
    }))

    this.internalProductsByCategory().set(id, response);
  }
}

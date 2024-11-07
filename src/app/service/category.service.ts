import {Injectable, signal, WritableSignal} from '@angular/core';
import {Category} from "../types/category";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private internalCategories: WritableSignal<Category[]> = signal([]);
  public readonly categories = this.internalCategories.asReadonly();

  public selectedCategory: WritableSignal<Category|undefined> = signal(undefined);

  constructor(private httpClient: HttpClient, private backend: BackendService) {
  }

  async fetchCategories() {
    let response = await firstValueFrom(this.httpClient.get<Category[]>(this.backend.with("/api/categories"), {
      headers: {
        'Access-Control-Allow-Origin':'*',
      }
    }))
    this.internalCategories.set(response);
    this.selectedCategory.set(this.internalCategories()[0]);
  }
}
